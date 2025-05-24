const randevuServices = require('../services/RandevuServices');
const hastaServices = require('../services/HastaServices');
const doktorServices = require('../services/DoktorServices');

// Dashboard istatistiklerini getir
exports.getDashboardStats = async (req, res) => {
    try {
        // Tüm randevuları getir
        const randevular = await randevuServices.tumRandevulariListele();
        
        // Bugünün randevularını filtrele
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const todayAppointments = randevular.filter(randevu => {
            const randevuDate = new Date(randevu.tarih);
            return randevuDate >= today && randevuDate < tomorrow;
        });

        // Tüm hastaları getir
        const hastalar = await hastaServices.tumHastalariListele();
        
        // Aktif doktorları getir
        const doktorlar = await doktorServices.tumDoktorlariListele();
        const activeDoctors = doktorlar.filter(doktor => doktor.durum === 'Aktif');

        // İstatistikleri hesapla
        const stats = {
            totalPatients: hastalar.length,
            activeDoctors: activeDoctors.length,
            todayAppointments: todayAppointments.length,
            pendingTasks: randevular.filter(r => r.durum === 'Beklemede').length
        };

        res.status(200).json(stats);
    } catch (error) {
        console.error('Dashboard istatistikleri getirme hatası:', error);
        res.status(500).json({ message: error.message });
    }
};

// Son aktiviteleri getir
exports.getRecentActivities = async (req, res) => {
    try {
        // Son randevuları getir
        const randevular = await randevuServices.tumRandevulariListele();
        
        // Son 5 aktiviteyi oluştur
        const activities = randevular
            .sort((a, b) => new Date(b.tarih) - new Date(a.tarih))
            .slice(0, 5)
            .map(randevu => ({
                title: `${randevu.hastaAdi} için ${randevu.doktorAdi} ile randevu`,
                timestamp: new Date(randevu.tarih).toLocaleString('tr-TR'),
                type: 'appointment'
            }));

        res.status(200).json(activities);
    } catch (error) {
        console.error('Son aktiviteleri getirme hatası:', error);
        res.status(500).json({ message: error.message });
    }
}; 