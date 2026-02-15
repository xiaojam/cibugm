/* ================================================
   LOGIKA REPORT (PENDATAAN & KELULUSAN)
   ================================================ */

// --- 1. SETUP FIREBASE ---
/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "API_KEY_ANDA",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
*/

// --- 2. LOGIKA SWITCH TAB FORM ---
window.switchForm = function(type) {
    document.getElementById('form-register').classList.remove('active');
    document.getElementById('form-graduate').classList.remove('active');
    
    const btns = document.querySelectorAll('.toggle-btn');
    btns.forEach(b => b.classList.remove('active'));

    if(type === 'register') {
        document.getElementById('form-register').classList.add('active');
        btns[0].classList.add('active');
    } else {
        document.getElementById('form-graduate').classList.add('active');
        btns[1].classList.add('active');
    }
}


// --- 3. LOGIKA FORM SUBMIT ---
const registForm = document.getElementById('registForm');

if(registForm) {
    registForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Ambil Data Input 
        const name = document.getElementById('regName').value;
        const niu = document.getElementById('regNIU').value;
        
        // AMBIL DUA DATA BARU
        const faculty = document.getElementById('regFaculty').value; 
        const prodi = document.getElementById('regProdi').value; 
        
        const level = document.getElementById('regLevel').value;
        const batch = document.getElementById('regBatch').value; 
        const pin = document.getElementById('regPIN').value;

        // Validasi PIN
        if(pin.length !== 6) {
            Swal.fire('Error', 'PIN harus terdiri dari 6 digit angka!', 'error');
            return;
        }

        // --- FIREBASE SAVE LOGIC (UNCOMMENT NANTI) ---
        /*
        try {
            const docRef = doc(db, "awardees", niu);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                Swal.fire('Gagal', 'NIU ini sudah terdaftar sebelumnya!', 'warning');
            } else {
                await setDoc(docRef, {
                    nama: name,
                    niu: niu,
                    fakultas: faculty, // Simpan Fakultas
                    prodi: prodi,      // Simpan Prodi
                    jenjang: level,
                    angkatan: batch,
                    pin: pin, 
                    status: "Aktif",
                    judul_akhir: "-",
                    createdAt: serverTimestamp()
                });
                Swal.fire('Berhasil!', 'Data Anda telah tersimpan.', 'success');
                registForm.reset();
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Terjadi kesalahan server.', 'error');
        }
        */

        // MOCKUP SUKSES 
        Swal.fire({
            title: 'Berhasil!',
            text: `Data ${name} (${niu}) dari ${faculty} - ${prodi} telah disimpan.`,
            icon: 'success',
            confirmButtonColor: '#00695C'
        });
        registForm.reset();
    });
}


// --- 4. LOGIKA FORM SUBMIT (LAPOR LULUS) ---
const gradForm = document.getElementById('gradForm');

if(gradForm) {
    gradForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const niu = document.getElementById('gradNIU').value;
        const pin = document.getElementById('gradPIN').value;
        const finalTitle = document.getElementById('gradTitle').value;

        // --- FIREBASE UPDATE LOGIC (UNCOMMENT) ---
        /*
        try {
            const docRef = doc(db, "awardees", niu);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                
                // 1. Cek Kesesuaian PIN
                if (data.pin !== pin) {
                    Swal.fire('Akses Ditolak', 'PIN Keamanan Salah!', 'error');
                    return;
                }

                // 2. Cek Status 
                if (data.status === "Lulus") {
                    Swal.fire('Info', 'Anda sudah tercatat Lulus sebelumnya.', 'info');
                    return;
                }

                // 3. Update Status ke "Lulus" & Simpan Judul
                await updateDoc(docRef, {
                    status: "Lulus",
                    judul_akhir: finalTitle,
                    graduatedAt: serverTimestamp()
                });

                Swal.fire('Selamat!', 'Status kelulusan berhasil diverifikasi.', 'success');
                gradForm.reset();

            } else {
                Swal.fire('Gagal', 'NIU tidak ditemukan. Silakan lakukan pendataan awal terlebih dahulu.', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Gagal memproses permintaan.', 'error');
        }
        */

        // MOCKUP SUKSES
        Swal.fire({
            title: 'Verifikasi Berhasil',
            text: `NIU ${niu} diverifikasi. Status diubah menjadi LULUS. Judul Akhir disimpan.`,
            icon: 'success',
            confirmButtonColor: '#FBC02D',
            color: '#333'
        });
    });
}