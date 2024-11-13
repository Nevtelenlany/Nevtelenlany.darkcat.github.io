const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

// Hátérkép
const hatterkep = new Image();
hatterkep.src = 'imagin/hatter1.jpg'; // háttérkép elérési útja

// Képek inicializálása
const images = [
    { src: 'imagin/feketecica1.jpg', x: -100, y: 420, width: 290, height: 200 },
    { src: 'imagin/feketecica3.jpg', x: 660, y: 260, width: 650, height: 525 },
    { src: 'imagin/feketecica4.jpg', x: 100, y: 470, width: 250, height: 125 },
    { src: 'imagin/feketecica2.jpg', x: 80, y: 110, width: 900, height: 850 },
    { src: 'imagin/feketecica5.png', x: 600, y: 370, width: 350, height: 300 },
    { src: 'imagin/csillagok1.png', x: 20, y: 10, width: 200, height: 200 },
    { src: 'imagin/csillagok1.png', x: 240, y: 10, width: 200, height: 200 },
    { src: 'imagin/csillagok1.png', x: 460, y: 10, width: 200, height: 200 },
    { src: 'imagin/csillagok1.png', x: 680, y: 10, width: 200, height: 200 },
    { src: 'imagin/csillagok1.png', x: 900, y: 10, width: 200, height: 200 }
];

let loadedImages = 0;

// Képek betöltése és rajzolás előkészítése
images.forEach(imgData => {
    const img = new Image();
    img.src = imgData.src;
    img.onload = () => {
        imgData.image = img;
        loadedImages++;
        if (loadedImages === images.length) {
            drawElements();
        }
    };
});

// Gomb és képek rajzolása
function drawElements() {
    // Hátérkép rajzolása
    c.drawImage(hatterkep, 0, 0, canvas.width, canvas.height);
    
    // További képek rajzolása
    images.forEach(imgData => {
        c.drawImage(imgData.image, imgData.x, imgData.y, imgData.width, imgData.height);
    });
    
    // Gomb rajzolása
    drawButton();
}

// Kerekített gomb rajzolása
function drawRoundedButton(x, y, width, height, radius, text) {
    c.fillStyle = 'black';
    c.beginPath();
    c.moveTo(x + radius, y);
    c.lineTo(x + width - radius, y);
    c.quadraticCurveTo(x + width, y, x + width, y + radius);
    c.lineTo(x + width, y + height - radius);
    c.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    c.lineTo(x + radius, y + height);
    c.quadraticCurveTo(x, y + height, x, y + height - radius);
    c.lineTo(x, y + radius);
    c.quadraticCurveTo(x, y, x + radius, y);
    c.closePath();
    c.fill();

    // Szöveg rajzolása a gombra
    c.fillStyle = 'white';
    c.font = '30px Arial';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(text, x + width / 2, y + height / 2);
}

// Gomb megrajzolása
function drawButton() {
    const buttonX = 420;
    const buttonY = 330;
    const buttonWidth = 200;
    const buttonHeight = 50;
    const borderRadius = 20;

    drawRoundedButton(buttonX, buttonY, buttonWidth, buttonHeight, borderRadius, 'Játék');
}

// Kattintás kezelése
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const buttonX = 420;
    const buttonY = 330;
    const buttonWidth = 200;
    const buttonHeight = 50;

    if (x > buttonX && x < buttonX + buttonWidth && y > buttonY && y < buttonY + buttonHeight) {
        window.location.href = 'jatek/jatek.html';
    }
});

// Egérmutató kezelése
canvas.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const buttonX = 420;
    const buttonY = 330;
    const buttonWidth = 200;
    const buttonHeight = 50;

    canvas.style.cursor = x > buttonX && x < buttonX + buttonWidth && y > buttonY && y < buttonY + buttonHeight
        ? 'pointer'
        : 'default';
});
