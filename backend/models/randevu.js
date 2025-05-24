const mongoose = require('mongoose');

const randevuSchema = new mongoose.Schema({
    Bolum: { type: String, required: true },
    DoktorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Doktor', required: true },
    DoktorAdSoyad: { type: String, required: true },
    HastaID: { type: mongoose.Schema.Types.ObjectId, ref: 'Hasta', required: true },
    HastaAdSoyad: { type: String, required: true },
    Tarih: { type: Date, required: true },
    Saat: { type: String, required: true },
    Durum: { type: String, default: 'Beklemede' }
});

module.exports = mongoose.model('Randevu', randevuSchema, 'randevu');
