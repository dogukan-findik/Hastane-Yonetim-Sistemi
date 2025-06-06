// routes/medicalReports.js

const express = require("express");
const multer = require('multer');
const path = require('path');
const RaporController = require("../controller/RaporController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/raporlar/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Rapor ekleme
router.post("/rapor", RaporController.RaporEkle);

// Tüm raporları listeleme
router.get("/rapor", RaporController.RaporListele);

// Rapor güncelleme
router.put("/rapor/:raporID", RaporController.RaporGuncelle);

// Rapor silme
router.delete("/rapor/:raporID", RaporController.RaporSil);

router.post('/rapor/yukle', upload.single('dosya'), RaporController.raporYukle);
router.get('/rapor/:raporID', RaporController.raporDetay);
router.delete('/rapor/:raporID', RaporController.raporSil);

module.exports = router;
