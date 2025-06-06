// routes/admins.js
const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController");
const { authenticateUser, authorizeRoles } = require("../middleware/authMiddleware");

// Yönetici ekleme
router.post("/", authenticateUser, authorizeRoles("admin"), AdminController.createAdmin);

// Yönetici listeleme
router.get("/", authenticateUser, authorizeRoles("admin"), AdminController.getAllAdmins);

// Tek yönetici görüntüleme
router.get("/:id", authenticateUser, authorizeRoles("admin"), AdminController.getAdminById);

// Yönetici güncelleme
router.put("/:id", authenticateUser, authorizeRoles("admin"), AdminController.updateAdmin);

// Yönetici silme
router.delete("/:id", authenticateUser, authorizeRoles("admin"), AdminController.deleteAdmin);


module.exports = router;
