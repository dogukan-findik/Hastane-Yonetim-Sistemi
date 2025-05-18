// routes/doctors.js
const express = require("express");
const router = express.Router();
const doktorController = require("../controller/DoktorController");

// Doktor ekleme
router.post("/ekle", doktorController.addDoctor);

// Tüm doktorları listeleme
router.get("/listele", doktorController.getDoctors);

// Doktor güncelleme
router.put("/guncelle/:doktorID", doktorController.updateDoctor);

// Doktor silme
router.delete("/sil/:doktorID", doktorController.deleteDoctor);

module.exports = router;
