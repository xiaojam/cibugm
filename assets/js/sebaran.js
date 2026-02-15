/* ================================================
   LOGIKA GRAFIK SEBARAN (CHART.JS)
   ================================================ */

// --- 1. SETUP FIREBASE ---
/*
import { initializeApp } from "...";
import { getFirestore, collection, getDocs } from "...";

*/

// --- 2. DATA DUMMY ---
const dataJenjang = {
    labels: ['S1 (Sarjana)', 'S2 (Magister)', 'S3 (Doktoral)'],
    values: [25, 120, 45] 
};

const dataAngkatan = {
    labels: ['2022', '2023', '2024', '2025'],
    values: [30, 50, 65, 45]
};

const dataFakultas = {
    labels: ['Filsafat', 'Pascasarjana', 'FIB', 'Fisipol', 'MIPA'],
    values: [45, 40, 35, 30, 25]
};

// --- 3. KONFIGURASI WARNA CIB UGM ---
const colorPrimary = '#00695C';
const colorAccent = '#FBC02D';
const colorDark = '#004D40';
const colorGray = '#eceff1';

// --- 4. RENDER CHART ---
document.addEventListener("DOMContentLoaded", function() {
    
    // CHART 1: JENJANG 
    const ctxJenjang = document.getElementById('chartJenjang');
    if(ctxJenjang) {
        new Chart(ctxJenjang, {
            type: 'doughnut',
            data: {
                labels: dataJenjang.labels,
                datasets: [{
                    data: dataJenjang.values,
                    backgroundColor: [colorAccent, colorPrimary, colorDark],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    // CHART 2: ANGKATAN
    const ctxAngkatan = document.getElementById('chartAngkatan');
    if(ctxAngkatan) {
        new Chart(ctxAngkatan, {
            type: 'bar',
            data: {
                labels: dataAngkatan.labels,
                datasets: [{
                    label: 'Jumlah Awardee',
                    data: dataAngkatan.values,
                    backgroundColor: colorPrimary,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // CHART 3: FAKULTAS
    const ctxFakultas = document.getElementById('chartFakultas');
    if(ctxFakultas) {
        new Chart(ctxFakultas, {
            type: 'bar',
            data: {
                labels: dataFakultas.labels,
                datasets: [{
                    label: 'Jumlah Mahasiswa',
                    data: dataFakultas.values,
                    backgroundColor: [colorPrimary, colorAccent, colorDark, '#2980b9', '#8e44ad'],
                    borderRadius: 5,
                    indexAxis: 'y', 
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: { beginAtZero: true }
                }
            }
        });
    }
});