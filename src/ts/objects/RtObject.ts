import { Entity, EntityConstructorArgs } from "../Entity"
import { Color, ColorConstructorArgs } from "../Color"
import { Vec3 } from "../math/Vec3";

export type RtObjectConstructorArgs = EntityConstructorArgs & {
    color?: ColorConstructorArgs;
}

/**
 * Defines which values are used if attributes are missing
 * from the Objector constructor arguments
 */
const OBJECT_DEFAULTS: RtObjectConstructorArgs = {
    color: {} // Default color args
}

export abstract class RtObject extends Entity {
    color!: Color;

    constructor(args?: RtObjectConstructorArgs) {
        super(args)
        this.color = new Color(args?.color ?? OBJECT_DEFAULTS.color);
    }

    /**
     * Get the collisions of a ray shooting from an origin point
     * at the object
     * @param origin The position the ray shoots from
     * @param ray The direction vector of the ray
     * @returns A collection of intersecting points
     */
    abstract getCollisions(origin: Vec3, ray: Vec3): Array<Vec3>;
}