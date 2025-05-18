// controllers/doctorController.js
const Doktor = require("../models/doktor");
const Randevu = require("../models/randevu");
const doktorServices = require("../services/DoktorServices");

// Doktor ekleme
exports.addDoctor = async (req, res) => {
    try {
        const yeniDoktor = await doktorServices.doktorEkle(req.body);
        res.status(201).json({ message: "Doktor başarıyla eklendi", doktor: yeniDoktor });
    } catch (error) {
        console.error("Doktor ekleme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};

// Tüm doktorları listeleme
exports.getDoctors = async (req, res) => {
    try {
        const doktorlar = await doktorServices.tumDoktorlariListele();
        res.status(200).json(doktorlar);
    } catch (error) {
        console.error("Doktor listeleme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};

// Doktor güncelleme
exports.updateDoctor = async (req, res) => {
    try {
        const guncellenmisDoktor = await doktorServices.doktorGuncelle(req.params.doktorID, req.body);
        res.status(200).json({ message: "Doktor başarıyla güncellendi", doktor: guncellenmisDoktor });
    } catch (error) {
        console.error("Doktor güncelleme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};

// Doktor silme
exports.deleteDoctor = async (req, res) => {
    try {
        await doktorServices.doktorSil(req.params.doktorID);
        res.status(200).json({ message: "Doktor başarıyla silindi" });
    } catch (error) {
        console.error("Doktor silme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};
