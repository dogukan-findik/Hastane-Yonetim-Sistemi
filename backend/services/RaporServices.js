const Rapor = require('../models/rapor');
const Hasta = require('../models/hasta');
const Doktor = require('../models/doktor');

class RaporServices {
    // Yeni rapor ekleme
    async raporEkle(raporData) {
        try {
            // Hasta ve doktorun varlığını kontrol et
            const hasta = await Hasta.findById(raporData.HastaID);
            const doktor = await Doktor.findById(raporData.DoktorID);

            if (!hasta || !doktor) {
                throw new Error('Geçerli hasta veya doktor bulunamadı');
            }

            const yeniRapor = new Rapor(raporData);
            return await yeniRapor.save();
        } catch (error) {
            throw new Error(`Rapor eklenirken hata oluştu: ${error.message}`);
        }
    }

    // Tüm raporları listeleme
    async tumRaporlariListele() {
        try {
            return await Rapor.find();
        } catch (error) {
            throw new Error(`Raporlar listelenirken hata oluştu: ${error.message}`);
        }
    }

    // ID'ye göre rapor bulma
    async raporBul(raporID) {
        try {
            const rapor = await Rapor.findOne({ RaporID: raporID });
            if (!rapor) {
                throw new Error('Rapor bulunamadı');
            }
            return rapor;
        } catch (error) {
            throw new Error(`Rapor bulunurken hata oluştu: ${error.message}`);
        }
    }

    // Rapor güncelleme
    async raporGuncelle(raporID, guncelVeri) {
        try {
            const guncellenmisRapor = await Rapor.findOneAndUpdate(
                { RaporID: raporID },
                guncelVeri,
                { new: true }
            );
            if (!guncellenmisRapor) {
                throw new Error('Güncellenecek rapor bulunamadı');
            }
            return guncellenmisRapor;
        } catch (error) {
            throw new Error(`Rapor güncellenirken hata oluştu: ${error.message}`);
        }
    }

    // Rapor silme
    async raporSil(raporID) {
        try {
            const silinenRapor = await Rapor.findOneAndDelete({ RaporID: raporID });
            if (!silinenRapor) {
                throw new Error('Silinecek rapor bulunamadı');
            }
            return silinenRapor;
        } catch (error) {
            throw new Error(`Rapor silinirken hata oluştu: ${error.message}`);
        }
    }

    // Hastanın raporlarını getirme
    async hastaRaporlariniGetir(hastaID) {
        try {
            return await Rapor.find({ HastaID: hastaID });
        } catch (error) {
            throw new Error(`Hasta raporları getirilirken hata oluştu: ${error.message}`);
        }
    }

    // Doktorun raporlarını getirme
    async doktorRaporlariniGetir(doktorID) {
        try {
            return await Rapor.find({ DoktorID: doktorID });
        } catch (error) {
            throw new Error(`Doktor raporları getirilirken hata oluştu: ${error.message}`);
        }
    }

    // Tarihe göre raporları getirme
    async tariheGoreRaporlariGetir(tarih) {
        try {
            return await Rapor.find({ RaporTarihi: tarih });
        } catch (error) {
            throw new Error(`Tarihe göre raporlar getirilirken hata oluştu: ${error.message}`);
        }
    }
}

module.exports = new RaporServices(); 