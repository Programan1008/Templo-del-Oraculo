/**
 * ==========================================================================
 * MOTOR DE PARTÍCULAS ESPACIALES (HTML5 Canvas Render)
 * ==========================================================================
 */
const canvas = document.getElementById('space-particles');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 65;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class SpaceParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.4;
        this.speedX = Math.random() * 0.15 - 0.075;
        this.speedY = Math.random() * 0.15 - 0.075;
        
        // Mapear colores exactos de la paleta del Templo
        const colors = ['#dfb257', '#00e5ff', '#8a2be2', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new SpaceParticle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


/**
 * ==========================================================================
 * ENRUTAMIENTO FLUIDO FRONTEND (Single Page Application Simulator)
 * ==========================================================================
 */
const navLinks = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content-section');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

// Control de navegación entre vistas fijas
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        navigateTo(targetId);
        
        // Cerrar menú móvil si se hace clic
        navLinksContainer.classList.remove('mobile-active');
    });
});

function navigateTo(targetId) {
    sections.forEach(section => section.classList.remove('active'));
    
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === targetId) {
            link.classList.add('active');
        }
    });
}

// Soporte de menú colapsable para dispositivos móviles
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('mobile-active');
    });
}


/**
 * ==========================================================================
 * COMPORTAMIENTO INTERACTIVO DEL SIMULADOR DE RESERVAS
 * ==========================================================================
 */
function openBooking(expertName) {
    const select = document.getElementById('booking-expert');
    if (select) {
        select.value = expertName;
    }
    navigateTo('reservas');
}

function selectDay(element) {
    const days = document.querySelectorAll('.calendar-day');
    days.forEach(d => d.classList.remove('active-day'));
    element.classList.add('active-day');
}

function selectTime(element) {
    const slots = document.querySelectorAll('.time-slot');
    slots.forEach(s => s.classList.remove('active-time'));
    element.classList.add('active-time');
}

function triggerSimulation() {
    const expert = document.getElementById('booking-expert').value;
    const activeDayElement = document.querySelector('.active-day');
    const activeTimeElement = document.querySelector('.active-time');
    
    if (!activeDayElement || !activeTimeElement) {
        alert("Por favor, selecciona un vector temporal y un bloque válido.");
        return;
    }

    const activeDay = activeDayElement.innerText;
    const activeTime = activeTimeElement.innerText;
    
    const modal = document.getElementById('simulation-modal');
    const modalText = document.getElementById('modal-text');
    
    modalText.innerHTML = `Sintonía dimensional establecida con éxito.<br><br>
    <strong>Oráculo:</strong> ${expert}<br>
    <strong>Vector Temporal:</strong> Día ${activeDay} en bloque ${activeTime}<br><br>
    <em>El canal cuántico en el frontend se encuentra listo para la presentación.</em>`;
    
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('simulation-modal').style.display = 'none';
}