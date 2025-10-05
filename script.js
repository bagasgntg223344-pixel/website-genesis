/* Basic interactive behaviors: slider, modals, lightbox, nav toggle, form stub */

document.addEventListener('DOMContentLoaded', () => {
  /* NAV TOGGLE */
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });

  /* HERO SLIDER */
  const slides = Array.from(document.querySelectorAll('.slide'));
  let current = 0;
  const nextBtn = document.getElementById('nextSlide');
  const prevBtn = document.getElementById('prevSlide');

  function showSlide(idx){
    slides.forEach((s,i) => s.classList.toggle('active', i===idx));
    current = idx;
  }
  nextBtn?.addEventListener('click', () => showSlide((current+1)%slides.length));
  prevBtn?.addEventListener('click', () => showSlide((current-1+slides.length)%slides.length));

  let autoSlide = setInterval(() => showSlide((current+1)%slides.length), 6000);
  // pause on hover
  const hero = document.querySelector('.hero-section');
  hero?.addEventListener('mouseenter', () => clearInterval(autoSlide));
  hero?.addEventListener('mouseleave', () => autoSlide = setInterval(() => showSlide((current+1)%slides.length), 6000));

  /* DIVISION MATERIALS MODAL */
  const materialsModal = document.getElementById('modal-materials');
  const modalBody = document.getElementById('modal-body');
  const modalTitle = document.getElementById('modal-title');
  const closeModal = materialsModal?.querySelector('.modal-close');

  const materialsData = {
    writing: {
      title: 'Article & News Writing — Materials',
      items: [
        {title:'News Writing Basics', desc:'Inverted pyramid, 5Ws + H, lead writing.'},
        {title:'Feature & Opinion', desc:'Structure, voice, and editing tips.'},
        {title:'Fact-checking', desc:'Sources, verification, and citations.'}
      ]
    },
    photography: {
      title: 'Photography — Materials',
      items:[
        {title:'Photojournalism 101', desc:'Composition, exposure, and ethics.'},
        {title:'Editing Basics', desc:'Cropping, color, and story framing.'}
      ]
    },
    design: {
      title: 'Design & Layout — Materials',
      items:[
        {title:'Layout Principles', desc:'Grid systems, typography, and spacing.'},
        {title:'Cover Design', desc:'Hierarchy and visual impact.'}
      ]
    },
    sosmed: {
      title: 'Social Media & Publication — Materials',
      items:[
        {title:'Content Strategy', desc:'Post cadence, platform tailoring.'},
        {title:'Community Management', desc:'Responding ethically to audiences.'}
      ]
    },
    editorial: {
      title: 'Editorial & Redaction — Materials',
      items:[
        {title:'Editing Checklist', desc:'Grammar, clarity, and legal concerns.'},
        {title:'Publishing Workflow', desc:'Approval steps and version control.'}
      ]
    }
  };

  document.querySelectorAll('[data-modal="modal-materials"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const divKey = btn.getAttribute('data-division');
      const data = materialsData[divKey] || {title:'Materials', items:[]};
      modalTitle.textContent = data.title;
      modalBody.innerHTML = data.items.map(it => `<article class="material"><h5>${it.title}</h5><p>${it.desc}</p></article>`).join('');
      materialsModal.setAttribute('aria-hidden','false');
      materialsModal.style.display = 'flex';
      // focus management
      materialsModal.querySelector('.modal-close')?.focus();
    });
  });

  closeModal?.addEventListener('click', () => {
    materialsModal.setAttribute('aria-hidden','true');
    materialsModal.style.display = 'none';
  });
  materialsModal?.addEventListener('click', (ev) => {
    if(ev.target === materialsModal) {
      materialsModal.setAttribute('aria-hidden','true');
      materialsModal.style.display = 'none';
    }
  });

  /* LIGHTBOX */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  document.querySelectorAll('#gallery img').forEach(img => {
    img.addEventListener('click', () => {
      const src = img.getAttribute('data-full') || img.src;
      lightboxImg.src = src;
      lightboxImg.alt = img.alt || '';
      lightboxCaption.textContent = img.parentElement.querySelector('figcaption')?.textContent || '';
      lightbox.setAttribute('aria-hidden','false');
      lightbox.style.display = 'flex';
    });
  });

  lightboxClose?.addEventListener('click', () => {
    lightbox.setAttribute('aria-hidden','true');
    lightbox.style.display = 'none';
  });
  lightbox?.addEventListener('click', (e) => {
    if(e.target === lightbox) {
      lightbox.setAttribute('aria-hidden','true');
      lightbox.style.display = 'none';
    }
  });

  /* JOIN FORM (example stub) */
  const joinForm = document.getElementById('joinForm');
  const formNote = document.getElementById('formNote');
  joinForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Basic client-side validation already done by HTML attributes.
    const formData = new FormData(joinForm);
    // TODO: wire this to real backend or Google Sheets / email endpoint.
    formNote.textContent = 'Thanks! Your request has been recorded (demo).';
    joinForm.reset();
    setTimeout(()=>formNote.textContent = '', 5000);
  });

  /* Accessibility: close on ESC */
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      if(materialsModal && materialsModal.getAttribute('aria-hidden') === 'false') {
        materialsModal.setAttribute('aria-hidden','true');
        materialsModal.style.display='none';
      }
      if(lightbox && lightbox.getAttribute('aria-hidden') === 'false') {
        lightbox.setAttribute('aria-hidden','true');
        lightbox.style.display='none';
      }
    }
  });

});
