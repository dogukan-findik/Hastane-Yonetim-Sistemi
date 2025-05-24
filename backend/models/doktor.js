const mongoose = require('mongoose');

const doktorSchema = new mongoose.Schema({
    Ad: String,
    Soyad: String,
    UzmanlikAlani: String,
    CalistigiHastane: String,
    Email: { type: String, unique: true },
    Telefon: String,
    Sifre: String
});

module.exports = mongoose.model('Doktor', doktorSchema, 'doktorlar');
