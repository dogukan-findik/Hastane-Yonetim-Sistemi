// routes/doctors.js
const express = require("express");
const router = express.Router();
const doktorController = require("../controller/DoktorController");

// Doktor ekleme
router.post("/doktor", doktorController.addDoctor);

// Tüm doktorları listeleme
router.get("/doktor", doktorController.getDoctors);

// Doktor güncelleme
router.put("/doktor/:doktorID", doktorController.updateDoctor);

// Doktor silme
router.delete("/doktor/:doktorID", doktorController.deleteDoctor);

module.exports = router;
