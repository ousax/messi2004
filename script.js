 const rawProducts = [
      ["Chaussures Antigravité", "Kangoo.avif", "DH", "artisanat"],
      ["Miel ZCH", "miel.jpg", "DH", "food"],
      ["Dattes el mejhoul", "dattes.jpg", "DH", "food"],
      ["Jus Dattes el mejhoul", "jusdattes.jpg", "DH", "food"],
      ["Huile d'Argan", "zitargan.webp", "DH", "cosmetics"],
      ["Amandes Maroc", "amandes.jpg", "DH", "food"],
      ["Safran Premium", "safran_.jpg", "DH", "food"],
      ["Eau de Rose", "eau.jpg", "DH", "cosmetics"],
      ["Pistaches Grillées", "pistaches.jpg", "DH", "food"],
      ["Thé Marocain", "dekkka.jpg", "DH", "food"],
      ["Couscous Fin", "COUSCOUS.jpg", "DH", "food"],
      ["Tajine en Céramique", "tajines.png", "DH", "artisanat"],
      ["Savon Noir", "savon.jpg", "DH", "cosmetics"],
      ["Huile d'Olive", "zitzitoun.jpg", "DH", "food"],
      ["Tapis Berbère", "zarbia.jpg", "DH", "artisanat"]
    ];
    let products = rawProducts.map((product, index) => ({
      id: index + 1,
      name: product[0],
      image_url: product[1],
      currency: product[2],
      category: product[3],
      price: (Math.random() * 100 + 20).toFixed(2),
      rating: (Math.random() * 1 + 4).toFixed(1)
    }));
    let currentPage = 1;
    const productsPerPage = 4;
    let filteredProducts = [...products];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    // bda men hna
    document.addEventListener("DOMContentLoaded", () => {
      renderProducts();
      updateCart();
      updateWishlist();
      
      
      document.getElementById('cartButton').addEventListener('click', toggleCart);
      document.getElementById('wishlistButton').addEventListener('click', toggleWishlist);
      document.getElementById('checkoutBtn').addEventListener('click', checkout);
      
      // tabs categ
      document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          filterByCategory(tab.dataset.category);
        });
      });
    });

    // dial cart 
    function updateCart() {
      document.getElementById('cartCounter').textContent = cart.length;
      
      const cartItemsEl = document.getElementById('cartItems');
      cartItemsEl.innerHTML = cart.map(item => `
        <div class="sidebar-item">
          <img src="${item.image_url}" alt="${item.name}">
          <div>
            <h4>${item.name}</h4>
            <p>${item.price} ${item.currency}</p>
            <button onclick="removeFromCart(${item.id})" style="color:red;background:none;border:none;cursor:pointer;padding:0;">
              Supprimer
            </button>
          </div>
        </div>
      `).join('');
      
      const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
      document.getElementById('cartTotal').textContent = total.toFixed(2);
      
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(product) {
      cart.push({...product});
      updateCart();
      showToast(`${product.name} ajouté au panier!`);
    }

    function removeFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
      updateCart();
      showToast('Produit supprimé');
    }

    function toggleCart() {
      document.getElementById('cartSidebar').classList.toggle('open');
      document.getElementById('wishlistSidebar').classList.remove('open');
    }

    //wishlist functionnalites
    function updateWishlist() {
      document.getElementById('wishlistCounter').textContent = wishlist.length;
      
      const wishlistItemsEl = document.getElementById('wishlistItems');
      wishlistItemsEl.innerHTML = wishlist.map(item => `
        <div class="sidebar-item">
          <img src="${item.image_url}" alt="${item.name}">
          <div>
            <h4>${item.name}</h4>
            <p>${item.price} ${item.currency}</p>
            <div style="display:flex;gap:10px;">
              <button onclick="addToCartFromWishlist(${item.id})" style="padding:5px 10px;background:var(--button-bg);color:white;border:none;border-radius:4px;">
                Ajouter au panier
              </button>
              <button onclick="removeFromWishlist(${item.id})" style="padding:5px 10px;background:var(--wishlist-color);color:white;border:none;border-radius:4px;">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      `).join('');
      
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    function toggleWishlist() {
      document.getElementById('wishlistSidebar').classList.toggle('open');
      document.getElementById('cartSidebar').classList.remove('open');
    }

    function toggleWishlistItem(product) {
      const index = wishlist.findIndex(item => item.id === product.id);
      if (index === -1) {
        wishlist.push({...product});
        showToast(`${product.name} ajouté à la wishlist!`);
      } else {
        wishlist.splice(index, 1);
        showToast(`${product.name} retiré de la wishlist`);
      }
      updateWishlist();
      renderProducts(); // Update heart icons
    }

    function addToCartFromWishlist(productId) {
      const product = wishlist.find(item => item.id === productId);
      addToCart(product);
    }

    function removeFromWishlist(productId) {
      wishlist = wishlist.filter(item => item.id !== productId);
      updateWishlist();
      renderProducts(); // icon heart update hna 
    }

    // filter dial category 
    function filterByCategory(category) {
      if (category === 'all') {
        filteredProducts = [...products];
      } else {
        filteredProducts = products.filter(product => product.category === category);
      }
      currentPage = 1;
      renderProducts();
    }

    //check outttttt
    function checkout() {
      if (cart.length === 0) {
        showToast('Votre panier est vide!');
        return;
      }
      
      if (confirm(`Confirmer la commande de ${cart.length} articles pour ${document.getElementById('cartTotal').textContent} DH?`)) {
        cart = [];
        updateCart();
        showToast('Commande passée avec succès!');
        document.getElementById('cartSidebar').classList.remove('open');
      }
    }
