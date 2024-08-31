import { Vec3 } from "../math/Vec3";
import { RtObject, RtObjectConstructorArgs } from "./RtObject";

export type SphereConstructorArgs = RtObjectConstructorArgs & {
    radius?: number;
}

/**
 * Defines which values are used if attributes are missing
 * from the Sphere constructor arguments 
 */
const SPHERE_DEFAULTS : SphereConstructorArgs = {
    radius: 1,
};

export class Sphere extends RtObject {
    radius!: number;
    
    constructor(args?: SphereConstructorArgs) {
        super(args)
        this.radius = args?.radius ?? SPHERE_DEFAULTS.radius;
    }

    getCollisions(origin: Vec3, ray: Vec3): Array<number> {
        const centerToOrigin = origin.minus(this.position);

        // Solve quadratic equation :)
        const a = ray.dot(ray);
        const b = 2 * centerToOrigin.dot(ray);
        const c = centerToOrigin.dot(centerToOrigin) - (this.radius * this.radius);

        const discriminant = b*b - 4*a*c;
        if (discriminant < 0) {
            // No collisions
            return [];
        }

        const sqrt = Math.sqrt(discriminant);
        const t1 = (-b + sqrt) / (2*a);
        const t2 = (-b - sqrt) / (2*a);
        if (t1 == t2) {
            return [t1];
        } else {
            return [t1, t2];
        }
    }
}
