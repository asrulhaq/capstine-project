const url = "https://681245c23ac96f7119a77e57.mockapi.io/nyoba";

// Ambil semua artikel
async function getArticles(page) {
  try {
    const response = await fetch(`${url}?page=${page}&limit=6`);
    const data = await response.json();

    // Tampilkan sorotan artikel pertama & kedua
    const sorotArticle = document.getElementById("sorotArticle");
    if (sorotArticle) {
      sorotArticle.innerHTML = `
        <div class="col">
          ${[0, 1].map(i => `
            <div class="mb-3">
              <div class="card h-100">
                <img src="${data[i].image}" class="card-img-top" alt="${data[i].title}" />
                <div class="card-body">
                  <h2 class="card-title fw-bold mb-3">${data[i].title}</h2>
                  <p class="card-text">${data[i].description}</p>
                  <a href="articleDetail.html?id=${data[i].id}" class="btn btn-success">Baca Selengkapnya</a>
                </div>
              </div>
            </div>
          `).join("")}
        </div>`;
    }

    // Tampilkan daftar artikel lainnya
    const myArticles = document.getElementById("myArticles");
    if (myArticles) {
      myArticles.innerHTML = data.slice(2).map(article => `
        <div class="col-md-12">
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${article.image}" class="img-fluid rounded-start" alt="${article.title}" />
              </div>
              <div class="col-md-8">
                <div class="card-body d-flex align-items-center">
                  <div>
                    <h5 class="card-title fw-bold" style="font-size: 20px">${article.title}</h5>
                    <a href="articleDetail.html?id=${article.id}" class="btn btn-success">Baca Selengkapnya</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join("");
    }
  } catch (error) {
    console.error("Gagal mengambil artikel:", error);
  }
}

// Ambil artikel berdasarkan ID
async function getArticleById(id) {
  try {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();

    const articleDetail = document.getElementById("articleDetail");
    if (articleDetail) {
      articleDetail.innerHTML = `
        <div class="card mb-5">
          <img src="${data.image}" class="card-img-top" alt="${data.title}">
          <div class="card-body">
            <h2 class="card-title">${data.title}</h2>
            <p class="card-text" style="font-size: 18px">${data.article}</p>
            <p class="card-text"><small class="text-muted">${data.author}</small></p>
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error("Gagal memuat detail artikel:", error);
  }
}

// Event load halaman
window.addEventListener("load", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id) {
    getArticleById(id);
  } else {
    getArticles(1);
  }
});

// Tombol Next dan Prev di halaman detail
document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextArticleButton");
  const prevBtn = document.getElementById("prevArticleButton");

  if (nextBtn || prevBtn) {
    const urlParams = new URLSearchParams(window.location.search);
    const currentId = parseInt(urlParams.get("id"));

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const nextId = currentId + 1;
        window.location.href = `articleDetail.html?id=${nextId}`;
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const prevId = currentId - 1;
        if (prevId >= 1) {
          window.location.href = `articleDetail.html?id=${prevId}`;
        }
      });
    }
  }
});
