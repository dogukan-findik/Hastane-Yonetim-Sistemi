const mongoose = require('mongoose');

const doktorSchema = new mongoose.Schema({
    DoktorID: {
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
    UzmanlikAlani: {
        type: String,
        required: true
    },
    CalistigiHastane: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Telefon: {
        type: String,
        required: true
    },
    Sifre: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Doktor', doktorSchema);
