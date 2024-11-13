export class Hatter {
    constructor(positions, csillagPozíciók, hatterKepPath) {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 1024;
        this.canvas.height = 576;

        // Háttérkép beállítása
        this.hatterKep = new Image();
        this.hatterKep.src = hatterKepPath;

        this.talaj = new Image();
        this.talaj.src = '../imagin/talaj.png';

        this.csillag = new Image();
        this.csillag.src = '../imagin/csillag2.png';

        this.positions = positions;
        this.csillagPozíciók = csillagPozíciók;

        // Ha a képek betöltődtek, rajzoljuk ki őket
        this.hatterKep.addEventListener('load', () => this.drawImages());
        this.talaj.addEventListener('load', () => this.drawImages());
        this.csillag.addEventListener('load', () => this.drawImages());
    }

    Talajutkozesbalra(x, y) {
        return this.positions.some(position => (
            x <= position.x + 125 &&
            x > position.x &&
            y + 40 > position.y &&
            y < position.y + 25
        ));
    }

    Talajutkozesjobbra(x, y) {
        return this.positions.some(position => (
            x + 86 >= position.x &&
            x < position.x &&
            y + 40 > position.y &&
            y < position.y + 25
        ));
    }

    drawImages() {
        // Háttérkép rajzolása
        this.context.drawImage(this.hatterKep, 0, 0, this.canvas.width, this.canvas.height);

        // Talaj és csillagok rajzolása
        this.positions.forEach(position => {
            this.context.drawImage(this.talaj, position.x, position.y, 125, 25);
        });

        this.csillagPozíciók.forEach(position => {
            this.context.drawImage(this.csillag, position.x, position.y, 30, 30);
        });
    }

    Talajutkozesle(x, y) {
        return this.positions.some(position => (
            x < position.x + 125 &&
            x + 70 > position.x &&
            y + 40 === position.y
        ));
    }

    CsillagUtkozes(karakterX, karakterY, karakterSzelesseg = 86, karakterMagassag = 40) {
        return this.csillagPozíciók.some(position => (
            karakterX < position.x + 30 &&
            karakterX + karakterSzelesseg > position.x &&
            karakterY < position.y + 30 &&
            karakterY + karakterMagassag > position.y
        ));
    }
}