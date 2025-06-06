const Admin = require("../models/admin");
const logger = require('../utils/logger');

// Yönetici ekleme
exports.createAdmin = async (req, res) => {
    try {
        logger.info(`Yönetici ekleme isteği: ${JSON.stringify(req.body)}`);
        const yeniAdmin = await Admin.create(req.body);
        logger.info(`Yönetici başarıyla eklendi: ${yeniAdmin._id}`);
        res.status(201).json({ message: "Yönetici başarıyla eklendi", admin: yeniAdmin });
    } catch (error) {
        logger.error(`Yönetici ekleme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Tüm yöneticileri listeleme
exports.getAllAdmins = async (req, res) => {
    try {
        logger.info('Tüm yöneticileri listeleme isteği');
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        logger.error(`Yönetici listeleme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Tek yönetici görüntüleme
exports.getAdminById = async (req, res) => {
    try {
        logger.info(`Yönetici bulma isteği: ${req.params.id}`);
        const admin = await Admin.findOne({ YoneticiID: req.params.id });
        if (!admin) return res.status(404).json({ message: "Yönetici bulunamadı" });
        res.status(200).json(admin);
    } catch (error) {
        logger.error(`Yönetici bulma hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Yönetici güncelleme
exports.updateAdmin = async (req, res) => {
    try {
        logger.info(`Yönetici güncelleme isteği: ${req.params.id}`);
        const guncellenmisAdmin = await Admin.findOneAndUpdate(
            { YoneticiID: req.params.id },
            req.body,
            { new: true }
        );
        if (!guncellenmisAdmin) return res.status(404).json({ message: "Yönetici bulunamadı" });
        logger.info(`Yönetici başarıyla güncellendi: ${guncellenmisAdmin._id}`);
        res.status(200).json({ message: "Yönetici başarıyla güncellendi", admin: guncellenmisAdmin });
    } catch (error) {
        logger.error(`Yönetici güncelleme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Yönetici silme
exports.deleteAdmin = async (req, res) => {
    try {
        logger.info(`Yönetici silme isteği: ${req.params.id}`);
        const silinenAdmin = await Admin.findOneAndDelete({ YoneticiID: req.params.id });
        if (!silinenAdmin) return res.status(404).json({ message: "Yönetici bulunamadı" });
        logger.info(`Yönetici başarıyla silindi: ${req.params.id}`);
        res.status(200).json({ message: "Yönetici başarıyla silindi" });
    } catch (error) {
        logger.error(`Yönetici silme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};
