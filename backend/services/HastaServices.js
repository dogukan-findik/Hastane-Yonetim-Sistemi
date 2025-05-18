const Hasta = require('../models/hasta');
const Randevu = require('../models/randevu');

class HastaServices {
    // Yeni hasta ekleme
    async hastaEkle(hastaData) {
        try {
            const yeniHasta = new Hasta(hastaData);
            return await yeniHasta.save();
        } catch (error) {
            throw new Error(`Hasta eklenirken hata oluştu: ${error.message}`);
        }
    }

    // Tüm hastaları listeleme
    async tumHastalariListele() {
        try {
            return await Hasta.find();
        } catch (error) {
            throw new Error(`Hastalar listelenirken hata oluştu: ${error.message}`);
        }
    }

    // ID'ye göre hasta bulma
    async hastaBul(hastaID) {
        try {
            const hasta = await Hasta.findOne({ HastaID: hastaID });
            if (!hasta) {
                throw new Error('Hasta bulunamadı');
            }
            return hasta;
        } catch (error) {
            throw new Error(`Hasta bulunurken hata oluştu: ${error.message}`);
        }
    }

    // Hasta güncelleme
    async hastaGuncelle(hastaID, guncelVeri) {
        try {
            const guncellenmisHasta = await Hasta.findOneAndUpdate(
                { HastaID: hastaID },
                guncelVeri,
                { new: true }
            );
            if (!guncellenmisHasta) {
                throw new Error('Güncellenecek hasta bulunamadı');
            }
            return guncellenmisHasta;
        } catch (error) {
            throw new Error(`Hasta güncellenirken hata oluştu: ${error.message}`);
        }
    }

    // Hasta silme
    async hastaSil(hastaID) {
        try {
            // Önce hastanın randevularını sil
            await Randevu.deleteMany({ HastaID: hastaID });
            
            // Sonra hastayı sil
            const silinenHasta = await Hasta.findOneAndDelete({ HastaID: hastaID });
            if (!silinenHasta) {
                throw new Error('Silinecek hasta bulunamadı');
            }
            return silinenHasta;
        } catch (error) {
            throw new Error(`Hasta silinirken hata oluştu: ${error.message}`);
        }
    }

    // Hastanın randevularını getirme
    async hastaRandevulariniGetir(hastaID) {
        try {
            return await Randevu.find({ HastaID: hastaID });
        } catch (error) {
            throw new Error(`Hasta randevuları getirilirken hata oluştu: ${error.message}`);
        }
    }
}

module.exports = new HastaServices();
