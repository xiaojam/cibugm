/* ================================================
   LOGIKA PUBLIKASI (READ & WRITE)
   ================================================ */

// --- 1. SETUP FIREBASE (Uncomment saat deploy) ---
/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = { ... }; 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
*/

// --- 2. DATA DUMMY ---
let publications = [
    {
        id: 1,
        title: "Moderasi Beragama dalam Prespektif Digital: Studi Kasus Gen Z",
        type: "Jurnal Internasional",
        venue: "Journal of Digital Religion",
        year: 2024,
        author: "Budi Santoso (NIU: 456789)",
        link: "#"
    },
    {
        id: 2,
        title: "Peran Awardee dalam Pembangunan Desa Berkelanjutan",
        type: "Prosiding",
        venue: "International Conference on Community Service",
        year: 2023,
        author: "Siti Aminah (NIU: 123456)",
        link: "#"
    }
];

// --- 3. RENDER FUNCTION ---
function renderPublications(data) {
    const container = document.getElementById('pubListContainer');
    container.innerHTML = ''; 

    if (data.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888; grid-column:1/-1;">Belum ada data publikasi.</p>';
        return;
    }

    data.forEach(pub => {
        let typeClass = "";
        const t = pub.type.toLowerCase();
        if(t.includes("internasional")) typeClass = "type-jurnal-internasional";
        else if(t.includes("nasional")) typeClass = "type-jurnal-nasional";
        else if(t.includes("prosiding")) typeClass = "type-prosiding";
        else if(t.includes("buku")) typeClass = "type-buku";
        else typeClass = "type-media";

        const card = `
            <div class="pub-card ${typeClass}">
                <span class="pub-badge">${pub.type}</span>
                <div class="pub-title">${pub.title}</div>
                <div class="pub-meta">
                    <span class="pub-author">Penulis: ${pub.author}</span>
                    <span>${pub.venue} (${pub.year})</span>
                </div>
                <a href="${pub.link}" target="_blank" class="btn-link-pub">Lihat Publikasi</a>
            </div>
        `;
        container.innerHTML += card;
    });
}

renderPublications(publications);


// --- 4. LOGIKA TAMBAH DATA ---
const pubForm = document.getElementById('pubForm');

if(pubForm) {
    pubForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const niu = document.getElementById('pubNIU').value;
        const pin = document.getElementById('pubPIN').value;
        const title = document.getElementById('pubTitle').value;
        const type = document.getElementById('pubType').value;
        const year = document.getElementById('pubYear').value;
        const venue = document.getElementById('pubVenue').value;
        const link = document.getElementById('pubLink').value;

        // Validasi PIN
        if(pin.length < 6) {
            Swal.fire('Gagal', 'PIN tidak valid!', 'error');
            return;
        }

        // --- FIREBASE ADD LOGIC (UNCOMMENT) ---
        /*
        try {
            await addDoc(collection(db, "publications"), {
                niu: niu,
                title: title,
                type: type,
                year: year,
                venue: venue,
                link: link,
                createdAt: serverTimestamp()
            });
            Swal.fire('Berhasil', 'Publikasi berhasil ditambahkan!', 'success');
        } catch (error) { console.error(error); }
        */

        // MOCKUP ADD LOCAL
        publications.unshift({
            id: Date.now(),
            title: title,
            type: type,
            venue: venue,
            year: year,
            author: `Awardee (NIU: ${niu})`,
            link: link
        });

        Swal.fire('Berhasil!', 'Publikasi telah ditambahkan ke daftar.', 'success');
        pubForm.reset();
        
        window.switchPubTab('list');
        renderPublications(publications);
    });
}


// --- 5. LOGIKA FILTER & SEARCH ---
const searchInput = document.getElementById('searchPub');
const filterSelect = document.getElementById('filterType');

function filterData() {
    const keyword = searchInput.value.toLowerCase();
    const category = filterSelect.value;

    const filtered = publications.filter(pub => {
        const matchKeyword = pub.title.toLowerCase().includes(keyword) || pub.author.toLowerCase().includes(keyword);
        const matchCategory = category === 'all' || pub.type === category;
        return matchKeyword && matchCategory;
    });

    renderPublications(filtered);
}

if(searchInput) searchInput.addEventListener('keyup', filterData);
if(filterSelect) filterSelect.addEventListener('change', filterData);


// --- 6. SWITCH TAB ---
window.switchPubTab = function(tabName) {
    document.getElementById('view-list').classList.remove('active');
    document.getElementById('view-add').classList.remove('active');
    
    const btns = document.querySelectorAll('.pub-tab-btn');
    btns.forEach(b => b.classList.remove('active'));

    if(tabName === 'list') {
        document.getElementById('view-list').classList.add('active');
        btns[0].classList.add('active');
    } else {
        document.getElementById('view-add').classList.add('active');
        btns[1].classList.add('active');
    }
}