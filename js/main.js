document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript loaded');
  
    // Function to update the main image
    function updateMainImage(index) {
      const mainImg = document.querySelector('.main-photo-image');
      const imgs = document.querySelectorAll('.slider-image');
  
      if (mainImg && imgs.length > 0) {
        mainImg.src = imgs[index].src;
        console.log('Main image updated to:', imgs[index].src);
      } else {
        console.error('Main image or slider images not found');
      }
    }
    const sliderImages = document.querySelectorAll('.slider-image');
    sliderImages.forEach((img, index) => {
      img.addEventListener('click', function() {
        console.log('Image clicked:', index);
        updateMainImage(index);
      });
    });
  
    updateMainImage(0);
  });
  

  // start of choosing detail
  document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.product-detail');
  
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const attribute = button.getAttribute('data-attribute');
        const value = button.textContent.trim();

        document.querySelectorAll(`.product-detail[data-attribute="${attribute}"]`).forEach(btn => {
          btn.classList.remove('selected');
        });

        button.classList.add('selected');
  
        document.getElementById(`selected-${attribute}`).textContent = value;
      });
    });
  });
  
  // end of choosing detail




  // custom offcanvas start 
  document.addEventListener('show.bs.offcanvas', function (event) {
    var offcanvasElement = event.target;
    
    if (offcanvasElement.id === 'navbarOffcanvas') {
      offcanvasElement.classList.add('stacked');
    }
  
    var backdrop = document.createElement('div');
    backdrop.className = 'offcanvas-backdrop stacked-backdrop show';
    document.body.appendChild(backdrop);
  });
  
  document.addEventListener('hide.bs.offcanvas', function (event) {
    var offcanvasElement = event.target;
  
    if (offcanvasElement.id === 'navbarOffcanvas') {
      offcanvasElement.classList.remove('stacked');
    }
  
    var stackedBackdrop = document.querySelector('.offcanvas-backdrop.stacked-backdrop');
    if (stackedBackdrop) {
      document.body.removeChild(stackedBackdrop);
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    var categoryCloseBtn = document.getElementById('category-close-btn');
    var navbarOffcanvas = document.getElementById('navbarOffcanvas');
  
    categoryCloseBtn.addEventListener('click', function () {
      if (navbarOffcanvas.classList.contains('show')) {
        var bsOffcanvas = bootstrap.Offcanvas.getInstance(navbarOffcanvas);
        bsOffcanvas.hide();
      } else {
        var bsOffcanvas = bootstrap.Offcanvas.getInstance(category);
        bsOffcanvas.hide();
      }
    });
  });
  

  // custom offcanvas end


  document.addEventListener('DOMContentLoaded', function () {
    var main = new Splide('#main-carousel', {
      type: 'slide',
      rewind: false,
      pagination: false,
      arrows: false,
      snap: true, 
      flickPower: 400,
      drag: "free", 
      perPage: 1,
      breakpoints: {
        600: {
          
        },
      },
    });
  
    var thumbnails = new Splide('#thumbnail-carousel', {
      fixedWidth: 100,
      fixedHeight: 60,
      gap: 10,
      rewind: false,
      pagination: false,
      isNavigation: true,
      cover: true,
      drag: false, 
      focus: 'center',
      breakpoints: {
        600: {
          fixedWidth: 60,
          fixedHeight: 44,
        },
      },
    });
  
    main.sync(thumbnails);

    main.mount();
    thumbnails.mount();
    main.on('mounted', function () {
      console.log('Main carousel mounted');
      thumbnails.mount();
    });
    
    thumbnails.on('mounted', function () {
      console.log('Thumbnails carousel mounted');
    });
  });


// start user icon logic
document.addEventListener('DOMContentLoaded', function() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userIconContainer = document.getElementById('user-icon-container');
  const loginLink = document.querySelector('#user-icon-container a[href="login.html"]');
  const signOutIcon = document.querySelector('#user-icon-container #signOutIcon');

  if (isLoggedIn === 'true') {
    if (userIconContainer && signOutIcon) {
      signOutIcon.style.display = 'inline';
      if (loginLink) {
        loginLink.style.display = 'none';
      }
    }

    const userIcon = document.querySelector('#user-icon-container a i.fa-user');
    if (userIcon) {
      userIcon.classList.remove('fa-regular');
      userIcon.classList.add('fa-solid');
    }
    if (signOutIcon) {
      signOutIcon.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loggedInUser');
        window.location.reload();
      });
    }
  }
});



document.addEventListener('DOMContentLoaded', function() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userIconContainer = document.getElementById('user-icon-container-mobile');
  const loginLink = document.querySelector('#user-icon-container-mobile a[href="login.html"]');
  const signOutIcon = document.querySelector('#user-icon-container-mobile #signOutIcon');

  if (isLoggedIn === 'true') {
    if (userIconContainer && signOutIcon) {
      signOutIcon.style.display = 'inline';
      if (loginLink) {
        loginLink.style.display = 'none';
      }
    }

    const userIcon = document.querySelector('#user-icon-container-mobile a i.fa-user');
    if (userIcon) {
      userIcon.classList.remove('fa-regular');
      userIcon.classList.add('fa-solid');
    }
    if (signOutIcon) {
      signOutIcon.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loggedInUser');

        window.location.reload();
      });
    }
  }
});


  // end of user icon logic


// start btn up code
 document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('fixBtn');
  window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
          btn.style.display = 'block';
      } else {
          btn.style.display = 'none';
      }
  });
  btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
// end of btn up code