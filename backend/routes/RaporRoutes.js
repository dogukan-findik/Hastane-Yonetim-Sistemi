// routes/medicalReports.js

const express = require("express");
const router = express.Router();
const RaporController = require("../controller/RaporController");

// Rapor ekleme
router.post("/ekle", RaporController.RaporEkle);

// Tüm raporları listeleme
router.get("/listele", RaporController.RaporListele);

// Rapor güncelleme
router.put("/guncelle/:raporID", RaporController.RaporGuncelle);

// Rapor silme
router.delete("/sil/:raporID", RaporController.RaporSil);

module.exports = router;
