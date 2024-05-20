const debounce = (func, wait) => { //debpunce fonksiyonu 2 parametre alır 1 çalıştırılacak fonksiyon (func) 2. bekleme süresi (wait)
    let timeout; //* 1
  
    return (...args) => { //* 2
      clearTimeout(timeout); //* 3
      timeout = setTimeout(() => func(...args), wait); //* 4
    };
  };
  
  export default debounce; //* 5
  
  //? 1) Timeout Tanımı: let timeout; ile timeout adında bir değişken tanımlanır. Bu değişken, debounce fonksiyonunun gecikme süresini takip etmek için kullanılacak olan zamanlayıcıyı (timer) tutar.
  
  //! 2) Fonksiyon Dönüşü ve Parametreler: return (...args) => { ... } ile debounce fonksiyonu, asıl işlevi (func) ve bu işleve aktarılacak argümanları (...args) alacak bir fonksiyon döndürür. ...args sözdizimi, fonksiyona geçirilen tüm argümanları bir dizi olarak toplar, böylece herhangi bir sayıda argüman kabul edilebilir.(bu çok iyi bir olaydır yalnız )
  
  //* 3) Timeout Temizleme: clearTimeout(timeout); ifadesi ile, önceden ayarlanmış olan herhangi bir timeout iptal edilir. Bu, kullanıcı aralıksız bir şekilde işlem yaparsa (örneğin, bir metin alanına sürekli yazarsa), önceki zamanlayıcıların üzerine yazılarak sadece son işlemin belirtilen bekleme süresi (wait) sonunda gerçekleştirilmesini sağlar.
  
  //' 4) Yeni Timeout Ayarlama: timeout = setTimeout(() => func(...args), wait); satırı, belirlenen bekleme süresi (wait) sonunda asıl işlevi (func) argümanlarla (...args) birlikte çağırmak için yeni bir timeout ayarlar. Eğer bu süre içinde yeni bir çağrı yapılırsa, adım 3'te tanımlanan mekanizma devreye girer ve bu timeout iptal edilir, yeni bir timeout başlatılır.