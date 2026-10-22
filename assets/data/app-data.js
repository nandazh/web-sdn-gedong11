// Function terpusat untuk mengambil data JSON
async function ambilData(url) {
  try {
    const respon = await fetch(url);
    if (!respon.ok) throw new Error(`Gagal memuat ${url}`);
    return await respon.json();
  } catch (error) {
    console.error("Terjadi Kesalahan Data:", error);
    return null;
  }
}

// Handler Render Halaman Pengumuman
async function muatHalamanPengumuman() {
  const wadah = document.getElementById("wadah-pengumuman");
  if (!wadah) return;

  const dataPengumuman = await ambilData("assets/data/pengumuman.json");
  if (!dataPengumuman) {
    wadah.innerHTML = "<p>Gagal memuat data pengumuman.</p>";
    return;
  }

  wadah.innerHTML = dataPengumuman.map(item => `
    <div class="card-pengumuman" style="border: 1px solid var(--garis-border); padding: 20px; border-radius: 12px; margin-bottom: 20px; background: var(--bg-kartu);">
      <span style="font-size: 0.8rem; color: #007bff; font-weight: 600;">${item.kategori} • ${item.tanggal}</span>
      <h3 style="margin: 8px 0; color: var(--teks-utama);">${item.judul}</h3>
      <p style="color: var(--teks-deskripsi); font-size: 0.9rem;">${item.ringkasan}</p>
      ${item.filePdf ? `<a href="${item.filePdf}" target="_blank" style="color: #007bff; font-size: 0.85rem; font-weight: 600; text-decoration: none;"><i class="fa-solid fa-file-pdf"></i> Unduh Berkas PDF</a>` : ''}
    </div>
  `).join('');
}

// Handler Render Halaman Akademik
async function muatHalamanAkademik() {
  const wadahEskel = document.getElementById("wadah-ekstrakurikuler");
  if (!wadahEskel) return;

  const dataAkademik = await ambilData("assets/data/akademik.json");
  if (!dataAkademik) return;

  wadahEskel.innerHTML = dataAkademik.ekstrakurikuler.map(eskul => `
    <div style="border: 1px solid var(--garis-border); padding: 16px; border-radius: 10px; background: var(--bg-kartu);">
      <h4 style="margin: 0 0 6px 0; color: var(--teks-utama);">${eskul.nama}</h4>
      <p style="margin: 0; font-size: 0.85rem; color: var(--teks-deskripsi);">Jadwal: ${eskul.hari} | Pembina: ${eskul.pembina}</p>
    </div>
  `).join('');
}

// Jalankan otomatis saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  muatHalamanPengumuman();
  muatHalamanAkademik();
});