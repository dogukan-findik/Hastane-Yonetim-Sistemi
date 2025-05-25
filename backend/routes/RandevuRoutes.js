// routes/appointments.js
const express = require("express");
const router = express.Router();
const randevuController = require("../controller/RandevuController");

// Randevu ekleme
router.post("/ekle", randevuController.RandevuEkle);

// Tüm randevuları listeleme
router.get("/listele", randevuController.RandevuListeleme);

// Randevu güncelleme
router.put("/guncelle/:randevuID", randevuController.RandevuGüncelleme);

// Randevu silme
router.delete("/sil/:randevuID", randevuController.RandevuSilme);

// Doktorun randevuları
router.get('/doktor/:doktorID', randevuController.DoktorunRandevulari);

// Hastanın randevuları
router.get('/hasta/:hastaID', randevuController.HastaninRandevulari);

module.exports = router;
