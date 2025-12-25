
// Navbar solid on scroll
const nav = document.querySelector('.navbar');
const setNav = () => nav.classList.toggle('scrolled', window.scrollY > 40);
setNav(); window.addEventListener('scroll', setNav);

// Lazy loading for images
const lazyImages = document.querySelectorAll('img.lazy');
const lazyObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const img = e.target;
      img.src = img.dataset.src;
      img.onload = ()=> img.classList.add('loaded');
      lazyObs.unobserve(img);
    }
  });
},{rootMargin:'200px'});
lazyImages.forEach(img=>lazyObs.observe(img));

// Simple 3D tilt for service cards
document.querySelectorAll('.service-3d .fh-card').forEach((card)=>{
  card.addEventListener('mousemove', (e)=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    const rx = ((y/rect.height)-0.5)*-6;
    const ry = ((x/rect.width)-0.5)*6;
    card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', ()=>{
    card.style.transform = '';
  });
});

// Booking -> WhatsApp
const form = document.getElementById('booking-form');
const success = document.getElementById('booking-success');
const btn = document.getElementById('book-btn');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  if(!form.checkValidity()){ form.reportValidity(); return; }
  const name = document.getElementById('name-field').value.trim();
  const email = document.getElementById('email-field').value.trim();
  const type = document.getElementById('serviceType-field').value;
  const date = document.getElementById('date-field').value;
  const note = document.getElementById('specialRequest-field').value.trim();
  const msg = `Hello Fast Hunter!%0AName: ${name}%0AEmail: ${email}%0AService: ${type}%0ADate: ${date}%0ANotes: ${note}`;
  window.open(`https://wa.me/971568363321?text=${msg}`, '_blank');
  success?.classList.remove('d-none');
});

// Current year
document.getElementById('year').textContent = new Date().getFullYear();

// Video fallback handling
const heroVideo = document.getElementById('hero-video');
heroVideo?.addEventListener('error', ()=>{
  document.querySelector('.hero .fallback')?.classList.remove('d-none');
});
