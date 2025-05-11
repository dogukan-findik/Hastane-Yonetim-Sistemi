// controllers/appointmentController.js
const Randevu = require("../models/Appointment");
const Hasta = require("../models/hasta");
const Doktor = require("../models/Doctor");

// Randevu ekleme
exports.RandevuEkle = async (req, res) => {
    try {
        const { RandevuID, RandevuTarihi, RandevuSaati, HastaID, DoktorID } = req.body;

        // Hasta ve Doktorun mevcut olduğunu kontrol et
        const hasta = await Hasta.findOne({ HastaID });
        const doktor = await Doktor.findOne({ DoktorID });

        if (!hasta || !doktor) {
            return res.status(400).json({ message: "Geçerli hasta veya doktor bulunamadı" });
        }

        const yeniRandevu = new Randevu({
            RandevuID,
            RandevuTarihi,
            RandevuSaati,
            HastaID: hasta.HastaID,
            DoktorID: doktor.DoktorID
        });

        await yeniRandevu.save();
        res.status(201).json({ message: "Randevu başarıyla eklendi", randevu: yeniRandevu });
    } catch (error) {
        console.error("Randevu ekleme hatası:", error);
        res.status(500).json({ message: "Randevu eklenemedi", error: error.message });
    }
};

// Tüm randevuları listeleme
exports.RandevuListeleme = async (req, res) => {
    try {
        const randevular = await Randevu.find();
        res.status(200).json(randevular);
    } catch (error) {
        console.error("Randevu listeleme hatası:", error);
        res.status(500).json({ message: "Randevular alınamadı", error: error.message });
    }
};

// Randevu güncelleme
exports.RandevuGüncelleme = async (req, res) => {
    try {
        const { randevuID } = req.params;
        const guncellenmisRandevu = await Randevu.findOneAndUpdate(
            { RandevuID: randevuID },
            req.body,
            { new: true }
        );

        if (!guncellenmisRandevu) {
            return res.status(404).json({ message: "Randevu bulunamadı" });
        }

        res.status(200).json({ message: "Randevu başarıyla güncellendi", randevu: guncellenmisRandevu });
    } catch (error) {
        console.error("Randevu güncelleme hatası:", error);
        res.status(500).json({ message: "Randevu güncellenemedi", error: error.message });
    }
};

// Randevu silme
exports.RandevuSilme = async (req, res) => {
    try {
        const { randevuID } = req.params;
        const silinenRandevu = await Randevu.findOneAndDelete({ RandevuID: randevuID });

        if (!silinenRandevu) {
            return res.status(404).json({ message: "Randevu bulunamadı" });
        }

        res.status(200).json({ message: "Randevu başarıyla silindi" });
    } catch (error) {
        console.error("Randevu silme hatası:", error);
        res.status(500).json({ message: "Randevu silinemedi", error: error.message });
    }
};
