const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Route'ları import et
const hastaRoutes = require('./routes/HastaRoutes');
const doktorRoutes = require('./routes/DoktorRoutes');
const randevuRoutes = require('./routes/RandevuRoutes');
const raporRoutes = require('./routes/RaporRoutes');
const adminRoutes = require('./routes/AdminRoutes');

// Environment değişkenlerini yükle
dotenv.config();

const app = express();

// Middleware'leri ayarla
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// uploads klasörünü statik olarak sun
app.use('/uploads', express.static('uploads'));

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hastane_yonetim', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB bağlantısı başarılı'))
.catch((err) => console.error('MongoDB bağlantı hatası:', err));

// Route'ları tanımla
app.use('/api/hastalar', hastaRoutes);
app.use('/api/doktorlar', doktorRoutes);
app.use('/api/randevular', randevuRoutes);
app.use('/api/raporlar', raporRoutes);
app.use('/api/admin', adminRoutes);

// Ana route
app.get('/', (req, res) => {
    res.json({ message: 'Hastane Yönetim Sistemi API' });
});

// Hata yakalama middleware'i
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Bir hata oluştu',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Port ayarı ve sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
}); 