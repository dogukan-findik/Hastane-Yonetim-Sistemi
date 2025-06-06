// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Kullanıcının giriş yapıp yapmadığını kontrol eden middleware
const authenticateUser = async (req, res, next) => {
    try {
        // Token al
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Erişim engellendi. Giriş yapmanız gerekiyor." });
        }

        // Token'ı doğrula
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Kullanıcıyı veritabanından bul
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        // Kullanıcıyı request objesine ekle
        req.user = user;
        next();
    } catch (error) {
        console.error("authenticateUser hatası:", error);
        res.status(403).json({ message: "Geçersiz veya süresi dolmuş token." });
    }
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Yetkisiz erişim: Role uygun değil" });
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeRoles };
