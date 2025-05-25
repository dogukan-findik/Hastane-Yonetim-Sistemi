// models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    Ad: String,
    Soyad: String,
    Email: { type: String, unique: true },
    Sifre: String
}, {
    timestamps: true
});

module.exports = mongoose.model("Admin", adminSchema, "admin");
