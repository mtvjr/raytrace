import { Entity, EntityConstructorArgs } from "../Entity";
import { Vec2 } from "../math/Vec2";
import { Vec3 } from "../math/Vec3";
import { ViewPort, ViewPortConstructorArgs } from "./ViewPort";


export type CameraConstructorArgs = EntityConstructorArgs & {
    /** Describes how to construct the camera's viewport */
    viewPort?: ViewPortConstructorArgs
}

/**
 * Defines which values are used if attributes are missing
 * from the Camera constructor arguments 
 */
const CAMERA_DEFAULTS: CameraConstructorArgs = {
    viewPort: {} // Use viewport defaults
}

export class Camera extends Entity {
    viewPort!: ViewPort;

    constructor(args?: CameraConstructorArgs) {
        super(args);

        this.viewPort = new ViewPort(args?.viewPort ?? CAMERA_DEFAULTS.viewPort);
    }

    /**
     * Get the vector from the camera to the pixel on the viewport for a given canvas
     * row and position
     * @param canvasDimensions The size of the canvas
     * @param pixel The pixel in the canvas to render
     * @returns A vec3 describing the vector from the camera to the viewport
     */
    cameraToViewPort(canvasDimensions: Vec2, pixel: Vec2): Vec3 {
        return new Vec3({
            x: pixel.x * this.viewPort.size.x / canvasDimensions.x,
            y: pixel.y * this.viewPort.size.y / canvasDimensions.y,
            z: this.viewPort.position.z,
        });
    }
}
