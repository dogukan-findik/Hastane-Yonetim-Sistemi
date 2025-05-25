// models/Patient.js
const mongoose = require("mongoose");

const hastaSchema = new mongoose.Schema({
    Ad: String,
    Soyad: String,
    DogumTarihi: Date,
    Cinsiyet: String,
    TelefonNumarasi: String,
    Adres: String,
    Email: { type: String, unique: true },
    Sifre: String
});

// Modeli export et
module.exports = mongoose.model("Hasta", hastaSchema, "hastalar");
