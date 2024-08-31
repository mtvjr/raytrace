import { Entity, EntityConstructorArgs } from "../Entity";
import { Vec2, Vec2ConstructorArgs } from "../math/Vec2";


export type ViewPortConstructorArgs = EntityConstructorArgs & {
    /** How large the viewport appears to be in the world, as a rectangle */
    size?: Vec2ConstructorArgs;
}

/**
 * Defines which values are used if attributes are missing
 * from the ViewPort constructor arguments 
 */
const VIEW_PORT_DEFAULTS: ViewPortConstructorArgs = {
    size: [480, 480]
}

/**
 * A viewport describes the window a camera will look through
 */
export class ViewPort extends Entity {
    size!: Vec2;

    constructor(args?: ViewPortConstructorArgs) {
        super(args);
        this.size = new Vec2(args?.size ?? VIEW_PORT_DEFAULTS.size);
    }
}