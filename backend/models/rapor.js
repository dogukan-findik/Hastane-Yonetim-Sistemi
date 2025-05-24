const mongoose = require('mongoose');

const raporSchema = new mongoose.Schema({
    RaporID: {
        type: String,
        required: true,
        unique: true
    },
    HastaID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hasta',
        required: false
    },
    DoktorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doktor',
        required: false
    },
    RaporTarihi: {
        type: Date,
        required: true
    },
    RaporIcerigi: {
        type: String
    },
    DosyaURL: {
        type: String
    },
    EkVeri: {
        type: Object
    }
});

module.exports = mongoose.model('Rapor', raporSchema, 'raporlar');