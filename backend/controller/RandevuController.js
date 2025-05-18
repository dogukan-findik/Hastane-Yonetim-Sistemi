// controllers/appointmentController.js
const randevuServices = require("../services/RandevuServices");

// Randevu ekleme
exports.RandevuEkle = async (req, res) => {
    try {
        const yeniRandevu = await randevuServices.randevuEkle(req.body);
        res.status(201).json({ message: "Randevu başarıyla eklendi", randevu: yeniRandevu });
    } catch (error) {
        console.error("Randevu ekleme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};

// Tüm randevuları listeleme
exports.RandevuListeleme = async (req, res) => {
    try {
        const randevular = await randevuServices.tumRandevulariListele();
        res.status(200).json(randevular);
    } catch (error) {
        console.error("Randevu listeleme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};

// Randevu güncelleme
exports.RandevuGüncelleme = async (req, res) => {
    try {
        const guncellenmisRandevu = await randevuServices.randevuGuncelle(req.params.randevuID, req.body);
        res.status(200).json({ message: "Randevu başarıyla güncellendi", randevu: guncellenmisRandevu });
    } catch (error) {
        console.error("Randevu güncelleme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};

// Randevu silme
exports.RandevuSilme = async (req, res) => {
    try {
        await randevuServices.randevuSil(req.params.randevuID);
        res.status(200).json({ message: "Randevu başarıyla silindi" });
    } catch (error) {
        console.error("Randevu silme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};
