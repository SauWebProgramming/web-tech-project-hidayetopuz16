# 🎬 ISE-201 Web Teknolojileri Projesi: Benim Medya Kitaplığım (SPA)

[cite_start]Merhaba, bu repository, ISE-201 Web Teknolojileri dersi için hazırladığım **Proje Ödevi (Seçenek 1: İnteraktif Medya Kitaplığı)**'na aittir[cite: 19, 20].

[cite_start]Proje, sunucu tarafı kod kullanmadan, tamamen modern **HTML5, CSS3 ve ES6+ JavaScript** ile geliştirilmiş bir Single Page Application (SPA)'dır[cite: 6, 29].

---

## 💻 Uygulamanın Çalışma Mantığı ve Teknik Detaylar

### 1. Temel Gereksinimler

| Gereksinim | Açıklama |
| :--- | :--- |
| **Veri Yönetimi** | [cite_start]Medya bilgileri, `data/media.json` dosyasından **`fetch()` API** kullanılarak asenkron (`async/await`) olarak çekildi[cite: 10, 48, 49]. |
| **Tek Sayfa Uygulama (SPA)** | [cite_start]Detay sayfaları dahil, sayfa yenilenmesi olmadan dinamik olarak JavaScript ile DOM'a basılıyor[cite: 26, 32, 50]. |
| **Geri/İleri Tuş Desteği** | [cite_start]SPA olmasına rağmen, **`history.pushState`** ve **`popstate`** event'leri ile tarayıcının adres çubuğu güncelleniyor ve geri/ileri tuşları aktif olarak çalışıyor[cite: 33, 34]. |
| **Duyarlı Tasarım (Responsive)** | [cite_start]Tüm arayüz, telefon, tablet ve masaüstü cihazlara uyumlu, **CSS Flexbox ve Grid** kullanılarak tasarlandı[cite: 13, 15, 44]. |
| **Arama & Filtreleme** | [cite_start]Arama input'u ile isme göre anlık arama ve kategori/yıla göre dinamik filtreleme yaptım[cite: 24]. |
| **Favorilerim Özelliği** | [cite_start]Kullanıcı favori medyaları **`localStorage`** kullanarak tarayıcıda saklayıp, ayrı bir menüden görebiliyor[cite: 11, 28, 52]. |

### 2. Kod Kalitesi ve Modern JS

* [cite_start]**Modern JS:** Projenin her yerinde **`const`** ve **`let`** kullanıldı, **`var`** kesinlikle kullanılmadı[cite: 46].
* [cite_start]**Asenkron Kodlama:** Veri çekme ve işleme süreçlerinde modern **`async/await`** yapısını kullandım[cite: 48].
* [cite_start]**Ayrılmış Mimari:** HTML, CSS ve JS dosyaları net bir şekilde ayırdım (inline style/script kullanılmadı)[cite: 7, 8, 64].

### 3. Bonuslar

* [cite_start]**Karanlık Mod (Dark Theme):** Tek bir tuşla tema değiştirilebiliyor ve bu tercih `localStorage` ile kaydediliyor[cite: 72].
* [cite_start]**Gelişmiş Sıralama:** Puana ve yayın yılına göre medyaları sıralama seçeneği ekledim[cite: 72].

---

## 🔗 Teslimat Linklerim

| Açıklama | Link |
| :--- | :--- |
| **GitHub Repository** | https://github.com/SauWebProgramming/web-tech-project-hidayetopuz16 |
| **Canlı GitHub Pages Linki** | https://sauwebprogramming.github.io/web-tech-project-hidayetopuz16/ |
| **YouTube Video Anlatım Linki** | [Kendi YouTube Video Linkimi Buraya Ekleyeceğim (Liste Dışı)] |
