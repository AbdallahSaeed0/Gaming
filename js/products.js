let products;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let productCard = [];

// Fetch and display products
const getApi = async function() {
  let response = await fetch("./products.json");
  let data = await response.json();
  let recipes = data.recipes;
  productCard = recipes;
  display(recipes.slice(0, 4), 'limited');
  display(recipes, 'all');
  displayRelated(recipes);
};
getApi();

function display(container, type) {
  let cartona = "";
  let limit = type === 'limited' ? 4 : container.length;

  const pageType = window.location.pathname.includes('category') ? 'category' : 'index';

  const columnClasses = pageType === 'category' 
    ? 'col-xxl-4 col-lg-4 col-md-6 col-sm-12 mb-20' 
    : 'col-xxl-3 col-lg-4 col-md-6 col-sm-6 mb-20';

  for (let i = 0; i < limit; i++) {
    cartona += `
      <div class="product-column ${columnClasses}">
        <a href="product.html" class="product-link" data-index="${i}">
          <div class="product-card">
            <div class="img-container">
              <img src="${container[i].image_url}" class="card-img-top" alt="...">
              <div class="btns-product">
                <ul>
                  <li><a href="#" class="btn-product"><img src="img/compare-icons-svg.png" alt=""></a></li>
                  <li><a href="#" onclick="addToCart(${i}); return false;"><i class="fa-solid fa-cart-shopping btn-product"></i></a></li>
                  <li><a href="#"><i class="fa-solid fa-heart btn-product"></i></a></li>
                </ul>
              </div>
            </div>
            <div class="card-body p-20">
              <ul class="review-list">
                <li>
                  <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                  </div>
                </li>
              </ul>
              <h5 class="card-title pt-10 pb-7 product-title">${container[i].title}</h5>
              <div class="prices d-flex">
                <p class="pr-10"> ${container[i].price}</p>
              </div>
            </div>
          </div>
        </a>
      </div>`;
  }

  if (type === "limited") {
    const showDataLimited = document.getElementById("showDataLimited");
    if (showDataLimited) {
      showDataLimited.innerHTML = cartona;
    } else {
      console.error('Element with ID "showDataLimited" not found');
    }
  } else if (type === 'all') {
    const showDataAll = document.getElementById("showDataAll");
    if (showDataAll) {
      showDataAll.innerHTML = cartona;
    } else {
      console.error('Element with ID "showDataAll" not found');
    }
  }

  document.querySelectorAll('.product-link').forEach((link) => {
    link.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      localStorage.setItem('selectedProductIndex', index);
    });
  });
}

function addToCart(index) {
  let count = 1;
  let product = productCard[index];
  let foundedProduct = cart.find(item => item.recipe_id === product.recipe_id);
  let cartList = { ...product, count };

  if (foundedProduct) {
    foundedProduct.count++;
  } else {
    cart.push(cartList);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  
  updateCartCount();
}


function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartCount = cart.reduce((acc, item) => acc + item.count, 0);

  // Handle mobile view
  let cartCountMobile = document.getElementById('cart-count-mobile');
  if (cartCountMobile) {
    cartCountMobile.textContent = cartCount;
  } else {
    console.error('Element with ID "cart-count-mobile" not found');
  }

  // Handle desktop view
  let cartCountDesktop = document.getElementById('cart-count-desktop');
  if (cartCountDesktop) {
    cartCountDesktop.textContent = cartCount;
  } else {
    console.error('Element with ID "cart-count-desktop" not found');
  }
}

// Update the cart count on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});

// display the related products slider
function displayRelated(container) {
  let cartona = "";
  for (let i = 0; i < container.length; i++) {
    cartona += `
      <li class="splide__slide mb-20">
        <a href="product.html" class="product-link" data-index="${i}">
          <div class="product-card">
            <div class="img-container">
              <img src="${container[i].image_url}" class="card-img-top" alt="...">
              <div class="btns-product">
                <ul>
                  <li><a href="#" class="btn-product"><img src="img/compare-icons-svg.png" alt=""></a></li>
                  <li><a href="#" onclick="addToCart(${i}); return false;"><i class="fa-solid fa-cart-shopping btn-product"></i></a></li>
                  <li><a href="#"><i class="fa-solid fa-heart btn-product"></i></a></li>
                </ul>
              </div>
            </div>
            <div class="card-body p-20">
              <ul class="review-list">
                <li>
                  <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                  </div>
                </li>
              </ul>
              <h5 class="card-title pt-10 pb-7 product-title">${container[i].title}</h5>
              <div class="prices d-flex">
                <p class="pr-10"> ${container[i].price}</p>
              </div>
            </div>
          </div>
        </a>
      </li>`;
  }
  const relatedProductsElement = document.getElementById('relatedProducts');
  if (relatedProductsElement) {
    relatedProductsElement.innerHTML = cartona;
  } else {
    console.error('Element with ID "relatedProducts" not found');
  }

  var splide = new Splide('.splide', {
    perPage: 3,
    rewind: true,
    autoPlay: true,

  });

  splide.mount();



  document.querySelectorAll('.product-link').forEach((link) => {
    link.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      localStorage.setItem('selectedProductIndex', index);
    });
  });
}


function quickView(index) {}
// products-details.js

document.addEventListener('DOMContentLoaded', () => {
    const index = localStorage.getItem('selectedProductIndex');
    if (index !== null) {
      fetchProductData(index);
    } else {
      console.error('No product index found in localStorage');
    }
  });
  
  function fetchProductData(index) {
    fetch('./products.json')
      .then(response => response.json())
      .then(data => {
        const product = data.recipes[index];
        if (product) {
          populateProductDetails(product);
        } else {
          console.error('Product not found');
        }
      })
      .catch(error => console.error('Error fetching product details:', error));
  }
  function populateProductDetails(product) {
    // Update main photo
    const mainPhotoImage = document.querySelector('.main-photo-image');
    if (mainPhotoImage) {
      mainPhotoImage.src = product.image_url || 'img/default.jpg';
    } else {
      console.error('.main-photo-image element not found');
    }
  
    // Update slider images
    const sliderContainer = document.querySelector('.slider');
    if (sliderContainer) {
      sliderContainer.innerHTML = '';
      if (product.image_urls && product.image_urls.length) {
        product.image_urls.forEach((imageUrl, index) => {
          if (imageUrl) {
            const sliderItem = document.createElement('div');
            sliderItem.className = 'slider-item mb-20';
            if (index === product.image_urls.length - 1) {
              sliderItem.classList.remove('mb-20');
            }
            const img = document.createElement('img');
            img.src = imageUrl;
            img.className = 'slider-image';
            img.alt = `Product ${index + 1}`;
            sliderItem.appendChild(img);
            sliderContainer.appendChild(sliderItem);
          }
        });
        
        sliderContainer.querySelectorAll('.slider-image').forEach((img, index) => {
          img.addEventListener('click', function() {
            updateMainImage(index);
          });
        });
  
      } else {
        const sliderItem = document.createElement('div');
        sliderItem.className = 'slider-item mb-20';
        const img = document.createElement('img');
        img.src = product.image_url || 'img/default.jpg';
        img.className = 'slider-image';
        img.alt = 'Default Product Image';
        sliderItem.appendChild(img);
        sliderContainer.appendChild(sliderItem);
      }
    } else {
      console.error('.slider element not found');
    }
  
    // Update product title
    const productTitle = document.querySelector('.product-title');
    if (productTitle) {
      productTitle.textContent = product.title || 'No title';
    } else {
      console.error('.product-title element not found');
    }
  
    // Update product price
    const productPrice = document.querySelector('.prices p');
    if (productPrice) {
      productPrice.textContent = product.price ? `${product.price}` : 'No price';
    } else {
      console.error('.prices p element not found');
    }
  
    // Update product stock
    const stockQuantity = product.stock[0];
    const stockText = document.querySelector('.fs-5.mb-10');
    const progressBar = document.querySelector('.progress-bar');
  
    if (stockText && progressBar) {
      stockText.textContent = `Hurry! Only ${stockQuantity} left in stock`;
  
      // Update progress bar width
      const maxStock = 100;
      const percentage = (stockQuantity / maxStock) * 100;
      progressBar.style.width = `${percentage}%`;
    } else {
      console.error('.fs-5.mb-10 or .progress-bar element not found');
    }
  
    // Helper function to update options
    function updateOptions(attribute, containerSelector, updateSelectedId) {
      const container = document.querySelector(containerSelector);
      if (container) {
        container.innerHTML = '';
        const options = product[attribute];
        if (options && options.length) {
          options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'product-detail option-button'; 
            button.dataset.attribute = attribute;
            button.textContent = option;
            container.appendChild(button);
          });
  
          container.querySelectorAll('.option-button').forEach(button => {
            button.addEventListener('click', function() {
              document.getElementById(updateSelectedId).textContent = button.textContent;
  
              container.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('selected'));
  
              button.classList.add('selected');
            });
          });
        } else {
          const button = document.createElement('button');
          button.className = 'product-detail';
          button.textContent = `No ${attribute} available`;
          container.appendChild(button);
        }
      } else {
        console.error(`${containerSelector} element not found`);
      }
    }
  
    // Update product options
    updateOptions('materials', '.product-btns[data-attribute="material"] .btns', 'selected-material');
    updateOptions('sizes', '.product-btns[data-attribute="size"] .btns', 'selected-size');
    updateOptions('shapes', '.product-btns[data-attribute="shape"] .btns', 'selected-shape');
  
    document.getElementById('selected-material').textContent = 'None';
    document.getElementById('selected-size').textContent = 'None';
    document.getElementById('selected-shape').textContent = 'None';
  }
  
  // Function to update the main image based on the slider image click
  function updateMainImage(index) {
    const mainImg = document.querySelector('.main-photo-image');
    const imgs = document.querySelectorAll('.slider-image');
  
    if (mainImg && imgs.length > 0) {
      mainImg.src = imgs[index].src;
    } else {
      console.error('Main image or slider images not found');
    }
  }
  
  
  var reviewCarousel = new Splide('#review-carousel', {
    perPage: 3,
    rewind: true,
    autoPlay: true,
  });

  reviewCarousel.mount();

  // start of quantity button 
  document.addEventListener('DOMContentLoaded', function() {
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');
    const quantityInput = document.getElementById('quantity');
  
  
    function updateQuantity(newQuantity) {
      if (newQuantity < 1) {
        newQuantity = 1;
      }
      quantityInput.value = newQuantity;
    }
  
    incrementBtn.addEventListener('click', function() {
      let currentQuantity = parseInt(quantityInput.value, 10);
      updateQuantity(currentQuantity + 1);
    });
  
    decrementBtn.addEventListener('click', function() {
      let currentQuantity = parseInt(quantityInput.value, 10);
      updateQuantity(currentQuantity - 1);
    });
  });
  

  // end of quantity button
