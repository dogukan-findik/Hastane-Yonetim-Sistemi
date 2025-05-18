const Randevu = require('../models/randevu');
const Hasta = require('../models/hasta');
const Doktor = require('../models/doktor');

class RandevuServices {
    // Yeni randevu ekleme
    async randevuEkle(randevuData) {
        try {
            // Hasta ve doktorun varlığını kontrol et
            const hasta = await Hasta.findOne({ HastaID: randevuData.HastaID });
            const doktor = await Doktor.findOne({ DoktorID: randevuData.DoktorID });

            if (!hasta || !doktor) {
                throw new Error('Geçerli hasta veya doktor bulunamadı');
            }

            // Aynı tarih ve saatte başka randevu var mı kontrol et
            const mevcutRandevu = await Randevu.findOne({
                DoktorID: randevuData.DoktorID,
                RandevuTarihi: randevuData.RandevuTarihi,
                RandevuSaati: randevuData.RandevuSaati
            });

            if (mevcutRandevu) {
                throw new Error('Bu saatte doktorun başka bir randevusu bulunmaktadır');
            }

            const yeniRandevu = new Randevu(randevuData);
            return await yeniRandevu.save();
        } catch (error) {
            throw new Error(`Randevu eklenirken hata oluştu: ${error.message}`);
        }
    }

    // Tüm randevuları listeleme
    async tumRandevulariListele() {
        try {
            return await Randevu.find();
        } catch (error) {
            throw new Error(`Randevular listelenirken hata oluştu: ${error.message}`);
        }
    }

    // ID'ye göre randevu bulma
    async randevuBul(randevuID) {
        try {
            const randevu = await Randevu.findOne({ RandevuID: randevuID });
            if (!randevu) {
                throw new Error('Randevu bulunamadı');
            }
            return randevu;
        } catch (error) {
            throw new Error(`Randevu bulunurken hata oluştu: ${error.message}`);
        }
    }

    // Randevu güncelleme
    async randevuGuncelle(randevuID, guncelVeri) {
        try {
            const guncellenmisRandevu = await Randevu.findOneAndUpdate(
                { RandevuID: randevuID },
                guncelVeri,
                { new: true }
            );
            if (!guncellenmisRandevu) {
                throw new Error('Güncellenecek randevu bulunamadı');
            }
            return guncellenmisRandevu;
        } catch (error) {
            throw new Error(`Randevu güncellenirken hata oluştu: ${error.message}`);
        }
    }

    // Randevu silme
    async randevuSil(randevuID) {
        try {
            const silinenRandevu = await Randevu.findOneAndDelete({ RandevuID: randevuID });
            if (!silinenRandevu) {
                throw new Error('Silinecek randevu bulunamadı');
            }
            return silinenRandevu;
        } catch (error) {
            throw new Error(`Randevu silinirken hata oluştu: ${error.message}`);
        }
    }

    // Tarihe göre randevuları getirme
    async tariheGoreRandevulariGetir(tarih) {
        try {
            return await Randevu.find({ RandevuTarihi: tarih });
        } catch (error) {
            throw new Error(`Tarihe göre randevular getirilirken hata oluştu: ${error.message}`);
        }
    }

    // Doktorun tarihe göre randevularını getirme
    async doktorTarihRandevulariniGetir(doktorID, tarih) {
        try {
            return await Randevu.find({
                DoktorID: doktorID,
                RandevuTarihi: tarih
            });
        } catch (error) {
            throw new Error(`Doktorun tarihe göre randevuları getirilirken hata oluştu: ${error.message}`);
        }
    }
}

module.exports = new RandevuServices(); 