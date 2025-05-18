// controllers/medicalReportController.js
const raporServices = require("../services/RaporServices");

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
