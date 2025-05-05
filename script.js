const rawProducts = [
    ["Chaussures Antigravité", "https://image.made-in-china.com/202f0j00uvhiLEMdARkA/Kangoo-Jump-Shoes-Kangaroo-Anti-Gravity-Running-Jumping-Bouncing-Shoes.webp", "DH"],
    ["Miel ZCH", "https://media.istockphoto.com/id/598241944/fr/photo/miel-en-pot-et-bouquet-de-lavande-s%C3%A8che.jpg?s=612x612&w=0&k=20&c=N8QEPGZuQWQMjRHBW0RgRMn-heqdqZiThVCDq2H990g=", "DH"],
    ["Dattes el mejhoul", "https://media.istockphoto.com/id/1178070137/fr/photo/dates-medjool-frais-dans-un-bol-fond-gris-copiez-lespace.jpg?s=612x612&w=0&k=20&c=KSqmRxA-pKyP14HTQaT3NuGxHE5ZJ5SGpV047HwRbWM=", "DH"],
    ["Jus Dattes el mejhoul", "https://thumbs.dreamstime.com/b/boisson-de-jus-dattes-d%C3%A9licieux-avec-des-fra%C3%AEches-sur-table-en-bois-une-photo-closeup-r%C3%A9v%C3%A8le-un-verre-sa-riche-teinte-d-ambre-365116944.jpg", "DH"],
    ["Huile d'Argan", "https://img.passeportsante.net/1200x675/2021-05-03/i104245-huile-argan.webp", "DH"],
    ["Amandes Maroc", "https://www.bladi.net/img/logo/amande-americaine-maroc.jpg", "DH"],
    ["Safran Premium", "https://m.media-amazon.com/images/I/71Prfvax+PS._AC_UF1000,1000_QL80_.jpg", "DH"],
    ["Eau de Rose", "https://media.istockphoto.com/id/506669699/fr/photo/eau-de-rose-rose-et-de-magnifiques-fleurs-macro-horizontal.jpg?s=612x612&w=0&k=20&c=8SS9jnyWel63PyxvAEnwwuCNumdVQSqxN_1qla8FPTk=", "DH"],
    ["Pistaches Grillées", "https://www.goji.ma/cdn/shop/products/Pistachesgrilleessaleesbio.jpg?v=1672009454&width=1445", "DH"]
  ];

  function getRandomPrice(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }

  function getRandomRating() {
    return (Math.random() * 1 + 4).toFixed(1);
  }

  function renderProducts(products) {
    const productList = document.getElementById("product-list");
    products.forEach(([name, image_url, currency]) => {
      const price = getRandomPrice(5, 130);
      const rating = getRandomRating();

      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${image_url}" class="product-image" alt="${name}">
        <div class="product-name">${name}</div>
        <div class="product-price">${price} ${currency}</div>
        <div class="product-rating">⭐ ${rating}</div>
      `;
      productList.appendChild(card);
    });
  }

  function applyTheme(mode) {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(mode);
    document.getElementById("modeToggleBtn").textContent = mode === "dark-mode" ? "🌞" : "🌙";
    localStorage.setItem("darkMode", mode === "dark-mode");
  }

  function toggleDarkMode() {
    const isDark = document.body.classList.contains("dark-mode");
    applyTheme(isDark ? "light-mode" : "dark-mode");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const prefersDark = localStorage.getItem("darkMode") === "true";
    applyTheme(prefersDark ? "dark-mode" : "light-mode");

    renderProducts(rawProducts);

    document.getElementById("modeToggleBtn").addEventListener("click", toggleDarkMode);
  });