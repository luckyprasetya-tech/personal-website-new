const CONFIG = {
  sosmed: {
    Instagram: "https://instagram.com/luckyprsty21",
    Facebook: "https://www.facebook.com/share/1K1R7SFpZr/",
    LinkedIn: "https://linkedin.com/in/Lucky-Achmad-Prasetya"
  },

  // Form masukan -> email (lihat PDF panduan, bagian "Form Email")
  // Isi dengan alamat dari Formspree, contoh: "https://formspree.io/f/abcdwxyz"
  formEndpoint: "",
  // Dipakai sebagai cadangan jika formEndpoint kosong (membuka aplikasi email)
  emailTujuan: "luckyprasetya2007@gmail.com"
};

/* ===== Terapkan pengaturan ke halaman =====
   Nama, logo, tagline, dan teks lain diubah langsung di index.html */
document.getElementById("tahun").textContent = new Date().getFullYear();

const boxSosmed = document.getElementById("sosmed");
Object.entries(CONFIG.sosmed).forEach(([nama, url]) => {
  if (!url) return;
  const a = document.createElement("a");
  a.href = url; a.textContent = nama;
  a.target = "_blank"; a.rel = "noopener noreferrer";
  boxSosmed.appendChild(a);
});

/* ===== Menu HP ===== */
const menu = document.getElementById("menu");
document.getElementById("menu-btn").onclick = () => menu.classList.toggle("buka");
menu.querySelectorAll("a").forEach(a => a.onclick = () => menu.classList.remove("buka"));

/* ===== Foto yang belum ada: tampilkan kotak abu-abu ===== */
document.querySelectorAll("img").forEach(img => {
  img.onerror = () => { img.style.visibility = "hidden"; };
});

/* ===== Form masukan ===== */
const form = document.getElementById("form-masukan");
const statusForm = document.getElementById("status-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  if (data.get("_gotcha")) return; // bot

  // Cadangan: tanpa Formspree, buka aplikasi email
  if (!CONFIG.formEndpoint) {
    const subjek = encodeURIComponent("Masukan dari " + data.get("nama"));
    const isi = encodeURIComponent(data.get("pesan") + "\n\nDari: " + data.get("nama") + " (" + data.get("email") + ")");
    window.location.href = `mailto:${CONFIG.emailTujuan}?subject=${subjek}&body=${isi}`;
    return;
  }

  statusForm.textContent = "Mengirim...";
  try {
    const res = await fetch(CONFIG.formEndpoint, {
      method: "POST", body: data, headers: { Accept: "application/json" }
    });
    if (res.ok) {
      statusForm.textContent = "Terima kasih! Masukan Anda sudah terkirim.";
      form.reset();
    } else {
      statusForm.textContent = "Gagal mengirim. Coba lagi nanti.";
    }
  } catch {
    statusForm.textContent = "Tidak ada koneksi internet.";
  }
});
