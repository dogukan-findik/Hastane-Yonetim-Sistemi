// models/Patient.js
const mongoose = require("mongoose");

const hastaSchema = new mongoose.Schema({
    HastaID: {
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
    DogumTarihi: {
        type: Date,
        required: true
    },
    Cinsiyet: {
        type: String,
        required: true
    },
    TelefonNumarasi: {
        type: String,
        required: true
    },
    Adres: {
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
    timestamps: true // Oluşturulma ve güncellenme tarihlerini otomatik ekler
});

// Modeli export et
module.exports = mongoose.model("Hasta", hastaSchema);
