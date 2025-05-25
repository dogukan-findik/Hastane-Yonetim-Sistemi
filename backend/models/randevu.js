const mongoose = require('mongoose');

const randevuSchema = new mongoose.Schema({
    RandevuID: {
        type: String,
        required: true,
        unique: true
    },
    RandevuTarihi: {
        type: Date,
        required: true
    },
    RandevuSaati: {
        type: String,
        required: true
    },
    HastaID: {
        type: String,
        required: true
    },
    DoktorID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Randevu', randevuSchema);
