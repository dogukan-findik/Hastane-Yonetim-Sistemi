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
router.post("/ekle", RaporController.RaporEkle);

// Tüm raporları listeleme
router.get("/listele", RaporController.RaporListele);

// Rapor güncelleme
router.put("/guncelle/:raporID", RaporController.RaporGuncelle);

// Rapor silme
router.delete("/sil/:raporID", RaporController.RaporSil);

router.post('/yukle', upload.single('dosya'), RaporController.raporYukle);
router.get('/hasta/:hastaID', RaporController.hastaRaporlari);
router.get('/doktor/:doktorID', RaporController.doktorRaporlari);
router.get('/:raporID', RaporController.raporDetay);
router.delete('/:raporID', RaporController.raporSil);

module.exports = router;
