// controllers/medicalReportController.js
const raporServices = require("../services/RaporServices");
const Rapor = require('../models/rapor');
const path = require('path');
const cors = require('cors');

// Rapor ekleme
exports.RaporEkle = async (req, res) => {
    try {
        const yeniRapor = await raporServices.raporEkle(req.body);
        res.status(201).json({ message: "Rapor başarıyla eklendi", rapor: yeniRapor });
    } catch (error) {
        console.error("Rapor ekleme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};

// Tüm raporları listeleme
exports.RaporListele = async (req, res) => {
    try {
        const raporlar = await raporServices.tumRaporlariListele();
        res.status(200).json(raporlar);
    } catch (error) {
        console.error("Rapor listeleme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};

// Rapor güncelleme
exports.RaporGuncelle = async (req, res) => {
    try {
        const guncellenmisRapor = await raporServices.raporGuncelle(req.params.raporID, req.body);
        res.status(200).json({ message: "Rapor başarıyla güncellendi", rapor: guncellenmisRapor });
    } catch (error) {
        console.error("Rapor güncelleme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};

// Rapor silme
exports.RaporSil = async (req, res) => {
    try {
        await raporServices.raporSil(req.params.raporID);
        res.status(200).json({ message: "Rapor başarıyla silindi" });
    } catch (error) {
        console.error("Rapor silme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.raporYukle = async (req, res) => {
  try {
    console.log("YÜKLEME İSTEĞİ GELDİ:", req.body, req.file);
    const { HastaID, DoktorID, RaporTarihi, RaporIcerigi, EkVeri } = req.body;
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

    if (HastaID) yeniRaporObj.HastaID = HastaID;
    if (DoktorID) yeniRaporObj.DoktorID = DoktorID;

    const yeniRapor = new Rapor(yeniRaporObj);
    await yeniRapor.save();
    res.status(201).json({ success: true, rapor: yeniRapor });
  } catch (err) {
    console.error("RAPOR YÜKLEME HATASI:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.hastaRaporlari = async (req, res) => {
  const raporlar = await Rapor.find({ HastaID: req.params.hastaID });
  res.json(raporlar);
};

exports.doktorRaporlari = async (req, res) => {
  const raporlar = await Rapor.find({ DoktorID: req.params.doktorID });
  res.json(raporlar);
};

exports.raporDetay = async (req, res) => {
  const rapor = await Rapor.findOne({ RaporID: req.params.raporID });
  res.json(rapor);
};

exports.raporSil = async (req, res) => {
  await Rapor.deleteOne({ RaporID: req.params.raporID });
  res.json({ success: true });
};
