/* ================================================
   LOGIKA PRESTASI (ACHIEVEMENT)
   ================================================ */

// --- 1. DATA DUMMY (DATA LOKAL) ---
let achievements = [
    {
        id: 1,
        rank: "Juara 1 (Gold Medal)",
        event: "International Science and Invention Fair (ISIF) 2025",
        level: "Internasional",
        organizer: "IYSA & Universitas Udayana",
        winner: "Tim CIB Saintek (Ketua: Budi Santoso)",
        year: 2025
    },
    {
        id: 2,
        rank: "Best Presenter",
        event: "Konferensi Nasional Pendidikan Islam",
        level: "Nasional",
        organizer: "Kementerian Agama RI",
        winner: "Siti Aminah",
        year: 2024
    },
    {
        id: 3,
        rank: "Juara 2 Lomba Esai",
        event: "Pekan Ilmiah Mahasiswa UGM",
        level: "Universitas",
        organizer: "Universitas Gadjah Mada",
        winner: "Ahmad Fauzi",
        year: 2024
    },
    {
        id: 4,
        rank: "Finalis 10 Besar",
        event: "Kompetisi Bisnis Mahasiswa Indonesia (KBMI)",
        level: "Nasional",
        organizer: "Kemendikbud Ristek",
        winner: "Rina Kartika",
        year: 2023
    }
];

// --- 2. RENDER FUNCTION ---
function renderAchievements(data) {
    const container = document.getElementById('achListContainer');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888; grid-column:1/-1;">Belum ada data prestasi di kategori ini.</p>';
        return;
    }

    data.forEach(item => {
        // Tentukan Class CSS berdasarkan level
        let levelClass = "level-" + item.level.toLowerCase();
        if(item.level === "Regional/Provinsi") levelClass = "level-regional";

        const card = `
            <div class="ach-card ${levelClass}">
                <div class="ach-icon-bg">
                    <svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" stroke-width="2" fill="none"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                </div>
                
                <span class="ach-badge">${item.level}</span>
                
                <div class="ach-content">
                    <div class="ach-rank">${item.rank}</div>
                    <div class="ach-event">${item.event}</div>
                    
                    <div class="ach-meta">
                        <span class="ach-winner">Oleh: ${item.winner}</span>
                        <span>Penyelenggara: ${item.organizer}</span>
                        <span>Tahun: ${item.year}</span>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderAchievements(achievements);
});


// --- 3. FILTER LOGIC ---
const searchInput = document.getElementById('searchAch');
const filterSelect = document.getElementById('filterLevel');

function filterData() {
    const keyword = searchInput.value.toLowerCase();
    const level = filterSelect.value;

    const filtered = achievements.filter(item => {
        const matchKey = item.event.toLowerCase().includes(keyword) || 
                         item.winner.toLowerCase().includes(keyword) || 
                         item.rank.toLowerCase().includes(keyword);
                         
        let matchLevel = true;
        if(level !== 'all') {
            matchLevel = item.level === level;
        }

        return matchKey && matchLevel;
    });

    renderAchievements(filtered);
}

if(searchInput) searchInput.addEventListener('keyup', filterData);
if(filterSelect) filterSelect.addEventListener('change', filterData);


// --- 4. FORM SUBMIT ---
const achForm = document.getElementById('achForm');

if(achForm) {
    achForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Ambil Data
        const niu = document.getElementById('achNiu').value;
        const name = document.getElementById('achName').value;
        const eventName = document.getElementById('achEvent').value;
        const rank = document.getElementById('achRank').value;
        const level = document.getElementById('achLevel').value;
        const organizer = document.getElementById('achOrganizer').value;
        const pin = document.getElementById('achPin').value;

        // Validasi PIN Sederhana
        if(pin.length < 6) {
            Swal.fire('Error', 'PIN tidak valid!', 'error');
            return;
        }

        // Tambah Data Baru
        achievements.unshift({
            id: Date.now(),
            rank: rank,
            event: eventName,
            level: level,
            organizer: organizer,
            winner: name,
            year: new Date().getFullYear()
        });

        // Notifikasi Sukses
        Swal.fire({
            title: 'Berhasil!',
            text: 'Prestasi Anda telah ditambahkan ke daftar.',
            icon: 'success',
            confirmButtonColor: '#00695C'
        });

        achForm.reset();
        
        // Pindah ke tab daftar dan refresh tampilan
        window.switchAchTab('list');
        renderAchievements(achievements);
    });
}


// --- 5. SWITCH TAB LOGIC ---
window.switchAchTab = function(tabName) {
    // Sembunyikan semua view
    document.getElementById('view-list').classList.remove('active');
    document.getElementById('view-add').classList.remove('active');
    
    // Reset tombol
    const btns = document.querySelectorAll('.pub-tab-btn');
    btns.forEach(b => b.classList.remove('active'));

    // Tampilkan view yang dipilih
    if(tabName === 'list') {
        document.getElementById('view-list').classList.add('active');
        btns[0].classList.add('active');
    } else {
        document.getElementById('view-add').classList.add('active');
        btns[1].classList.add('active');
    }
}