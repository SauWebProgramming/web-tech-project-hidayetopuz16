# 🎬 ISE-201 Web Teknolojileri Projesi: Benim Medya Kitaplığım (SPA)

Merhaba, bu repository, ISE-201 Web Teknolojileri dersi için hazırladığım **Proje Ödevi (Seçenek 1: İnteraktif Medya Kitaplığı)**'na aittir.

Projem, sunucu tarafı kod kullanmadan, tamamen modern **HTML5, CSS3 ve ES6+ JavaScript** ile geliştirdiğim bir Tek Sayfa Uygulamasıdır (Single Page Application - SPA). Uygulama, **Film, Dizi ve Kitap** gibi farklı medya türlerini tek bir arayüzde yönetebilecek şekilde tasarlandı.

---

## 💻 Uygulamanın Çalışma Mantığı ve Teknik Detaylar

### 1. Temel Gereksinimler

| Gereksinim | Açıklama |
| :--- | :--- |
| **Veri Yönetimi** | Medya bilgilerini, `data/media.json` dosyasından **`fetch()` API** kullanarak asenkron (`async/await`) yapısıyla çektim. JSON içerisindeki **yinelenen ID'leri düzelttim** ve sıralamaya uygun benzersiz ID'ler atadım. |
| **Tek Sayfa Uygulama (SPA)** | Detay sayfaları dahil, sayfa yenilenmesi olmadan dinamik olarak JavaScript ile DOM’a basıyorum. Detay modalını, Kitap türü için **Yazar/Sayfa Sayısı** gibi bilgileri dinamik olarak gösterecek şekilde kodladım. |
| **Geri/İleri Tuş Desteği** | SPA olmasına rağmen, **`history.pushState`** ve **`popstate`** event'lerini kullanarak tarayıcının adres çubuğunu güncelledim ve geri/ileri tuşlarının aktif çalışmasını sağladım. |
| **Duyarlı Tasarım (Responsive)** | Tüm arayüzü, telefon, tablet ve masaüstü cihazlara uyumlu olacak şekilde, **CSS Flexbox ve Grid** kullanarak tasarladım. |
| **Arama & Filtreleme** | Arama input'u ile isme göre anlık arama ve kategori/yıla göre dinamik filtreleme yaptım. **Yeni eklenen 'Kitap' türü için de filtreleme özelliğini aktif ettim.** |
| **Favorilerim Özelliği** | Kullanıcıların favori medyaları **`localStorage`** kullanarak tarayıcıda kalıcı olarak saklanabiliyor ve ayrı bir menüden görüntülenebiliyor. |

### 2. Kod Kalitesi ve Modern JS

* **Modern JS:** Projenin her yerinde modern **`const`** ve **`let`** kullandım, **`var`** kullanımından kesinlikle kaçındım.
* **Asenkron Kodlama:** Veri çekme ve işleme süreçlerinde modern **`async/await`** yapısını kullandım.
* **Ayrılmış Mimari:** HTML, CSS ve JS dosyalarını net bir şekilde ayırarak (inline style/script kullanmadan) temiz bir mimari oluşturdum.
* **Dinamik Detay Yönetimi:** `main.js` içinde medya türüne (`Film`, `Dizi`, `Kitap`) göre detay modalında gösterilecek bilgiyi (`stars`/`author`, `duration`/`sayfa sayısı`) dinamik olarak değiştiren mantığı uyguladım.

### 3. Bonuslar

* **Karanlık Mod (Dark Theme):** Tek bir tuşla tema değiştirilebiliyor ve bu tercihi `localStorage` ile kaydediyorum.
* **Gelişmiş Sıralama:** Puana ve yayın yılına göre medyaları sıralama seçeneği ekledim.

---

## 🔗 Teslimat Linklerim

| Açıklama | Link |
| :--- | :--- |
| **GitHub Repository** | https://github.com/SauWebProgramming/web-tech-project-hidayetopuz16 |
| **Canlı GitHub Pages Linki** | https://sauwebprogramming.github.io/web-tech-project-hidayetopuz16/ |
| **YouTube Video Anlatım Linki** | https://www.youtube.com/watch?v=I5Q1mZFoudw |
