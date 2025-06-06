// controllers/patientController.js
const hastaServices = require("../services/HastaServices");
const logger = require('../utils/logger');

// Hasta ekleme
exports.HastaEkle = async (req, res) => {
    try {
        logger.info(`Hasta ekleme isteği: ${JSON.stringify(req.body)}`);
        const yeniHasta = await hastaServices.hastaEkle(req.body);
        logger.info(`Hasta başarıyla eklendi: ${yeniHasta._id}`);
        res.status(201).json({ message: "Hasta başarıyla eklendi", hasta: yeniHasta });
    } catch (error) {
        logger.error(`Hasta ekleme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Tüm hastaları listeleme
exports.HastaListele = async (req, res) => {
    try {
        logger.info('Tüm hastaları listeleme isteği');
        const hastalar = await hastaServices.tumHastalariListele();
        res.status(200).json(hastalar);
    } catch (error) {
        logger.error(`Hasta listeleme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Tek bir hastayı ID ile bulma
exports.HastaBul = async (req, res) => {
    try {
        logger.info(`Hasta bulma isteği: ${req.params.hastaID}`);
        const hasta = await hastaServices.hastaBul(req.params.hastaID);
        res.status(200).json(hasta);
    } catch (error) {
        logger.error(`Hasta bulma hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Hasta güncelleme
exports.HastaGüncelleme = async (req, res) => {
    try {
        logger.info(`Hasta güncelleme isteği: ${req.params.hastaID}`);
        const guncellenmisHasta = await hastaServices.hastaGuncelle(req.params.hastaID, req.body);
        logger.info(`Hasta başarıyla güncellendi: ${guncellenmisHasta._id}`);
        res.status(200).json({ message: "Hasta başarıyla güncellendi", hasta: guncellenmisHasta });
    } catch (error) {
        logger.error(`Hasta güncelleme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Hasta silme
exports.HastaSilme = async (req, res) => {
    try {
        logger.info(`Hasta silme isteği: ${req.params.hastaID}`);
        await hastaServices.hastaSil(req.params.hastaID);
        logger.info(`Hasta başarıyla silindi: ${req.params.hastaID}`);
        res.status(200).json({ message: "Hasta ve ilgili randevular başarıyla silindi" });
    } catch (error) {
        logger.error(`Hasta silme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Belirli bir doktora randevu almış hastaları listeleme
exports.DoktorunHastalari = async (req, res) => {
    try {
        logger.info(`Doktorun hastaları listeleme isteği: ${req.params.doktorID}`);
        const doktorID = req.params.doktorID;
        const hastalar = await hastaServices.doktorunHastalari(doktorID);
        res.status(200).json(hastalar);
    } catch (error) {
        logger.error(`Doktorun hastaları getirilirken hata: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};
