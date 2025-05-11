// controllers/medicalReportController.js
const Rapor = require("../models/MedicalReport");
const Hasta = require("../models/hasta");
const Doktor = require("../models/Doctor");

// Rapor ekleme
exports.RaporEkle = async (req, res) => {
    try {
        const { RaporID, RaporIcerigi, RaporTarihi, HastaID, DoktorID } = req.body;

        // Hasta ve Doktorun mevcut olduğunu kontrol et
        const hasta = await Hasta.findOne({ HastaID });
        const doktor = await Doktor.findOne({ DoktorID });

        if (!hasta || !doktor) {
            return res.status(400).json({ message: "Geçerli hasta veya doktor bulunamadı" });
        }

        const yeniRapor = new MedicalReport({
            RaporID,
            RaporIcerigi,
            RaporTarihi,
            HastaID: hasta.HastaID,
            DoktorID: doktor.DoktorID
        });

        await yeniRapor.save();
        res.status(201).json({ message: "Rapor başarıyla eklendi", rapor: yeniRapor });
    } catch (error) {
        console.error("Rapor ekleme hatası:", error);
        res.status(500).json({ message: "Rapor eklenemedi", error: error.message });
    }
};

// Tüm raporları listeleme
exports.RaporListele = async (req, res) => {
    try {
        const raporlar = await MedicalReport.find();
        res.status(200).json(raporlar);
    } catch (error) {
        console.error("Rapor listeleme hatası:", error);
        res.status(500).json({ message: "Raporlar alınamadı", error: error.message });
    }
};

// Rapor güncelleme
exports.RaporGüncelleme = async (req, res) => {
    try {
        const { raporID } = req.params;
        const guncellenmisRapor = await MedicalReport.findOneAndUpdate(
            { RaporID: raporID },
            req.body,
            { new: true }
        );

        if (!guncellenmisRapor) {
            return res.status(404).json({ message: "Rapor bulunamadı" });
        }

        res.status(200).json({ message: "Rapor başarıyla güncellendi", rapor: guncellenmisRapor });
    } catch (error) {
        console.error("Rapor güncelleme hatası:", error);
        res.status(500).json({ message: "Rapor güncellenemedi", error: error.message });
    }
};

// Rapor silme
exports.RaporSilme = async (req, res) => {
    try {
        const { raporID } = req.params;
        const silinenRapor = await MedicalReport.findOneAndDelete({ RaporID: raporID });

        if (!silinenRapor) {
            return res.status(404).json({ message: "Rapor bulunamadı" });
        }

        res.status(200).json({ message: "Rapor başarıyla silindi" });
    } catch (error) {
        console.error("Rapor silme hatası:", error);
        res.status(500).json({ message: "Rapor silinemedi", error: error.message });
    }
};
