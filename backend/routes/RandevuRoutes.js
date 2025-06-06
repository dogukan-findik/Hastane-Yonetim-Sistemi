// routes/appointments.js
const express = require("express");
const router = express.Router();
const randevuController = require("../controller/RandevuController");

// Randevu ekleme
router.post("/randevu", randevuController.RandevuEkle);

// Tüm randevuları listeleme
router.get("/randevu", randevuController.RandevuListeleme);

// Randevu güncelleme
router.put("/randevu/:randevuID", randevuController.RandevuGüncelleme);

// Randevu silme
router.delete("/randevu/:randevuID", randevuController.RandevuSilme);

// Doktorun randevuları
router.get('/randevu/doktor/:doktorID', randevuController.DoktorunRandevulari);

// Hastanın randevuları
router.get('/randevu/hasta/:hastaID', randevuController.HastaninRandevulari);

module.exports = router;
