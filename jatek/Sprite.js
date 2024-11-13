export class Sprite {
    constructor(context, spritesheetPath, frameWidth, frameHeight, moveFrameCount, sitFrameCount) {
        this.context = context;
        this.image = new Image();
        this.image.src = spritesheetPath;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.moveFrameCount = moveFrameCount;
        this.sitFrameCount = sitFrameCount;
        this.currentFrame = 0;
        this.flipHorizontally = false;
        this.animationSpeed = 5;
        this.frameCounter = 0;
        this.isSitting = false;
    }

    draw(x, y, scale = 0.5) {
        const scaledWidth = this.frameWidth * scale;
        const scaledHeight = this.frameHeight * scale;

        this.context.save();

        if (this.flipHorizontally) {
            this.context.translate(x + scaledWidth, y);
            this.context.scale(-1, 1);
            x = 0;
        } else {
            this.context.translate(x, y);
        }

        const spriteX = this.isSitting ? this.frameWidth : 0;
        const spriteY = this.isSitting
            ? Math.min(this.currentFrame, this.sitFrameCount - 1) * this.frameHeight
            : this.currentFrame * this.frameHeight;

        this.context.drawImage(
            this.image,
            spriteX,
            spriteY,
            this.frameWidth,
            this.frameHeight,
            0,
            0,
            scaledWidth,
            scaledHeight
        );

        this.context.restore();

        this.frameCounter++;
        if (this.frameCounter >= this.animationSpeed) {
            if (this.isSitting) {
                if (this.currentFrame < this.sitFrameCount - 1) {
                    this.currentFrame++;
                }
            } else {
                this.currentFrame = (this.currentFrame + 1) % this.moveFrameCount;
            }
            this.frameCounter = 0;
        }
    }

    sit() {
        if (!this.isSitting) {
            this.isSitting = true;
            this.currentFrame = 0;
        }
    }

    move() {
        if (this.isSitting) {
            this.isSitting = false;
            this.currentFrame = 0;
        }
    }
}
