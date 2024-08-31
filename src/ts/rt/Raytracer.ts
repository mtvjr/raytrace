import { Camera } from "./Camera"
import { RtObject } from "../objects/RtObject";
import { Sphere } from "../objects/Sphere";
import { Vec2 } from "../math/Vec2";
import { Color } from "../Color";
import { Vec3 } from "../math/Vec3";
import { ICanvas } from "./ICanvas";

const SCALE = 1;
const BACKGROUND_COLOR = new Color();

export class Raytracer {
    camera: Camera = new Camera({
        position: [0, 0, 0],
        viewPort: {
            size: {x: SCALE, y: SCALE},
            position: {x: SCALE / 2, y: SCALE / 2, z: SCALE}
        }
    });
    objects: RtObject[] = new Array(
        // new Sphere({radius: 1, position: [1, 0, 0], color: {green: 255}}),
        new Sphere({radius: 1, position: [0, -1, 3], color: {red: 255}}),
        new Sphere({radius: 1, position: [2, 0, 4], color: {blue: 255}}),
        new Sphere({radius: 1, position: [-2, 0, 4], color: {green: 255}}),
    );
    size: Vec2 = new Vec2([SCALE * 500, SCALE * 500]);

    constructor(public canvas: ICanvas) {
        // Set up the canvas to be an appropriate render window
        canvas.setSize(this.size);
    }

    render() {
        for(var y = 0; y < this.size.y; y++)
        {
            for(var x = 0; x < this.size.x; x++)
            {
                const pixel = new Vec2({x: x, y: y});
                const ray = this.camera.cameraToViewPort(this.size, pixel);
                const color = this.traceRay(this.camera.position, ray, 1, Infinity);
                this.canvas.setColor(pixel, color);
            }
        }

        this.canvas.finalize();
    }

    traceRay(origin: Vec3, ray: Vec3, minDistance: number, maxDistance: number): Color {
        var closestObject : RtObject;
        var closestDistance = Infinity;

        this.objects.forEach(sphere => {
            const collisions = sphere.getCollisions(origin, ray);
            collisions.forEach(distance => {
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestObject = sphere;
                }
            })
        });

        return closestObject?.color ?? BACKGROUND_COLOR;
    }
}
