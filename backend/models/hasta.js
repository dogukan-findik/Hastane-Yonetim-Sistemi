// models/Patient.js
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
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
        enum: ["Erkek", "Kadın"],
        required: true
    },
    TelefonNumarasi: {
        type: String,
        required: true,
        match: /^[0-9]{10,11}$/
    },
    Adres: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Oluşturulma ve güncellenme tarihlerini otomatik ekler
});

// Modeli export et
module.exports = mongoose.model("Patient", patientSchema);
