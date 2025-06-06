// controllers/medicalReportController.js
const raporServices = require("../services/RaporServices");
const Rapor = require('../models/rapor');
const path = require('path');
const cors = require('cors');
const logger = require('../utils/logger');

// Rapor ekleme
exports.RaporEkle = async (req, res) => {
  try {
    logger.info(`Rapor ekleme isteği: ${JSON.stringify(req.body)}`);
    const yeniRapor = await raporServices.raporEkle(req.body);
    logger.info(`Rapor başarıyla eklendi: ${yeniRapor._id}`);
    res.status(201).json({ message: "Rapor başarıyla eklendi", rapor: yeniRapor });
  } catch (error) {
    logger.error(`Rapor ekleme hatası: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// Tüm raporları listeleme
exports.RaporListele = async (req, res) => {
  try {
    logger.info('Tüm raporları listeleme isteği');
    const raporlar = await raporServices.tumRaporlariListele();
    res.status(200).json(raporlar);
  } catch (error) {
    logger.error(`Rapor listeleme hatası: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// Rapor güncelleme
exports.RaporGuncelle = async (req, res) => {
  try {
    logger.info(`Rapor güncelleme isteği: ${req.params.raporID}`);
    const guncellenmisRapor = await raporServices.raporGuncelle(req.params.raporID, req.body);
    logger.info(`Rapor başarıyla güncellendi: ${guncellenmisRapor._id}`);
    res.status(200).json({ message: "Rapor başarıyla güncellendi", rapor: guncellenmisRapor });
  } catch (error) {
    logger.error(`Rapor güncelleme hatası: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// Rapor silme
exports.RaporSil = async (req, res) => {
  try {
    logger.info(`Rapor silme isteği: ${req.params.raporID}`);
    await raporServices.raporSil(req.params.raporID);
    logger.info(`Rapor başarıyla silindi: ${req.params.raporID}`);
    res.status(200).json({ message: "Rapor başarıyla silindi" });
  } catch (error) {
    logger.error(`Rapor silme hatası: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

exports.raporYukle = async (req, res) => {
  try {
    logger.info(`Rapor yükleme isteği: ${JSON.stringify(req.body)}`);
    const { RaporTarihi, RaporIcerigi, EkVeri } = req.body;
    let dosyaURL = null;
    if (req.file) {
      dosyaURL = `/uploads/raporlar/${req.file.filename}`;
    }
    const yeniRaporObj = {
      RaporID: Date.now().toString(),
      RaporTarihi,
      RaporIcerigi,
      DosyaURL: dosyaURL,
      EkVeri: EkVeri ? JSON.parse(EkVeri) : undefined
    };

    const yeniRapor = new Rapor(yeniRaporObj);
    await yeniRapor.save();
    logger.info(`Rapor başarıyla yüklendi: ${yeniRapor._id}`);
    res.status(201).json({ success: true, rapor: yeniRapor });
  } catch (err) {
    logger.error(`Rapor yükleme hatası: ${err.message}`);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.raporDetay = async (req, res) => {
  logger.info(`Rapor detay isteği: ${req.params.raporID}`);
  const rapor = await Rapor.findOne({ RaporID: req.params.raporID });
  res.json(rapor);
};

exports.raporSil = async (req, res) => {
  logger.info(`Rapor sil (kısa) isteği: ${req.params.raporID}`);
  await Rapor.deleteOne({ RaporID: req.params.raporID });
  res.json({ success: true });
};
