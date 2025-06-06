// controllers/doctorController.js
const Doktor = require("../models/doktor");
const Randevu = require("../models/randevu");
const doktorServices = require("../services/DoktorServices");
const logger = require('../utils/logger');

// Doktor ekleme
exports.addDoctor = async (req, res) => {
    try {
        logger.info(`Doktor ekleme isteği: ${JSON.stringify(req.body)}`);
        const yeniDoktor = await doktorServices.doktorEkle(req.body);
        logger.info(`Doktor başarıyla eklendi: ${yeniDoktor._id}`);
        res.status(201).json({ message: "Doktor başarıyla eklendi", doktor: yeniDoktor });
    } catch (error) {
        logger.error(`Doktor ekleme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Tüm doktorları listeleme
exports.getDoctors = async (req, res) => {
    try {
        logger.info('Tüm doktorları listeleme isteği');
        const doktorlar = await doktorServices.tumDoktorlariListele();
        res.status(200).json(doktorlar);
    } catch (error) {
        logger.error(`Doktor listeleme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Doktor güncelleme
exports.updateDoctor = async (req, res) => {
    try {
        logger.info(`Doktor güncelleme isteği: ${req.params.doktorID}`);
        const guncellenmisDoktor = await doktorServices.doktorGuncelle(req.params.doktorID, req.body);
        logger.info(`Doktor başarıyla güncellendi: ${guncellenmisDoktor._id}`);
        res.status(200).json({ message: "Doktor başarıyla güncellendi", doktor: guncellenmisDoktor });
    } catch (error) {
        logger.error(`Doktor güncelleme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Doktor silme
exports.deleteDoctor = async (req, res) => {
    try {
        logger.info(`Doktor silme isteği: ${req.params.doktorID}`);
        await doktorServices.doktorSil(req.params.doktorID);
        logger.info(`Doktor başarıyla silindi: ${req.params.doktorID}`);
        res.status(200).json({ message: "Doktor başarıyla silindi" });
    } catch (error) {
        logger.error(`Doktor silme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};
