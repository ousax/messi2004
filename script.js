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
        ["Tapis Berbère", "images/zarbia.jpg", "DH", "Tapis tissé à la main par des artisans berbères. Motifs traditionnels et laine naturelle."],
        ["Parfum Royal Marocain", "images/bexor.jpg", "DH", "Un parfum exclusif inspiré des essences rares du Maroc. Notes de safran, bois de santal et fleur d'oranger."],
        ["Collier fait main", "images/necklace.jpg", "DH", "Ce collier fait main présente un design traditionnel et est fabriqué avec soin à partir de matériaux naturels. C’est une pièce magnifique et unique, réalisée avec amour."]
        ];
    let products = rawProducts.map(product => {
      return {
        name: product[0],
        image_url: product[1],
        currency: product[2],
        description: product[3],
        price: getRandomPrice(20, 100), 
        rating: getRandomRating(),
        voters: getVotersRandom() // ankhdmo b17 dial voters si getRandomRating  < 10 
      };
      
    }); // les produits ayakhdo des prix, notes aleatoires definis par les fonctions getRandonPrice w getRandomRating 
    let currentPage = 1; // la page actuelle
    const productsPerPage = 8; // les produits ela hssab kola page
    let filteredProducts = [...products]; // ndiro les produits flist bach yshal elina nbdaw n9lbo elihom
    let cart = [];
    console.log(cart.length===0 ? "Le panier est vide" : "Le panier n'est pas vide");
    //let defaultVoters = 15 // ila genera lina voters < 3 donc nakhdo 15 comme base
    let imageInterval; 
    function getRandomPrice(min, max) {
      return (Math.random() * (max - min) + min).toFixed(2); // les chiffres apres virgules homa 2 , prix (40,44 dh)
    }
    function getVotersRandom(){
      const max = 100;
      const min = 50;
      let voters = (Math.random() * (max - min)).toFixed(0);
      if(voters < 10){
         const voters = 17;
      }
      return voters;
    }
    function getRandomRating() {
      return (Math.random() * 1 + 4).toFixed(1); // par contre le 1er cas on va prendre un seul chiffre apres la , 7it note (3,4 ) 
    }
    
    function showToast(message) {// concernant message li ghadi ytl3 visituer, produit x ajouté au panier, message == argument
      
      const toast = document.getElementById('toastNotification'); 
      toast.textContent = message;
      toast.style.display = 'block';
      // modify had partie bach ytl3 form a renseigner pour les gens qui veulent vraiment acheter ce produit

      
      setTimeout(() => {
        toast.style.display = 'none'; 
      }, 3000);// 3 seconds
    }
    
    function renderProducts() {
      const productList = document.getElementById("product-list");
      productList.innerHTML = '';
      
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const productsToShow = filteredProducts.slice(startIndex, endIndex);
      
      if (productsToShow.length === 0) { // les produits entrés par les visiteur ne sont pas disponibles
        productList.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Aucun produit trouvé</p>';
        return;
      }
      
      productsToShow.forEach(product => { // les produits a afficher , kola variable atakhode sa valeur
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.image_url}" class="product-image"  alt="${product.name}">
          <div class="product-name">${product.name}</div>
          <div class="product-price">${product.price} ${product.currency}</div>
          <div class="product-rating">⭐ ${product.rating}</div>
          <div class="product-rating">${product.voters} voters</div>
        `;
        card.addEventListener('click', () => {
          openProductModal(product); // une fois le visiteur yclicki ela chi produit l'execution dial openProductModal function ghadi t'executa  
        });
        
        productList.appendChild(card);
      });
      
      updatePagination(); // le numero de la page actuelle se changera
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
          // Create 3 image variations ("/images/miel_1.jpg", "/images/miel_2.jpg")
  for (let i = 0; i < 3; i++) {
    const img = document.createElement('img');
    // Generate variation path (e.g., "/images/miel" + "_1.jpg")
    const basePath = product.image_url.substring(0, product.image_url.lastIndexOf('.')); // retenir le radical 
    const extension = product.image_url.substring(product.image_url.lastIndexOf('.'));  // retenir l'extension 'jpg'
    img.src = `${basePath}_${i+1}${extension}`; // combinahom bach ykhdem fiha fsrc ftag img
    
    img.onerror = function() { // ila makanoch les images b 3 dial un tel produit donc par default aykhdem bla meme image
      this.src = product.image_url;
    };
    
    img.alt = `${product.name} - Vue ${i+1}`; 
    img.className = 'modal-image';
    imageContainer.appendChild(img);
    
    // creation des points verts de navigation
    const dot = document.createElement('div');
    dot.className = 'gallery-dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener("click", () => {
      showImage(i);
      clearInterval(imageInterval);
      startImageRotation();
    });
    galleryNav.appendChild(dot);
  }
      
      // Show first image immediately
      const images = document.querySelectorAll('.modal-image');
      images[0].classList.add('active');
      
      // Start auto-rotation after 4 seconds
      startImageRotation();
      
      // Set up buttons
      document.getElementById('modalOrderBtn').onclick = () => {
        showToast(`Commande passée pour ${product.name}  ${product.price}DH!`);
        closeModal();
      };
      document.getElementById("modalOrderBtn").onclick = () => {
        closeModal();
        //document.getElementById("product-list").hidden = true;
        //document.getElementById("orderForm").hidden = false; // hna form pour passer la commande va apparaitre 
        //document.getElementById("produit_choisi").innerHTML = `Produit choisi: ${product.name}`;
        //window.open(`buy1.html?n=${product.name}&p=${product.price}`);
        window.location.href = `buy1.html?n=${product.name}&p=${product.price}`
      }
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
      }, 4000); // bdal images dproduit mora 4 s 
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

    function addToCart(product) { // modify it to add elements to the cart and to change the the number of items added
      //cart.push(product);
      showToast(`${product.name} ajouté au panier!`);
      cart.push([product.name, product.price, product.image_url]);
      console.log(`Le panier contient ${cart.length} élément(s)`);
      let panierItems = document.getElementById("numberItemsCart");
      panierItems.innerHTML=`<strong style='font-size: 10px; color:green' class='numberItemsCart'>${cart.length}</strong>`;
    }
    function DisplaySum(){
      var NamesPrices = cart.map(elements => [elements[0], parseFloat(elements[1]), , ,]);
      var SumElements = cart.map(element => parseFloat(element[1]));//`Price: ${element[1]}`)); // les elements dans le panier
      NamesPrices.forEach(element => {
        names = element[0];
        prices = element[1]
        image = element[2]
        console.log(`Nom du produit: ${names} \nPrix du produit: ${prices}`);
        
      });
      let sum = 0;
      for (let ele = 0; ele < SumElements.length; ele++) {
        sum += SumElements[ele];
        //console.log(sum);
      }
      sum = sum.toFixed(2);
      if(cart.length===0){
        alert("Votre panier est vide");
      }
      else{
        alert(`La somme d'éléments choisis: ${sum} DHS`);
      }
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
      const sortValue = document.getElementById('sortSelect').value; // "trier par"
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
      
      renderProducts(); // afficher les produits  
    }

    function applyTheme(mode) {
      document.body.classList.remove("light-mode", "dark-mode");
      document.body.classList.add(mode);
      document.getElementById("modeToggleBtn").textContent = mode === "dark-mode" ? "🌞" : "🌙"; 
      localStorage.setItem("darkMode", mode === "dark-mode");
    }

    function toggleDarkMode() {
      const isDark = document.body.classList.contains("dark-mode"); // choisir entre les themes
      applyTheme(isDark ? "light-mode" : "dark-mode");
    }

    document.addEventListener("DOMContentLoaded", () => {
      const prefersDark = localStorage.getItem("darkMode") === "true"; // verifier le theme deja choisi 
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
      //
     
  function Weather() {
    const apiKey = atob("Mzk3NjI5YTBmMjJiNDBjZTg3ZjcxODE1MjMyMDEw");
    const fallbackLocations = [ // si le visiteur n'autorise pas l'acces a son localisation , utiliser des localisations aleatoires 
      { name: "London", lat: 51.5074, lon: -0.1278 },
      { name: "New York", lat: 40.7128, lon: -74.006 },
      { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
      { name: "Paris", lat: 48.8566, lon: 2.3522 },
      { name: "Sydney", lat: -33.8688, lon: 151.2093 }
    ];
    const conditionMap = {
      "Sunny": { fr: "Ensoleillé", icon: "☀️" },
      "Partly cloudy": { fr: "Partiellement nuageux", icon: "⛅" },
      "Cloudy": { fr: "Nuageux", icon: "☁️" },
      "Overcast": { fr: "Couvert", icon: "☁️" },
      "Mist": { fr: "Brume", icon: "🌫️" },
      "Rain": { fr: "Pluie", icon: "🌧️" },
      "Light rain": { fr: "Pluie légère", icon: "🌦️" },
      "Heavy rain": { fr: "Forte pluie", icon: "🌧️" },
      "Snow": { fr: "Neige", icon: "❄️" },
      "Thunderstorm": { fr: "Orage", icon: "⛈️" }
    };
    const fetchWeather = async (lat, lon) => {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`);
        const data = await response.json();
        const temp = Math.round(data.current.temp_c);
        const rawCondition = data.current.condition.text;
        const translated = conditionMap[rawCondition] || { fr: rawCondition, icon: "" };

        const header = document.querySelector("header");
        if (header) {
          const weatherEl = document.createElement("div");
          weatherEl.textContent = `Météo: ${temp}°C, ${translated.icon} ${translated.fr}`;
          weatherEl.style.marginLeft = "auto";
          weatherEl.style.padding = "0 10px";
          weatherEl.style.fontWeight = "bold";
          header.appendChild(weatherEl);
        }
      } catch (error) {
        console.error("Weather fetch failed:", error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => {
          const random = fallbackLocations[Math.floor(Math.random() * fallbackLocations.length)];
          fetchWeather(random.lat, random.lon);
        }
      );
    } else {
      const random = fallbackLocations[Math.floor(Math.random() * fallbackLocations.length)];
      fetchWeather(random.lat, random.lon);
    }
  }
      Weather();
    });
