// routes/patients.js
const express = require("express");
const router = express.Router();
const hastaController = require("../controller/HastaController");

// Hasta ekleme
router.post("/ekle", hastaController.HastaEkle);

// Tüm hastaları listeleme
router.get("/listele", hastaController.HastaListele);

// Tek hasta görüntüleme
router.get("/:hastaID", hastaController.HastaBul);

// Hasta güncelleme
router.put("/guncelle/:hastaID", hastaController.HastaGüncelleme);

// Hasta silme
router.delete("/sil/:hastaID", hastaController.HastaSilme);

module.exports = router;
