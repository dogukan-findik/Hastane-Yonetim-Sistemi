const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Hasta = require("../models/hasta");
const Doktor = require("../models/doktor");
const Admin = require("../models/admin");
const logger = require('../utils/logger');

// Kayıt olma
router.post("/register", async (req, res) => {
    logger.info(`Kayıt isteği: ${JSON.stringify(req.body)}`);
    try {
        const { role } = req.body;
        let Model;
        let userData = {};
        if (role === "doctor") {
            Model = Doktor;
            // Doktor için gerekli alanlar
            const { Ad, Soyad, Email, Sifre, UzmanlikAlani, CalistigiHastane, Telefon } = req.body;
            userData = {
                Ad,
                Soyad,
                Email,
                Sifre: await bcrypt.hash(Sifre, 10),
                UzmanlikAlani,
                CalistigiHastane,
                Telefon
            };
            logger.info(`Doktor olarak kayıt işlemi başlatıldı: ${Email}`);
        } else {
            Model = Hasta;
            // Hasta için gerekli alanlar
            const { Ad, Soyad, Email, Sifre, DogumTarihi, Cinsiyet, TelefonNumarasi, Adres } = req.body;
            userData = {
                Ad,
                Soyad,
                Email,
                Sifre: await bcrypt.hash(Sifre, 10),
                DogumTarihi,
                Cinsiyet,
                TelefonNumarasi,
                Adres
            };
            logger.info(`Hasta olarak kayıt işlemi başlatıldı: ${Email}`);
        }

        // Email kontrolü
        let user = await Model.findOne({ Email: userData.Email });
        if (user) {
            logger.warn(`Kayıt olunmak istenen email zaten kayıtlı: ${userData.Email}`);
            return res.status(400).json({ message: "Bu email zaten kayıtlı" });
        }

        user = new Model(userData);
        await user.save();
        logger.info(`Kayıt başarılı: ${userData.Email} (${role})`);

        // JWT token oluşturma
        const payload = {
            user: {
                id: user.id,
                role: role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
            (err, token) => {
                if (err) throw err;
                const userObj = user.toObject ? user.toObject() : user;
                userObj.userType = role;
                res.json({ token, user: userObj });
            }
        );
    } catch (err) {
        logger.error(`Kayıt sırasında hata: ${err.message}`);
        res.status(500).send("Sunucu hatası");
    }
});

// Giriş yapma
router.post("/login", async (req, res) => {
    logger.info(`Giriş isteği: ${JSON.stringify(req.body)}`);
    try {
        const { Email, Sifre, role } = req.body;
        let Model;
        if (role === "doctor") {
            Model = Doktor;
        } else if (role === "admin") {
            Model = Admin;
        } else {
            Model = Hasta;
        }

        // Kullanıcı kontrolü
        let user = await Model.findOne({ Email });
        if (!user) {
            logger.warn(`Giriş başarısız, kullanıcı bulunamadı: ${Email}`);
            return res.status(400).json({ message: "Geçersiz kimlik bilgileri" });
        }

        // Şifre kontrolü
        let isMatch;
        if (role === "admin") {
            // Admin için sadece düz metin kontrolü
            isMatch = (user.Sifre === Sifre);
        } else {
            // Hasta ve doktor için hash kontrolü
            isMatch = await bcrypt.compare(Sifre, user.Sifre);
        }
        if (!isMatch) {
            logger.warn(`Giriş başarısız, şifre hatalı: ${Email}`);
            return res.status(400).json({ message: "Geçersiz kimlik bilgileri" });
        }

        // JWT token oluşturma
        const payload = {
            user: {
                id: user.id,
                role: role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
            (err, token) => {
                if (err) throw err;
                const userObj = user.toObject ? user.toObject() : user;
                userObj.userType = role;
                logger.info(`Giriş başarılı: ${Email} (${role})`);
                res.json({ token, user: userObj });
            }
        );
    } catch (err) {
        logger.error(`Giriş sırasında hata: ${err.message}`);
        res.status(500).send("Sunucu hatası");
    }
});

// Kullanıcı bilgisi (token ile)
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Token gerekli" });
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Geçersiz token" });
    }
};

router.get("/me", authMiddleware, async (req, res) => {
    const { id, role } = req.user;
    let Model;
    if (role === "doctor") Model = Doktor;
    else if (role === "admin") Model = Admin;
    else Model = Hasta;

    const user = await Model.findById(id).select("-Sifre");
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    res.json(user);
});

module.exports = router;

