// controllers/patientController.js
const hastaServices = require("../services/HastaServices");

// Hasta ekleme
exports.HastaEkle = async (req, res) => {
    try {
        const yeniHasta = await hastaServices.hastaEkle(req.body);
        res.status(201).json({ message: "Hasta başarıyla eklendi", hasta: yeniHasta });
    } catch (error) {
        console.error("Hasta ekleme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};

// Tüm hastaları listeleme
exports.HastaListele = async (req, res) => {
    try {
        const hastalar = await hastaServices.tumHastalariListele();
        res.status(200).json(hastalar);
    } catch (error) {
        console.error("Hasta listeleme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};

// Tek bir hastayı ID ile bulma
exports.HastaBul = async (req, res) => {
    try {
        const hasta = await hastaServices.hastaBul(req.params.hastaID);
        res.status(200).json(hasta);
    } catch (error) {
        console.error("Hasta bulma hatası:", error);
        res.status(500).json({ message: error.message });
    }
};

// Hasta güncelleme
exports.HastaGüncelleme = async (req, res) => {
    try {
        const guncellenmisHasta = await hastaServices.hastaGuncelle(req.params.hastaID, req.body);
        res.status(200).json({ message: "Hasta başarıyla güncellendi", hasta: guncellenmisHasta });
    } catch (error) {
        console.error("Hasta güncelleme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};

// Hasta silme
exports.HastaSilme = async (req, res) => {
    try {
        await hastaServices.hastaSil(req.params.hastaID);
        res.status(200).json({ message: "Hasta ve ilgili randevular başarıyla silindi" });
    } catch (error) {
        console.error("Hasta silme hatası:", error);
        res.status(500).json({ message: error.message });
    }
};
