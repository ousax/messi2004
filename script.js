 const rawProducts = [
        ["Chaussures Antigravité", "images/Kangoo.avif", "DH", "Des chaussures révolutionnaires qui réduisent l'impact sur les articulations. Parfaites pour le fitness et la rééducation."],
        ["Miel ZCH", "images/miel.jpg", "DH", "Miel 100% naturel produit dans les montagnes de l'Atlas. Riche en antioxydants et enzymes bénéfiques."],
        ["Dattes el mejhoul", "images/dattes.jpg", "DH", "Dattes premium du Maroc, sucrées naturellement et riches en fibres. Un super aliment énergétique."],
        ["Jus Dattes el mejhoul", "images/jusdattes.jpg", "DH", "Jus pur de dattes sans additifs. Source naturelle d'énergie et de minéraux essentiels."],
        ["Huile d'Argan", "images/zitargan.webp", "DH", "L'or liquide du Maroc. Hydrate en profondeur la peau et les cheveux. Produit selon des méthodes traditionnelles."],
        ["Amandes Maroc", "images/amandes.jpg", "DH", "Amandes biologiques cultivées dans les régions fertiles du Maroc. Croquantes et pleines de nutriments."],
        ["Safran Premium", "images/safran_.jpg", "DH", "Safran de première qualité récolté à la main. Un gramme d'or rouge pour sublimer vos plats."],
        ["Eau de Rose", "images/eau.jpg", "DH", "Hydrolat de rose naturelle pour tonifier et rafraîchir la peau. Parfum délicat et propriétés apaisantes."],
        ["Pistaches Grillées", "images/pistaches.jpg", "DH", "Pistaches grillées à sec, sans sel ajouté. Une collation saine et savoureuse."],
        ["Thé Marocain", "images/dekkka.jpg", "DH", "Mélange exclusif de thé vert et de menthe fraîche. La boisson traditionnelle marocaine."],
        ["Couscous Fin", "images/COUSCOUS.jpg", "DH", "Semoule de blé dur de qualité supérieure. La base authentique du plat national marocain."],
        ["Tajine en Céramique", "images/tajines.png", "DH", "Tajine traditionnel pour une cuisson lente et savoureuse. Fabriqué par des artisans locaux."],
        ["Savon Noir", "images/savon.jpg", "DH", "Savon naturel au ghassoul et huile d'olive. Nettoyant profond pour le corps et le visage."],
        ["Huile d'Olive", "images/zitzitoun.jpg", "DH", "Huile d'olive extra vierge pressée à froid. Fruitée et riche en polyphénols antioxydants."],
        ["Tapis Berbère", "images/zarbia.jpg", "DH", "Tapis tissé à la main par des artisans berbères. Motifs traditionnels et laine naturelle."]
        ];
    let products = rawProducts.map(product => {
      return {
        name: product[0],
        image_url: product[1],
        currency: product[2],
        description: product[3],
        price: getRandomPrice(20, 300),
        rating: getRandomRating()
      };
    });
    
    let currentPage = 1;
    const productsPerPage = 4;
    let filteredProducts = [...products];
    let cart = [];
    let imageInterval;

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
      // Clear any existing interval
      clearInterval(imageInterval);
      
      const modal = document.getElementById('productModal');
      const imageContainer = document.getElementById('modalImageContainer');
      const galleryNav = document.getElementById('galleryNav');
      
      // Clear previous content
      imageContainer.innerHTML = '';
      galleryNav.innerHTML = '';
      
      // Set main product info
      document.getElementById('modalName').textContent = product.name;
      document.getElementById('modalPrice').textContent = `${product.price} ${product.currency}`;
      document.getElementById('modalRating').textContent = `Note: ${product.rating} ⭐`;
      document.getElementById('modalDescription').textContent = product.description;
      
      // Create 3 identical images (hidden by default)
          // Create 3 image variations (e.g., "/images/miel_1.jpg", "/images/miel_2.jpg")
  for (let i = 0; i < 3; i++) {
    const img = document.createElement('img');
    // Generate variation path (e.g., "/images/miel" + "_1.jpg")
    const basePath = product.image_url.substring(0, product.image_url.lastIndexOf('.'));
    const extension = product.image_url.substring(product.image_url.lastIndexOf('.'));
    img.src = `${basePath}_${i+1}${extension}`;
    
    // Fallback to main image if variation doesn't exist
    img.onerror = function() {
      this.src = product.image_url;
    };
    
    img.alt = `${product.name} - Vue ${i+1}`;
    img.className = 'modal-image';
    imageContainer.appendChild(img);
    
    // Create navigation dots
    const dot = document.createElement('div');
    dot.className = 'gallery-dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      showImage(i);
      clearInterval(imageInterval);
      startImageRotation();
    });
    galleryNav.appendChild(dot);
  }
      
      // Show first image immediately
      const images = document.querySelectorAll('.modal-image');
      images[0].classList.add('active');
      
      // Start auto-rotation after 2 seconds
      startImageRotation();
      
      // Set up buttons
      document.getElementById('modalOrderBtn').onclick = () => {
        showToast(`Commande passée pour ${product.name}!`);
        closeModal();
      };
      
      document.getElementById('modalAddToCart').onclick = () => {
        addToCart(product);
        closeModal();
      };
      
      modal.classList.add('show');
    }
    
    function startImageRotation() {
      let currentIndex = 0;
      const images = document.querySelectorAll('.modal-image');
      const dots = document.querySelectorAll('.gallery-dot');
      
      imageInterval = setInterval(() => {
        // Hide current image
        images[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        // Move to next image
        currentIndex = (currentIndex + 1) % images.length;
        
        // Show new image
        images[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
      }, 2000); // Change every 2 seconds
    }
    
    function showImage(index) {
      const images = document.querySelectorAll('.modal-image');
      const dots = document.querySelectorAll('.gallery-dot');
      
      // Hide all images and dots
      images.forEach(img => img.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Show selected image and dot
      images[index].classList.add('active');
      dots[index].classList.add('active');
    }
    
    function closeModal() {
      clearInterval(imageInterval);
      document.getElementById('productModal').classList.remove('show');
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
      document.getElementById("closeModal").addEventListener("click", closeModal);
      
      document.getElementById("productModal").addEventListener("click", (e) => {
        if (e.target === document.getElementById("productModal")) {
          closeModal();
        }
      });
    });
