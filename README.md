# Rent-App

Rent-App, ev ve araba kiralama hizmetleri sunan bir web uygulamasıdır. Kullanıcılar, mevcut evleri ve arabaları görüntüleyebilir, rezervasyon yapabilir ve kiralama geçmişlerini yönetebilirler.

## Özellikler

Kullanıcı kaydı ve girişi
Mevcut evleri ve arabaları görüntüleme
Ev ve araba rezervasyonu yapma
Rezervasyon geçmişini görüntüleme ve yönetme
Kullanıcı profili yönetimi

### Kullanıcı İşlevleri

###Kayıt Olma ve Giriş Yapma: 

Kullanıcılar, uygulamaya kayıt olabilir ve giriş yapabilirler.
### Ev ve Araba Görüntüleme:

Kullanıcılar, mevcut evleri ve arabaları görüntüleyebilir, detaylarını inceleyebilirler.
### Rezervasyon Yapma: 

Kullanıcılar, seçtikleri ev veya arabayı belirli tarihler arasında rezerve edebilirler.
### Rezervasyon Yönetimi: 

Kullanıcılar, yaptıkları rezervasyonları görüntüleyebilir ve iptal edebilirler.
### Profil Yönetimi: 

Kullanıcılar, profil bilgilerini görüntüleyebilir ve güncelleyebilirler.

### Kullanılan Teknolojiler

Frontend: React, Redux, React Router, Material-UI, Bootstrap
Backend: Node.js, Express
Veritabanı: MongoDB
Diğer Araçlar: Axios, dayjs, Formik, Yup, Redux Toolkit

### Kullanım

Ana Sayfa: Mevcut evleri ve arabaları görüntüleyin.
Detay Sayfası: Belirli bir evin veya arabanın detaylarını görüntüleyin.
Giriş Sayfası: Hesabınıza giriş yapın veya yeni bir hesap oluşturun.
Rezervasyon Sayfası: Mevcut rezervasyonlarınızı görüntüleyin ve yönetin.

rent-app/
├── src/
│   ├── app/
│   │   └── store.jsx
│   ├── assets/
│   │   └── house.jpg
│   ├── components/
│   │   ├── CarList.jsx
│   │   ├── CarReservationModal.jsx
│   │   ├── Footer.jsx
│   │   ├── HomeCard.jsx
│   │   ├── HomeCarousel.jsx
│   │   ├── Navbar.jsx
│   │   └── ReservationModal.jsx
│   ├── features/
│   │   └── authSlice.jsx
│   ├── helper/
│   │   └── methods.js
│   ├── pages/
│   │   ├── homedetails/
│   │   │   └── index.jsx
│   │   ├── homepage/
│   │   │   └── index.jsx
│   │   ├── myreservation/
│   │   │   └── index.jsx
│   │   ├── signin/
│   │   │   └── index.jsx
│   ├── router/
│   │   ├── AppRouter.jsx
│   │   └── PrivateRouter.jsx
│   ├── thunks/
│   │   ├── authThunk.jsx
│   │   └── index.jsx
│   ├── App.js
│   ├── App.css
│   ├── index.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
