// routes/admins.js
const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController");

// Yönetici ekleme
router.post("/admin", AdminController.createAdmin);

// Yönetici listeleme
router.get("/admin", AdminController.getAllAdmins);

// Tek yönetici görüntüleme
router.get("/admin/:id", AdminController.getAdminById);

// Yönetici güncelleme
router.put("/admin/:id", AdminController.updateAdmin);

// Yönetici silme
router.delete("/admin/:id", AdminController.deleteAdmin);

module.exports = router;
