/* ================================================
   LOGIKA PORTAL BERITA (DUMMY DATA & FILTER)
   ================================================ */

// 1. DATA BERITA DUMMY
const newsData = [
    {
        id: 1,
        category: "kegiatan",
        title: "CIB UGM Gelar Webinar Moderasi Beragama untuk Gen-Z",
        date: "10 Feb 2026",
        image: "https://source.unsplash.com/800x600/?seminar,people",
        excerpt: "Menghadirkan narasumber ahli untuk membahas tantangan toleransi di era digital.",
        content: `
            <p><strong>Yogyakarta</strong> - Cakrawala Indonesia Bangkit (CIB) UGM sukses menyelenggarakan webinar nasional bertajuk "Moderasi Beragama di Era Digital" pada Sabtu lalu.</p>
            <p>Kegiatan ini dihadiri oleh lebih dari 200 peserta dari berbagai universitas di Indonesia. Ketua CIB UGM menyampaikan bahwa kegiatan ini merupakan wujud komitmen awardee dalam menjaga kebhinekaan.</p>
            <p>"Kita ingin Gen-Z tidak hanya pandai secara akademik, tapi juga bijak dalam beragama dan bersosial media," ujarnya dalam sambutan pembukaan.</p>
        `
    },
    {
        id: 2,
        category: "prestasi",
        title: "Membanggakan! Awardee CIB Raih Best Paper di Turki",
        date: "05 Feb 2026",
        image: "https://source.unsplash.com/800x600/?award,trophy",
        excerpt: "Budi Santoso, mahasiswa S2 Filsafat, berhasil mengharumkan nama bangsa di kancah internasional.",
        content: `
            <p>Kabar gembira datang dari Istanbul, Turki. Salah satu anggota aktif CIB UGM, Budi Santoso (Magister Filsafat), berhasil meraih penghargaan <strong>Best Paper Award</strong> dalam International Conference on Islamic Studies 2026.</p>
            <p>Paper yang diangkat berjudul "Relevansi Nilai Pesantren dalam Pembangunan Karakter Global". Budi berhasil menyisihkan ratusan peserta dari 30 negara.</p>
            <p>"Ini adalah bukti bahwa santri dan mahasiswa UGM mampu bersaing di level global," ungkap Budi.</p>
        `
    },
    {
        id: 3,
        category: "opini",
        title: "Opini: Peran Awardee dalam Pembangunan Desa Tertinggal",
        date: "01 Feb 2026",
        image: "https://source.unsplash.com/800x600/?village,community",
        excerpt: "Sebuah refleksi kritis tentang kewajiban pengabdian masyarakat bagi penerima beasiswa.",
        content: `
            <p><em>Oleh: Siti Aminah (Awardee S3 Penyuluhan)</em></p>
            <p>Beasiswa bukan sekadar privilese, melainkan tanggung jawab. Seringkali kita terjebak dalam menara gading akademis dan melupakan realitas masyarakat di akar rumput.</p>
            <p>Desa tertinggal membutuhkan sentuhan inovasi yang sederhana namun tepat guna. Bukan teori muluk-muluk, tapi pendampingan yang berkelanjutan. Sebagai awardee BIB, kita memiliki hutang moral untuk kembali dan memberdayakan mereka.</p>
        `
    },
    {
        id: 4,
        category: "kegiatan",
        title: "Bakti Sosial CIB Berbagi: Tebar Sembako di Kulon Progo",
        date: "20 Jan 2026",
        image: "https://source.unsplash.com/800x600/?charity,box",
        excerpt: "Divisi Pengabdian Masyarakat menyalurkan 100 paket sembako untuk warga terdampak bencana.",
        content: `
            <p>Divisi Pengabdian Masyarakat CIB UGM kembali turun ke lapangan. Kali ini, tim mengunjungi Desa Jatimulyo, Kulon Progo, untuk menyalurkan bantuan kepada warga yang terdampak tanah longsor.</p>
            <p>Sebanyak 100 paket sembako dan perlengkapan sekolah dibagikan. Kegiatan ini didukung oleh donasi kolektif dari seluruh awardee BIB UGM.</p>
        `
    },
    {
        id: 5,
        category: "opini",
        title: "Menulis Ilmiah: Antara Kewajiban dan Kebutuhan",
        date: "15 Jan 2026",
        image: "https://source.unsplash.com/800x600/?writing,laptop",
        excerpt: "Tips dan trik produktif menulis jurnal internasional di tengah kesibukan kuliah.",
        content: `
            <p>Banyak mahasiswa pascasarjana mengeluh sulit membagi waktu untuk publikasi. Padahal, menulis adalah keterampilan yang bisa dilatih.</p>
            <p>Kuncinya adalah konsistensi membaca dan membuat catatan kecil. Jangan menunggu sempurna untuk mulai menulis. Draft yang buruk bisa diedit, tapi kertas kosong tidak bisa diperbaiki.</p>
        `
    }
];

// 2. RENDER FUNCTION
function renderNews(filter = 'all') {
    const container = document.getElementById('newsContainer');
    container.innerHTML = '';

    const filteredData = filter === 'all' 
        ? newsData 
        : newsData.filter(item => item.category === filter);

    if(filteredData.length === 0) {
        container.innerHTML = '<p style="grid-column:1/-1; text-align:center;">Belum ada berita di kategori ini.</p>';
        return;
    }

    filteredData.forEach(item => {
        const card = `
            <article class="news-card">
                <div class="news-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="news-content">
                    <div class="news-meta">
                        <span class="tag ${item.category}">${item.category}</span>
                        <span class="date">${item.date}</span>
                    </div>
                    <h3 class="news-title">${item.title}</h3>
                    <p class="news-excerpt">${item.excerpt}</p>
                    <button class="btn-read" onclick="openNews(${item.id})">Baca Selengkapnya →</button>
                </div>
            </article>
        `;
        container.innerHTML += card;
    });
}

// 3. FILTER FUNCTION
window.filterNews = function(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active'); 

    renderNews(category);
}

// 4. MODAL LOGIC (POP UP)
const modal = document.getElementById('newsModal');
const closeBtn = document.querySelector('.close-modal');
const modalBody = document.getElementById('modalBody');

window.openNews = function(id) {
    const item = newsData.find(news => news.id === id);
    if(!item) return;

    modalBody.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="modal-img">
        <div class="modal-meta">
            <span class="tag ${item.category}">${item.category.toUpperCase()}</span> &nbsp;|&nbsp; ${item.date}
        </div>
        <h2 class="modal-title">${item.title}</h2>
        <div class="modal-text">
            ${item.content}
        </div>
    `;

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderNews('all');
});