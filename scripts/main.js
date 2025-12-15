// scripts/main.js

// Açıklama: Proje boyunca const ve let kullanılarak modern JavaScript (ES6+) standartlarına uyulmuştur.
const mediaListSection = document.getElementById('media-list'); 

// YENİLİK: mediaDetailContainer, modal içerisindeki content'i temsil ediyor.
const mediaDetailContainer = document.getElementById('media-detail'); 
const mediaDetailModal = document.getElementById('media-detail-modal'); // YENİ: Modal bindirme elementiniz

const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const yearFilter = document.getElementById('year-filter');
const typeFilter = document.getElementById('type-filter'); 
const sortFilter = document.getElementById('sort-filter');
const mainNav = document.getElementById('main-nav');
const loader = document.getElementById('loader');
const themeToggle = document.getElementById('theme-toggle'); // Tema butonu

let allMedia = []; 
let currentView = 'home'; 

// Açıklama: Karanlık Tema Yönetimi Fonksiyonları
const enableDarkTheme = () => {
    document.body.classList.add('dark-theme');
    document.body.classList.add('dark-theme-bg'); 
    document.body.classList.remove('light-theme-bg'); 
    themeToggle.textContent = '☀️ Açık Mod';
    localStorage.setItem('theme', 'dark'); 
};

const disableDarkTheme = () => {
    document.body.classList.remove('dark-theme');
    document.body.classList.remove('dark-theme-bg'); 
    document.body.classList.add('light-theme-bg'); 
    themeToggle.textContent = '🌙 Karanlık Mod';
    localStorage.setItem('theme', 'light'); 
};

// Başlangıçta temayı localStorage'dan yükle
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme'); 
    if (savedTheme === 'dark') {
        enableDarkTheme();
    } else {
        disableDarkTheme();
    } 
}

// Yüklenme durumunu gösteren fonksiyonlar
const showLoading = () => {
    loader.style.display = 'block';
    mediaListSection.style.display = 'none';
};

const hideLoading = () => {
    loader.style.display = 'none';
    mediaListSection.style.display = 'grid'; // Grid görünümüne geri dön
};

// Açıklama: fetch() API'si ve async/await kullanılarak veriler asenkron çekilir.
const fetchMediaData = async () => { 
    showLoading(); 
    try {
        const response = await fetch('data/media.json'); 
        if (!response.ok) {
             throw new Error(`HTTP hata kodu: ${response.status}. JSON dosyası bulunamadı!`);
        }
        const data = await response.json(); 
        allMedia = data.media; 
        
        // Eksik 'type' alanını otomatik tamamlama
        allMedia = allMedia.map(item => ({
            ...item,
            type: item.type || 'Film' // Eğer type alanı yoksa Film ata
        }));
        
        console.log('✅ VERİ BAŞARIYLA YÜKLENDİ.'); 
        
        initializeFilters(); 
        navigate('home');
        
    } catch (error) {
        console.error('❌ HATA: Veri yüklenirken sorun oluştu. Dosya yolunu kontrol edin.', error);
        mediaListSection.innerHTML = '<p>Veri yüklenemedi. Konsolu kontrol edin.</p>';
    } finally {
        hideLoading(); 
    }
};

const initializeFilters = () => {
    const categories = [...new Set(allMedia.map(m => m.category))];
    const years = [...new Set(allMedia.map(m => m.year))].sort((a, b) => b - a);
    categories.forEach(cat => categoryFilter.add(new Option(cat, cat)));
    years.forEach(year => yearFilter.add(new Option(year, year)));
};


const renderMediaList = (mediaArray) => { 
    mediaListSection.innerHTML = ''; 

    if (mediaArray.length === 0) {
        mediaListSection.innerHTML = '<p>Aradığınız kriterlere uygun medya bulunamadı.</p>';
        return;
    }
    
    const favoriteIds = getFavorites();

    mediaArray.forEach(media => {
        const card = document.createElement('div');
        const isFavorite = favoriteIds.includes(media.id);
        
        card.className = `media-card ${isFavorite ? 'is-favorite' : ''}`; 
        card.onclick = () => showDetail(media.id); 
        
        const ratingPercentage = (media.rating / 10) * 100;
        
        // POSTER RESMİNİ EKLEMEK İÇİN KOD BLOĞU GÜNCELLENDİ
        card.innerHTML = `
            <div class="media-poster-container"> 
                <img src="${media.poster_url}" alt="${media.title} Poster" class="media-poster-image">
            </div>
            
            <div class="media-info-text">
                <h3>${media.title} (${media.year})</h3>
                <p><strong>Kategori:</strong> ${media.category}</p>
                <p><strong>Puan:</strong> ${media.rating}/10</p>
                
                <div class="rating-bar-container">
                    <div class="rating-bar-fill" style="width: ${ratingPercentage}%;"></div>
                </div>
                
                ${isFavorite ? '<span>⭐ Favori</span>' : ''}
            </div>
        `;
        mediaListSection.appendChild(card);
    });
};


// Açıklama: Tüm filtreleme ve sıralama işlemlerini yöneten ana fonksiyon.
const applyFiltersAndSorting = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedYear = yearFilter.value;
    const selectedType = typeFilter.value; 
    const selectedSort = sortFilter.value; 

    
    let mediaToFilter = (currentView === 'favorites') ? allMedia.filter(m => getFavorites().includes(m.id)) : allMedia;

    // 1. Filtreleme
    let filteredMedia = mediaToFilter.filter(media => {
        const matchesSearch = media.title.toLowerCase().includes(searchTerm) || media.summary.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === "" || media.category === selectedCategory;
        const matchesYear = selectedYear === "" || media.year.toString() === selectedYear;
        
        // TÜR FİLTRESİ MANTIĞI
        const matchesType = selectedType === "" || media.type === selectedType;
        
        return matchesSearch && matchesCategory && matchesYear && matchesType; 
    });

    // 2. Sıralama (YENİLİK: Sorting mantığı)
    if (selectedSort !== 'none') {
        filteredMedia.sort((a, b) => {
            if (selectedSort === 'rating_desc') {
                return b.rating - a.rating; // Puana göre büyükten küçüğe
            } else if (selectedSort === 'year_desc') {
                return b.year - a.year; // Yıla göre büyükten küçüğe
            }
            return 0; 
        });
    }
    
    renderMediaList(filteredMedia);
};

// YENİ: Detay Modalını Gizleme Fonksiyonu
const hideDetail = () => {
    mediaDetailModal.style.display = 'none';
}


// Açıklama: Detay Modalını Gösterme 
const showDetail = (mediaId) => {
    const media = allMedia.find(m => m.id === mediaId);
    if (!media) return;

    mediaDetailModal.style.display = 'flex'; 

    // Başlık rengini kategoriye göre dinamik yap
    const titleColor = media.category === 'Bilim Kurgu' ? 'navy' : (media.category === 'Aksiyon' ? 'darkred' : 'purple');

    // Buton durumu ve metin/simge tanımlamaları 
    const isFav = getFavorites().includes(media.id);
    const buttonText = isFav ? 'Favorilerden Çıkar' : 'Favorilere Ekle';
    const buttonSymbol = isFav ? '★' : '☆'; 
    
    // DİNAMİK ALAN VE ETİKET BELİRLEME
    let detailLabel;
    let detailData;
    let durationDisplay; 

    if (media.type === 'Kitap') {
        detailLabel = 'Yazar';
        // Kitaplar için 'author' alanını kullan
        detailData = (media.author && Array.isArray(media.author)) ? media.author.join(', ') : 'Bilgi Yok';
        durationDisplay = `<p><strong>Sayfa:</strong> ${media.duration || 'N/A'}</p>`; 
    } else {
        detailLabel = 'Başroller';
        // Film/Diziler için 'stars' alanını kullan
        detailData = (media.stars && Array.isArray(media.stars)) ? media.stars.join(', ') : 'Bilgi Yok'; 
        
        if (media.type === 'Dizi') {
            // Dizi için detaylı süre bilgisi (episode_count alanı JSON'da olmalıdır)
            const episodes = media.episode_count ? ` (${media.episode_count} Bölüm)` : '';
            durationDisplay = `<p><strong>Sezon:</strong> ${media.duration || 'N/A'} ${episodes}</p>`;
        } else {
            // Film için standart süre bilgisi
            durationDisplay = `<p><strong>Süre:</strong> ${media.duration || 'N/A'}</p>`;
        }
    }
    
    const summaryText = media.summary || 'Bu medya için özet bulunmamaktadır.';
    const typeText = media.type || 'N/A';


    // Detay içeriğini modalın içindeki container'a yazdır
    mediaDetailContainer.innerHTML = `
        <div class="detail-card" style="padding-top: 25px;">
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                
                <div style="flex-shrink: 0;">
                    <img src="${media.poster_url}" alt="${media.title} Poster" style="width: 200px; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                </div>

                <div>
                    <h2 style="color: ${titleColor}; margin-top: 0;">${media.title} (${media.year})</h2>
                    <p><strong>Tür:</strong> ${typeText}</p>
                    <p><strong>Puan:</strong> ${media.rating} / 10</p>
                    <p><strong>Kategori:</strong> ${media.category}</p>
                    ${durationDisplay} <p><strong>${detailLabel}:</strong> ${detailData}</p> 
                </div>
            </div>

            <hr style="margin: 20px 0;">
            <h3>Özet</h3>
            <p>${summaryText}</p>
            
            <button 
                id="favorite-btn" 
                class="favorite-btn ${isFav ? 'favorited' : ''}"
                onclick="toggleFavorite(${media.id})"
                aria-label="${isFav ? 'Favorilerden Kaldır' : 'Favorilere Ekle'}"
            >
                <span class="button-text">${buttonText}</span> 
                <span class="button-icon">${buttonSymbol}</span>
            </button>
        </div>
    `;
};


// Açıklama: localStorage kullanılarak favori medya ID'leri tarayıcıda saklanır.
const getFavorites = () => {
    const favorites = localStorage.getItem('mediaFavorites');
    return favorites ? JSON.parse(favorites) : [];
};

// Açıklama: Favori ekleme/kaldırma işlevi (localStorage mantığı)
const toggleFavorite = (mediaId) => {
    let favorites = getFavorites();
    const index = favorites.indexOf(mediaId);

    if (index > -1) {
        favorites.splice(index, 1); // Kaldır
        alert('Favorilerden kaldırıldı!');
    } else {
        favorites.push(mediaId); // Ekle
        alert('Favorilere eklendi!');
    }

    localStorage.setItem('mediaFavorites', JSON.stringify(favorites));

    // Modal içindeki buton durumunu güncellemek için detay gösterimini tekrar çağır
    showDetail(mediaId); 
    
    // Favoriler veya Ana sayfadaki listeyi güncelle.
    applyFiltersAndSorting(); 
};


// Açıklama: Sayfa yönlendirme (SPA navigasyonu)
const navigate = (view) => {
    currentView = view;
    
    // Filtreleri resetle
    searchInput.value = '';
    categoryFilter.value = '';
    yearFilter.value = '';
    typeFilter.value = ''; 
    sortFilter.value = 'none'; 

    // Detay modalını gizle
    hideDetail(); 

    if (view === 'home') {
        history.pushState(null, '', `#tüm-medyalar`); 
        mediaListSection.style.display = 'grid';

    } else if (view === 'favorites') {
        history.pushState(null, '', `#favorilerim`); 
        mediaListSection.style.display = 'grid';
    }
    
    // Doğru listeyi göstermesi için applyFiltersAndSorting'i çağır.
    applyFiltersAndSorting();
};

// Event Listenerlar
searchInput.addEventListener('input', applyFiltersAndSorting);
categoryFilter.addEventListener('change', applyFiltersAndSorting);
yearFilter.addEventListener('change', applyFiltersAndSorting);
typeFilter.addEventListener('change', applyFiltersAndSorting); 
sortFilter.addEventListener('change', applyFiltersAndSorting); 

// Navigasyon Linkleri İçin Event Listener (Tüm Medyalar/Favorilerim)
mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        const view = link.getAttribute('data-view'); 
        navigate(view); 

        // Aktif linkin görsel olarak vurgulanması
        mainNav.querySelectorAll('a').forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

// Tema değiştirme düğmesi
themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
        disableDarkTheme();
    } else {
        enableDarkTheme();
    }
});

// Modal dışına tıklayınca kapatma
window.addEventListener('click', (event) => {
    // Eğer tıklanan element modalın kendisiyse (içindeki içerik değil) kapat.
    if (event.target == mediaDetailModal) {
        hideDetail();
    }
});

// ESC tuşu ile modal kapatma
window.addEventListener('keydown', (event) => {
    // ESC tuşuna basıldıysa ve modal açıksa
    if (event.key === 'Escape' && mediaDetailModal.style.display === 'flex') {
        hideDetail();
    }
});


// Geri/İleri Tuşu Yönetimi (popstate) 
window.addEventListener('popstate', () => {
    const hash = window.location.hash; 
    
    // Her durumda modalı kapat
    hideDetail();

    if (hash.includes('#tüm-medyalar') || hash === '') {
        // Eğer hash ana sayfaya döndüyse
        navigate('home');
        mainNav.querySelectorAll('a').forEach(navLink => navLink.classList.remove('active'));
        mainNav.querySelector('a[data-view="home"]').classList.add('active');
        
    } else if (hash.includes('#favorilerim')) {
        // Eğer hash favoriler sayfasına döndüyse
        navigate('favorites');
        mainNav.querySelectorAll('a').forEach(navLink => navLink.classList.remove('active'));
        mainNav.querySelector('a[data-view="favorites"]').classList.add('active');
        
    }
});

// Uygulama başladığında ilk temayı yükle ve veriyi çek
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme(); // Tema yüklemesi
    fetchMediaData(); // Veri çekme işlemi
});
