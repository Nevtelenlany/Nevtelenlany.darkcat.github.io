export class Enemi {
    constructor(context, startX, startY, range) {
        this.context = context;
        this.startX = startX;
        this.startY = startY;
        this.x = startX;
        this.y = startY;
        this.range = range;
        this.size = 30;
        this.speed = 1;
        this.direction = 1;
    }

    move() {
        if (this.x > this.startX + this.range || this.x < this.startX) {
            this.direction *= -1;
        }
        this.x += this.speed * this.direction;
        this.draw();
    }

    draw() {
        this.context.fillStyle = 'red';
        this.context.fillRect(this.x, this.y, this.size, this.size);
    }

    checkCollision(karakterX, karakterY, karakterSzelesseg, karakterMagassag) {
        return (
            karakterX < this.x + this.size &&
            karakterX + karakterSzelesseg > this.x &&
            karakterY < this.y + this.size &&
            karakterY + karakterMagassag > this.y
        );
    }
}