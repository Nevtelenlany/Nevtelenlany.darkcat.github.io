// jatek.js
let palyaszint = 1
let aktualisPalyaszint = palyaszint;
let gameFinished = false;
const gravitáció = 1;
const ugrasiero = 80;
const sebesség = 2;
let jatekInterval = null

import { Hatter } from './hatter.js';
import { Sprite } from './Sprite.js';
import { Enemi } from './Enemi.js';
//import { Jatek } from './Jatekclass.js';

export function goToHomePage() {
    window.location.href = '../index.html';
}
window.goToHomePage = goToHomePage;

class Jatek {
    constructor(hatter, karakter, x, y, aktualisPalyaszint, enemiTomb = [], palya) {
        this.kezdopontx = x;
        this.kezdoponty = y;
        this.hatter = hatter;
        this.karakter = karakter;
        this.aktualisPalyaszint = aktualisPalyaszint;
        this.x = x;
        this.y = y;
        this.levegoben = true;
        this.fel = false;
        this.balra = false;
        this.jobbra = false;
        this.enemiTomb = enemiTomb;
        this.palya = palya;
    }

    start() {
        if (jatekInterval) clearInterval(jatekInterval);
        jatekInterval = setInterval(() => this.mozgas(), 20);

        window.addEventListener('keydown', event => this.billentyuLenyomas(event));
        window.addEventListener('keyup', event => this.billentyuFelenged(event));
    }

    mozgas() {
        if (this.y >= 551) {
            this.x = this.kezdopontx;
            this.y = this.kezdoponty;
        }
        this.hatter.drawImages();

        if (this.levegoben) {
            this.y += gravitáció;
        }

        if (this.hatter.Talajutkozesle(this.x, this.y)) {
            this.levegoben = false;
            this.y -= gravitáció;
        } else {
            this.levegoben = true;
        }

        if (this.fel || this.balra || this.jobbra) {
            this.karakter.move();
            if (this.y >= 0 && this.fel && !this.levegoben) {
                this.y -= ugrasiero;
            }
            if (this.x >= 0 && this.balra && !this.hatter.Talajutkozesbalra(this.x, this.y)) {
                this.karakter.flipHorizontally = false;
                this.x -= sebesség;
            }
            if (this.x <= 930 && this.jobbra && !this.hatter.Talajutkozesjobbra(this.x, this.y)) {
                this.karakter.flipHorizontally = true;
                this.x += sebesség;
            }
        } else {
            this.karakter.sit();
        }

        if (this.hatter.CsillagUtkozes(this.x, this.y)) {
            palyaszint = this.palya;
            palyavaltasa(palyaszint);
        }

        this.enemiTomb.forEach(enemi => {
            enemi.move();
            if (enemi.checkCollision(this.x, this.y, 86, 40)) {
                this.x = this.kezdopontx;
                this.y = this.kezdoponty;
            }
        });

        this.karakter.draw(this.x, this.y, 0.5);
    }

    billentyuLenyomas(event) {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                this.fel = true;
                break;
            case 'ArrowLeft':
            case 'a':
                this.balra = true;
                break;
            case 'ArrowRight':
            case 'd':
                this.jobbra = true;
                break;
        }
    }

    billentyuFelenged(event) {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                this.fel = false;
                break;
            case 'ArrowLeft':
            case 'a':
                this.balra = false;
                break;
            case 'ArrowRight':
            case 'd':
                this.jobbra = false;
                break;
        }
    }
}

// Pálya inicializálása és játék indítása
function palyavaltasa(palyaszint) {
    if (gameFinished) return; // Ne fusson, ha már vége a játéknak
    let talajPozíciók, csillagPozíciók, x, y, pálya, hatterKepPath, enemiTomb = [];
    switch(palyaszint) {
        case 1:
            document.getElementById("szintSzam").textContent = "Szint: " + palyaszint;
            talajPozíciók = [
                { x: 0, y: 551 },
                { x: 150, y: 491 },
                { x: 300, y: 431 },
                { x: 450, y: 371 },
                { x: 600, y: 311 },
                { x: 750, y: 251 },
                { x: 900, y: 191 }
            ];
            csillagPozíciók = [{ x: 950, y: 150 }];
            pálya = 2
            x = 10
            y = 500
            hatterKepPath = '../imagin/hatterkep1.jpg';  // Első pálya háttérképe
            break
        
        case 2:
            document.getElementById("szintSzam").textContent = "Szint: " + palyaszint;
            talajPozíciók = [
                { x: 0, y : 551},
                { x: 0, y: 481 },
                { x: 0, y: 411 },
                { x: 0, y: 341 },
                { x: 0, y: 271 },
                { x: 0, y: 201 },
                { x: 0, y: 131 },
                { x: 150, y: 131 },
                { x: 300, y: 131 },  
                { x: 450, y: 131 },
                { x: 600, y: 131 },
                { x: 750, y: 131 },
                { x: 900, y: 131 }
            ];
            csillagPozíciók = [{ x: 950, y: 100 }];
            pálya = 3
            x = 10
            y = 500
            hatterKepPath = '../imagin/hatterkep3.jpg';
            break
        case 3:
            document.getElementById("szintSzam").textContent = "Szint: " + palyaszint;
            talajPozíciók = [
                { x: 150, y: 131 },
                { x: 300, y: 131 },  
                { x: 450, y: 131 },
                { x: 600, y: 131 },
                { x: 750, y: 131 },
                { x: 900, y: 131 },
                { x: 0, y: 281},
                { x: 150, y: 281 },
                { x: 300, y: 281 },  
                { x: 450, y: 281 },
                { x: 600, y: 281 },
                { x: 750, y: 281 },
                { x: 150, y: 431 },
                { x: 300, y: 431 },  
                { x: 450, y: 431 },
                { x: 600, y: 431 },
                { x: 750, y: 431 },
                { x: 900, y: 431 },
                { x: 0, y: 531},]
                csillagPozíciók = [{ x: 40, y: 500 }];
                pálya = 4
                x = 880
                y = 90
                hatterKepPath = '../imagin/hatterkep2.jpg';
            break
        case 4:
            document.getElementById("szintSzam").textContent = "Szint: " + palyaszint;
            talajPozíciók = [
                { x: 0, y : 551},
                { x: 0, y: 481 },
                { x: 0, y: 411 },
                { x: 0, y: 341 },
                { x: 0, y: 271 },
                { x: 0, y: 201 },
                { x: 0, y: 131 },
                { x: 0, y: 61 },
                { x: 880, y: 551}
            ];
            csillagPozíciók = [{ x: 925, y: 520 }];
            pálya = 5
            x = 10
            y = 500
            hatterKepPath = '../imagin/hatterkep4.jpg';
            break
        
        case 5:
            document.getElementById("szintSzam").textContent = "Szint: " + palyaszint;
            talajPozíciók = [
                { x: 0, y: 120},
                { x: 300, y: 120 },  
                { x: 600, y: 120 },
                //
                { x: 150, y: 190 },
                { x: 450, y: 190 },
                { x: 750, y: 190 },
                //
                { x: 0, y: 260},
                { x: 300, y: 260 },  
                { x: 600, y: 260 },
                //
                { x: 150, y: 330 },
                { x: 450, y: 330 },
                { x: 750, y: 330 },
                //{ x: 900, y: 131 },
                { x: 0, y: 400},
                { x: 300, y: 400 },  
                { x: 600, y: 400 },
                //{ x: 750, y: 281 },
                { x: 150, y: 470 }, 
                { x: 450, y: 470 },
                { x: 750, y: 470 },
                //{ x: 900, y: 431 },
                { x: 0, y: 531},]
                csillagPozíciók = [{ x: 890, y: 50 }];
                pálya = 6
                x = 40 
                y = 480
                hatterKepPath = '../imagin/hatterkep5.jpg';
                break
        case 6:
            document.getElementById("szintSzam").textContent = "Szint: " + palyaszint;
            talajPozíciók = [
                { x: 0, y : 551},
                { x: 0, y: 481 },
                { x: 0, y: 411 },
                { x: 0, y: 341 },
                { x: 0, y: 271 },
                { x: 0, y: 201 },
                { x: 0, y: 131 },
                { x: 150, y: 131 },
                { x: 300, y: 131 },  
                { x: 450, y: 131 },
                { x: 600, y: 131 },
                { x: 750, y: 131 },
                { x: 900, y: 131 }
            ];
            csillagPozíciók = [{ x: 950, y: 100 }];
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 0, 100, 800));
            pálya = 7
            x = 10
            y = 500
            hatterKepPath = '../imagin/hatterkep3.jpg';
            break
        
        case 7:
            document.getElementById("szintSzam").textContent = "Szint: " + palyaszint;
            talajPozíciók = [
            { x: 150, y: 131 },
            { x: 300, y: 131 },  
            { x: 450, y: 131 },
            { x: 600, y: 131 },
            { x: 750, y: 131 },
            { x: 900, y: 131 },
            { x: 0, y: 281},
            { x: 150, y: 281 },
            { x: 300, y: 281 },  
            { x: 450, y: 281 },
            { x: 600, y: 281 },
            { x: 750, y: 281 },
            { x: 150, y: 431 },
            { x: 300, y: 431 },  
            { x: 450, y: 431 },
            { x: 600, y: 431 },
            { x: 750, y: 431 },
            { x: 900, y: 431 },
            { x: 0, y: 531},]
            csillagPozíciók = [{ x: 40, y: 500 }];
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 150, 100, 700));
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 50, 250, 800));
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 150, 400, 830));
            x = 880
            y = 90
            pálya = 8
            hatterKepPath = '../imagin/hatterkep2.jpg';
            break
        case 8:
            document.getElementById("szintSzam").textContent = "Szint: " + palyaszint;
            talajPozíciók = [
            { x: 0, y: 120},
            { x: 300, y: 120 },  
            { x: 600, y: 120 },
            //
            { x: 150, y: 190 },
            { x: 450, y: 190 },
            { x: 750, y: 190 },
            //
            { x: 0, y: 260},
            { x: 300, y: 260 },  
            { x: 600, y: 260 },
            //
            { x: 150, y: 330 },
            { x: 450, y: 330 },
            { x: 750, y: 330 },
            //{ x: 900, y: 131 },
            { x: 0, y: 400},
            { x: 300, y: 400 },  
            { x: 600, y: 400 },
            //{ x: 750, y: 281 },
            { x: 150, y: 470 }, 
            { x: 450, y: 470 },
            { x: 750, y: 470 },
            //{ x: 900, y: 431 },
            { x: 0, y: 531},]
            csillagPozíciók = [{ x: 40, y: 50 }];
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 0, 230, 95));
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 0, 370, 95));
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 150, 300, 95));
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 450, 300, 95));
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 750, 440, 95));
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 300, 90, 95));
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 750, 160, 95));
            //enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 300, 370, 95));
            pálya = 9
            x = 40 
            y = 480
            hatterKepPath = '../imagin/hatterkep5.jpg';
            break

        case 9:
            document.getElementById("szintSzam").textContent = "Szint: " + palyaszint;
            talajPozíciók = [
                { x: 0, y : 551},
                { x: 0, y: 481 },
                { x: 0, y: 411 },
                { x: 0, y: 341 },
                { x: 0, y: 271 },
                { x: 0, y: 201 },
                { x: 0, y: 131 },
                { x: 0, y: 61 },
                { x: 880, y: 551}
            ];

            csillagPozíciók = [{ x: 925, y: 520 }];
            //enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 0, 101, 95));
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 0, 171, 95));
            //enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 0, 241, 95));
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 0, 311, 95));
            //enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 0, 381, 95));
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 0, 451, 95));
            pálya = 10
            x = 10
            y = 500
            hatterKepPath = '../imagin/hatterkep4.jpg';
            break
        
        case 10:
            document.getElementById("szintSzam").textContent = "Szint: " + palyaszint;
            talajPozíciók = [
                { x: 450, y : 551},
                { x: 450, y: 70 },
            ]
            csillagPozíciók = [{ x: 500, y: 520 }];
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 20, 100, 950));
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 70, 200, 900));
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 170, 300, 780));
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 270, 400, 680));
            enemiTomb.push(new Enemi(document.querySelector('canvas').getContext('2d'), 470, 500, 480));
            pálya = 11
            x = 480
            y = 20
            hatterKepPath = '../imagin/hatterkep1.jpg';  // Első pálya háttérképe
            break
        
        case 11:
            alert("Nyertél!");
            gameFinished = true; // Jelöld meg, hogy vége a játéknak
            window.location.href = '../index.html'
            break        
        }


    const hatter = new Hatter(talajPozíciók, csillagPozíciók, hatterKepPath);
    const karakter = new Sprite(hatter.context, '../imagin/Macska.jpg', 184, 92, 12, 6);
    const jatek = new Jatek(hatter, karakter, x, y, palyaszint, enemiTomb, pálya);
    jatek.start();
}

// Az első pálya inicializálása
palyavaltasa(palyaszint);

// Folyamatos ellenőrzés a pályaszint váltására
function ellenorzes() {
    if (palyaszint !== aktualisPalyaszint) {
        aktualisPalyaszint = palyaszint;
        palyavaltasa(aktualisPalyaszint);
    }
}
setInterval(ellenorzes, 500);