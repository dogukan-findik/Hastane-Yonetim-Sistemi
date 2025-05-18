// routes/admins.js
const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController");

// Yönetici ekleme
router.post("/", AdminController.createAdmin);

// Yönetici listeleme
router.get("/", AdminController.getAllAdmins);

// Tek yönetici görüntüleme
router.get("/:id", AdminController.getAdminById);

// Yönetici güncelleme
router.put("/:id", AdminController.updateAdmin);

// Yönetici silme
router.delete("/:id", AdminController.deleteAdmin);

module.exports = router;
