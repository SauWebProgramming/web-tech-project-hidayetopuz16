# 🎬 ISE-201 Web Teknolojileri Projesi: Benim Medya Kitaplığım (SPA)

Merhaba, bu repository, ISE-201 Web Teknolojileri dersi için hazırladığım **Proje Ödevi (Seçenek 1: İnteraktif Medya Kitaplığı)**'na aittir.

Proje, sunucu tarafı kod kullanmadan, tamamen modern **HTML5, CSS3 ve ES6+ JavaScript** ile geliştirilmiş bir Single Page Application (SPA)'dır.

---

## 💻 Uygulamanın Çalışma Mantığı ve Teknik Detaylar

### 1. Temel Gereksinimler

| Gereksinim | Açıklama |
| :--- | :--- |
| **Veri Yönetimi** | Medya bilgileri, `data/media.json` dosyasından **`fetch()` API** kullanılarak asenkron (`async/await`) olarak çekildi. |
| **Tek Sayfa Uygulama (SPA)** | Detay sayfaları dahil, sayfa yenilenmesi olmadan dinamik olarak JavaScript ile DOM'a basılıyor. |
| **Geri/İleri Tuş Desteği** | SPA olmasına rağmen, **`history.pushState`** ve **`popstate`** event'leri ile tarayıcının adres çubuğu güncelleniyor ve geri/ileri tuşları aktif olarak çalışıyor. |
| **Duyarlı Tasarım (Responsive)** | Tüm arayüz, telefon, tablet ve masaüstü cihazlara uyumlu, **CSS Flexbox ve Grid** kullanılarak tasarlandı. |
| **Arama & Filtreleme** | Arama input'u ile isme göre anlık arama ve kategori/yıla göre dinamik filtreleme yaptım. |
| **Favorilerim Özelliği** | Kullanıcı favori medyaları **`localStorage`** kullanarak tarayıcıda saklayıp, ayrı bir menüden görebiliyor. |

### 2. Kod Kalitesi ve Modern JS

* **Modern JS:** Projenin her yerinde **`const`** ve **`let`** kullanıldı, **`var`** kesinlikle kullanılmadı.
* **Asenkron Kodlama:** Veri çekme ve işleme süreçlerinde modern **`async/await`** yapısını kullandım.
* **Ayrılmış Mimari:** HTML, CSS ve JS dosyaları net bir şekilde ayırdım (inline style/script kullanılmadı).

### 3. Bonuslar

* **Karanlık Mod (Dark Theme):** Tek bir tuşla tema değiştirilebiliyor ve bu tercih `localStorage` ile kaydediliyor.
* **Gelişmiş Sıralama:** Puana ve yayın yılına göre medyaları sıralama seçeneği ekledim.

---

## 🔗 Teslimat Linklerim

| Açıklama | Link |
| :--- | :--- |
| **GitHub Repository** | https://github.com/SauWebProgramming/web-tech-project-hidayetopuz16 |
| **Canlı GitHub Pages Linki** | https://sauwebprogramming.github.io/web-tech-project-hidayetopuz16/ |
| **YouTube Video Anlatım Linki** | [Kendi YouTube Video Linkimi Buraya Ekleyeceğim (Liste Dışı)] |
