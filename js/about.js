function animateCounters() {
    const counters = document.querySelectorAll('.counter-item');
  
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix');
      const duration = 2000; 
      const increment = target / (duration / 50);
  
      let current = 0;
  
      const updateCounter = setInterval(() => {
        current += increment;
  
        if (current >= target) {
          current = target;
          clearInterval(updateCounter);
  
          if (target >= 1000 && suffix === 'K') {
            counter.innerText = Math.round(target / 1000) + suffix;
          } else if (suffix === "+") {
            counter.innerText = target + suffix;
          } else if (suffix === "/10") {
            counter.innerText = target.toFixed(1) + suffix;
          } else {
            counter.innerText = Math.round(target) + suffix;
          }
        } else {
          if (target >= 1000 && suffix === 'K') {
            counter.innerText = Math.round(current / 1000) + suffix;
          } else if (suffix === "+") {
            counter.innerText = Math.round(current) + suffix;
          } else if (suffix === "/10") {
            counter.innerText = current.toFixed(1) + suffix;
          } else {
            counter.innerText = Math.round(current) + suffix;
          }
        }
      }, 50);
    });
  }
  
  window.addEventListener('load', animateCounters);
  