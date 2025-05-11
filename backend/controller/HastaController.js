// controllers/patientController.js
const Hasta = require("../models/hasta");

// Hasta ekleme
exports.HastaEkle = async (req, res) => {
    try {
        const { HastaID, Ad, Soyad, DogumTarihi, Cinsiyet, TelefonNumarasi, Adres } = req.body;

        // Yeni hasta oluşturma
        const yeniHasta = new Hasta({
            HastaID,
            Ad,
            Soyad,
            DogumTarihi,
            Cinsiyet,
            TelefonNumarasi,
            Adres
        });

        // Veritabanına kaydetme
        await yeniHasta.save();
        res.status(201).json({ message: "Hasta başarıyla eklendi", hasta: yeniHasta });
    } catch (error) {
        console.error("Hasta ekleme hatası:", error);
        res.status(500).json({ message: "Hasta eklenemedi", error: error.message });
    }
};

// Tüm hastaları listeleme
exports.HastaListele = async (req, res) => {
    try {
        const hastalar = await Hasta.find();
        res.status(200).json(hastalar);
    } catch (error) {
        console.error("Hasta listeleme hatası:", error);
        res.status(500).json({ message: "Hastalar alınamadı", error: error.message });
    }
};

// Tek bir hastayı ID ile bulma
exports.HastaBul = async (req, res) => {
    try {
        const hasta = await Hasta.findOne({ HastaID: req.params.hastaID });
        if (!hasta) {
            return res.status(404).json({ message: "Hasta bulunamadı" });
        }
        res.status(200).json(hasta);
    } catch (error) {
        console.error("Hasta bulma hatası:", error);
        res.status(500).json({ message: "Hasta bulunamadı", error: error.message });
    }
};

// Hasta güncelleme
exports.HastaGüncelleme = async (req, res) => {
    try {
        const { hastaID } = req.params;
        const guncellenmisHasta = await Hasta.findOneAndUpdate(
            { HastaID: hastaID },
            req.body,
            { new: true }
        );

        if (!guncellenmisHasta) {
            return res.status(404).json({ message: "Hasta bulunamadı" });
        }

        res.status(200).json({ message: "Hasta başarıyla güncellendi", hasta: guncellenmisHasta });
    } catch (error) {
        console.error("Hasta güncelleme hatası:", error);
        res.status(500).json({ message: "Hasta güncellenemedi", error: error.message });
    }
};

// Hasta silme
exports.HastaSilme = async (req, res) => {
    try {
        const hastaID = req.params.hastaID;
        
        // Hastanın randevularını sil
        await Randevu.deleteMany({ HastaID: hastaID });

        // Hastayı sil
        const silinenHasta = await Hasta.findOneAndDelete({ HastaID: hastaID });

        if (!silinenHasta) {
            return res.status(404).json({ message: "Hasta bulunamadı" });
        }

        res.status(200).json({ message: "Hasta ve ilgili randevular başarıyla silindi" });
    } catch (error) {
        console.error("Hasta silme hatası:", error);
        res.status(500).json({ message: "Hasta silinemedi", error: error.message });
    }
};
