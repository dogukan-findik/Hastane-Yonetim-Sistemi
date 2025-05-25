

const mongoose = require('mongoose');

const raporSchema = new mongoose.Schema({
    RaporID: {
        type: String,
        required: true,
        unique: true
    },
    RaporIcerigi: {
        type: String,
        required: true
    },
    RaporTarihi: {
        type: Date,
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



module.exports = mongoose.model('Rapor', raporSchema);