// utils/logger.js

const chalkImport = import('chalk');

const LOG_LEVELS = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
};

const logMessage = async (level, message) => {
    const chalk = (await chalkImport).default;
    const timestamp = new Date().toISOString();
    switch (level) {
        case LOG_LEVELS.INFO:
            console.log(chalk.blue(`[INFO] [${timestamp}] ${message}`));
            break;
        case LOG_LEVELS.WARN:
            console.log(chalk.yellow(`[WARN] [${timestamp}] ${message}`));
            break;
        case LOG_LEVELS.ERROR:
            console.log(chalk.red(`[ERROR] [${timestamp}] ${message}`));
            break;
        default:
            console.log(chalk.white(`[LOG] [${timestamp}] ${message}`));
            break;
    }
};

module.exports = {
    info: (msg) => logMessage(LOG_LEVELS.INFO, msg),
    warn: (msg) => logMessage(LOG_LEVELS.WARN, msg),
    error: (msg) => logMessage(LOG_LEVELS.ERROR, msg),
};

const randevuServices = require("../services/RandevuServices");
const Randevu = require("../models/randevu");
const logger = require('../utils/logger');

// Randevu ekleme
exports.RandevuEkle = async (req, res) => {
    try {
        logger.info(`Randevu ekleme isteği: ${JSON.stringify(req.body)}`);
        const yeniRandevu = await randevuServices.randevuEkle(req.body);
        logger.info(`Randevu başarıyla eklendi: ${yeniRandevu._id}`);
        res.status(201).json({ message: "Randevu başarıyla eklendi", randevu: yeniRandevu });
    } catch (error) {
        logger.error(`Randevu ekleme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Tüm randevuları listeleme
exports.RandevuListeleme = async (req, res) => {
    try {
        logger.info('Tüm randevuları listeleme isteği');
        const randevular = await randevuServices.tumRandevulariListele();
        res.status(200).json(randevular);
    } catch (error) {
        logger.error(`Randevu listeleme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Randevu güncelleme
exports.RandevuGüncelleme = async (req, res) => {
    try {
        logger.info(`Randevu güncelleme isteği: ${req.params.randevuID}`);
        const guncellenmisRandevu = await randevuServices.randevuGuncelle(req.params.randevuID, req.body);
        logger.info(`Randevu başarıyla güncellendi: ${guncellenmisRandevu._id}`);
        res.status(200).json({ message: "Randevu başarıyla güncellendi", randevu: guncellenmisRandevu });
    } catch (error) {
        logger.error(`Randevu güncelleme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Randevu silme
exports.RandevuSilme = async (req, res) => {
    try {
        logger.info(`Randevu silme isteği: ${req.params.randevuID}`);
        await randevuServices.randevuSil(req.params.randevuID);
        logger.info(`Randevu başarıyla silindi: ${req.params.randevuID}`);
        res.status(200).json({ message: "Randevu başarıyla silindi" });
    } catch (error) {
        logger.error(`Randevu silme hatası: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Doktorun randevuları
exports.DoktorunRandevulari = async (req, res) => {
    try {
        logger.info(`Doktorun randevuları listeleme isteği: ${req.params.doktorID}`);
        const doktorID = req.params.doktorID;
        const randevular = await Randevu.find({ DoktorID: doktorID });
        res.status(200).json(randevular);
    } catch (error) {
        logger.error(`Doktorun randevuları getirilirken hata: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// Hastanın randevuları
exports.HastaninRandevulari = async (req, res) => {
    try {
        logger.info(`Hastanın randevuları listeleme isteği: ${req.params.hastaID}`);
        const hastaID = req.params.hastaID;
        const randevular = await Randevu.find({ HastaID: hastaID });
        res.status(200).json(randevular);
    } catch (error) {
        logger.error(`Hastanın randevuları getirilirken hata: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};
