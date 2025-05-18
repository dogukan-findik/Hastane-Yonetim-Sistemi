// models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    YoneticiID: {
        type: Number,
        required: true,
        unique: true
    },
    Ad: {
        type: String,
        required: true
    },
    Soyad: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Sifre: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Admin", adminSchema);
