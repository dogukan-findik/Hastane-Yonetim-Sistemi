const Admin = require("../models/admin");

// Yönetici ekleme
exports.createAdmin = async (req, res) => {
    try {
        const yeniAdmin = await Admin.create(req.body);
        res.status(201).json({ message: "Yönetici başarıyla eklendi", admin: yeniAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tüm yöneticileri listeleme
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tek yönetici görüntüleme
exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findOne({ YoneticiID: req.params.id });
        if (!admin) return res.status(404).json({ message: "Yönetici bulunamadı" });
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Yönetici güncelleme
exports.updateAdmin = async (req, res) => {
    try {
        const guncellenmisAdmin = await Admin.findOneAndUpdate(
            { YoneticiID: req.params.id },
            req.body,
            { new: true }
        );
        if (!guncellenmisAdmin) return res.status(404).json({ message: "Yönetici bulunamadı" });
        res.status(200).json({ message: "Yönetici başarıyla güncellendi", admin: guncellenmisAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Yönetici silme
exports.deleteAdmin = async (req, res) => {
    try {
        const silinenAdmin = await Admin.findOneAndDelete({ YoneticiID: req.params.id });
        if (!silinenAdmin) return res.status(404).json({ message: "Yönetici bulunamadı" });
        res.status(200).json({ message: "Yönetici başarıyla silindi" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
