const rawProducts = [
      ["Chaussures Antigravité", "Kangoo.avif", "DH"],
      ["Miel ZCH", "miel.jpg", "DH"],
      ["Dattes el mejhoul", "dattes.jpg", "DH"],
      ["Jus Dattes el mejhoul", "jusdattes.jpg", "DH"],
      ["Huile d'Argan", "zitargan.webp", "DH"],
      ["Amandes Maroc", "amandes.jpg", "DH"],
      ["Safran Premium", "safran_.jpg", "DH"],
      ["Eau de Rose", "eau.jpg", "DH"],
      ["Pistaches Grillées", "pistaches.jpg", "DH"],
      ["Thé Marocain", "dekkka.jpg", "DH"],
      ["Couscous Fin", "COUSCOUS.jpg", "DH"],
      ["Tajine en Céramique", "tajines.png", "DH"],
      ["Savon Noir", "savon.jpg", "DH"],
      ["Huile d'Olive", "zitzitoun.jpg", "DH"],
      ["Tapis Berbère", "zarbia.jpg", "DH"]
    ];
    let products = rawProducts.map(product => {
      return {
        name: product[0],
        image_url: product[1],
        currency: product[2],
        price: getRandomPrice(20, 300),
        rating: getRandomRating()
      };
    });
    let currentPage = 1;
    const productsPerPage = 4;
    let filteredProducts = [...products];
    let cart = [];

    function getRandomPrice(min, max) {
      return (Math.random() * (max - min) + min).toFixed(2);
    }
    function getRandomRating() {
      return (Math.random() * 1 + 4).toFixed(1);
    }

    function showToast(message) {
      const toast = document.getElementById('toastNotification');
      toast.textContent = message;
      toast.style.display = 'block';
      
      setTimeout(() => {
        toast.style.display = 'none';
      }, 3000);
    }
    function renderProducts() {
      const productList = document.getElementById("product-list");
      productList.innerHTML = '';
      
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const productsToShow = filteredProducts.slice(startIndex, endIndex);
      
      if (productsToShow.length === 0) {
        productList.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Aucun produit trouvé</p>';
        return;
      }
      productsToShow.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.image_url}" class="product-image" alt="${product.name}">
          <div class="product-name">${product.name}</div>
          <div class="product-price">${product.price} ${product.currency}</div>
          <div class="product-rating">⭐ ${product.rating}</div>
        `;
        card.addEventListener('click', () => {
          openProductModal(product);
        });
        
        productList.appendChild(card);
      });
      
      updatePagination();
    }

    function openProductModal(product) {
      const modal = document.getElementById('productModal');
      document.getElementById('modalImage').src = product.image_url;
      document.getElementById('modalName').textContent = product.name;
      document.getElementById('modalPrice').textContent = `${product.price} ${product.currency}`;
      document.getElementById('modalRating').textContent = `Note: ${product.rating} ⭐`;
      
      const addToCartBtn = document.getElementById('modalAddToCart');
      addToCartBtn.onclick = () => {
        addToCart(product);
        modal.classList.remove('show');
      };
      
      modal.classList.add('show');
    }

    function addToCart(product) {
      cart.push(product);
      showToast(`${product.name} ajouté au panier!`);
    }

    function updatePagination() {
      const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
      document.getElementById('pageInfo').textContent = `Page ${currentPage} sur ${totalPages}`;
      document.getElementById('prevPage').disabled = currentPage === 1;
      document.getElementById('nextPage').disabled = currentPage === totalPages || totalPages === 0;
    }

    function filterProducts() {
      const searchTerm = document.getElementById('searchInput').value.toLowerCase();
      filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
      );
      currentPage = 1;
      renderProducts();
    }

    function sortProducts() {
      const sortValue = document.getElementById('sortSelect').value;
      
      filteredProducts.sort((a, b) => {
        switch (sortValue) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'price-asc':
            return parseFloat(a.price) - parseFloat(b.price);
          case 'price-desc':
            return parseFloat(b.price) - parseFloat(a.price);
          case 'rating-asc':
            return parseFloat(a.rating) - parseFloat(b.rating);
          case 'rating-desc':
            return parseFloat(b.rating) - parseFloat(a.rating);
          default:
            return 0;
        }
      });
      
      renderProducts();
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

      renderProducts();

      document.getElementById("modeToggleBtn").addEventListener("click", toggleDarkMode);
      document.getElementById("searchInput").addEventListener("input", filterProducts);
      document.getElementById("sortSelect").addEventListener("change", sortProducts);
      document.getElementById("prevPage").addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderProducts();
        }
      });
      document.getElementById("nextPage").addEventListener("click", () => {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage < totalPages) {
          currentPage++;
          renderProducts();
        }
      });
      document.getElementById("closeModal").addEventListener("click", () => {
        document.getElementById("productModal").classList.remove("show");
      });
      
      
      document.getElementById("productModal").addEventListener("click", (e) => {
        if (e.target === document.getElementById("productModal")) {
          document.getElementById("productModal").classList.remove("show");
        }
      });
    });
