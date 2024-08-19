import { Entity, EntityConstructorArgs } from "../Entity";
import { ViewPort, ViewPortConstructorArgs } from "./ViewPort";


export type CameraConstructorArgs = EntityConstructorArgs & {
    /** Describes how to construct the camera's viewport */
    viewPort?: ViewPortConstructorArgs
}

const CAMERA_DEFAULTS: CameraConstructorArgs = {
    viewPort: {} // Use viewport defaults
}

export class Camera extends Entity {
    viewPort!: ViewPort;

    constructor(args?: CameraConstructorArgs) {
        super(args);

        this.viewPort = new ViewPort(args?.viewPort === undefined
                                        ? CAMERA_DEFAULTS.viewPort
                                        : args.viewPort);
    }
}
