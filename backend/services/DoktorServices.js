const Doktor = require('../models/doktor');
const Randevu = require('../models/randevu');

class DoktorServices {
    // Yeni doktor ekleme
    async doktorEkle(doktorData) {
        try {
            const yeniDoktor = new Doktor(doktorData);
            return await yeniDoktor.save();
        } catch (error) {
            throw new Error(`Doktor eklenirken hata oluştu: ${error.message}`);
        }
    }

    // Tüm doktorları listeleme
    async tumDoktorlariListele() {
        try {
            return await Doktor.find();
        } catch (error) {
            throw new Error(`Doktorlar listelenirken hata oluştu: ${error.message}`);
        }
    }

    // ID'ye göre doktor bulma
    async doktorBul(doktorID) {
        try {
            const doktor = await Doktor.findOne({ DoktorID: doktorID });
            if (!doktor) {
                throw new Error('Doktor bulunamadı');
            }
            return doktor;
        } catch (error) {
            throw new Error(`Doktor bulunurken hata oluştu: ${error.message}`);
        }
    }

    // Doktor güncelleme
    async doktorGuncelle(doktorID, guncelVeri) {
        try {
            const guncellenmisDoktor = await Doktor.findOneAndUpdate(
                { DoktorID: doktorID },
                guncelVeri,
                { new: true }
            );
            if (!guncellenmisDoktor) {
                throw new Error('Güncellenecek doktor bulunamadı');
            }
            return guncellenmisDoktor;
        } catch (error) {
            throw new Error(`Doktor güncellenirken hata oluştu: ${error.message}`);
        }
    }

    // Doktor silme
    async doktorSil(doktorID) {
        try {
            // Önce doktorun aktif randevularını kontrol et
            const aktifRandevular = await Randevu.findOne({ DoktorID: doktorID });
            if (aktifRandevular) {
                throw new Error('Aktif randevusu bulunan doktor silinemez');
            }

            // Doktoru sil
            const silinenDoktor = await Doktor.findOneAndDelete({ DoktorID: doktorID });
            if (!silinenDoktor) {
                throw new Error('Silinecek doktor bulunamadı');
            }
            return silinenDoktor;
        } catch (error) {
            throw new Error(`Doktor silinirken hata oluştu: ${error.message}`);
        }
    }

    // Doktorun randevularını getirme
    async doktorRandevulariniGetir(doktorID) {
        try {
            return await Randevu.find({ DoktorID: doktorID });
        } catch (error) {
            throw new Error(`Doktor randevuları getirilirken hata oluştu: ${error.message}`);
        }
    }

    // Uzmanlık alanına göre doktorları getirme
    async uzmanlikDoktorlariniGetir(uzmanlik) {
        try {
            return await Doktor.find({ Uzmanlik: uzmanlik });
        } catch (error) {
            throw new Error(`Uzmanlık alanına göre doktorlar getirilirken hata oluştu: ${error.message}`);
        }
    }
}

module.exports = new DoktorServices();
