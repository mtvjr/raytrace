import { Color } from "../Color";
import { Vec2 } from "../math/Vec2";

export interface ICanvas {
    setSize(size: Vec2);
    getSize(): Vec2;

    setColor(pixel: Vec2, color: Color);

    finalize();
}

export class HTMLCanvasAdapater implements ICanvas {
    imageData: ImageData;
    context: CanvasRenderingContext2D
    size = new Vec2([200, 200]);

    constructor(public canvas: HTMLCanvasElement) {
        this.context = canvas.getContext("2d");
        this.setSize(new Vec2([canvas.width, canvas.height]))
    }

    setSize(size: Vec2) {
        this.size = size;
        this.canvas.width = size.x;
        this.canvas.height = size.y;
        this.imageData = this.context.createImageData(size.x, size.y);
    }

    getSize(): Vec2 {
        return this.size;
    }

    setColor(pixel: Vec2, color: Color) {
        const elementNumber = pixel.y * this.canvas.width + pixel.x;
        const baseIndex = elementNumber * 4;
        const redIndex = baseIndex + 0;
        const greenIndex = baseIndex + 1;
        const blueIndex = baseIndex + 2;
        const alphaIndex = baseIndex + 3;

        this.imageData.data[redIndex] = color.red;
        this.imageData.data[greenIndex] = color.green;
        this.imageData.data[blueIndex] = color.blue;
        this.imageData.data[alphaIndex] = color.alpha;
    }

    finalize() {
        // dumpBuffer()
        this.context.putImageData(this.imageData, 0, 0, 0, 0, this.size.x, this.size.y);
    }

    dumpBuffer() {
        for(var element = 0; element < this.size.x * this.size.y; element += 4) {
            var r = this.imageData.data[element];
            var g = this.imageData.data[element + 1];
            var b = this.imageData.data[element + 2];
            var a = this.imageData.data[element + 3];
            console.log(`Pixel #${element} to [${r}, ${g}, ${b}, ${a}]`)
        }
    }
}