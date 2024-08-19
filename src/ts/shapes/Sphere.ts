import { Entity, EntityConstructorArgs } from "../Entity";

export type SphereConstructorArgs = EntityConstructorArgs & {
    radius?: number;
}

const SPHERE_DEFAULTS : SphereConstructorArgs = {
    radius: 1,
};

export class Sphere extends Entity {
    radius!: number;
    
    constructor(args?: SphereConstructorArgs) {
        super(args)
        this.radius = (args?.radius === undefined) ? SPHERE_DEFAULTS.radius : args.radius;
    }
}
