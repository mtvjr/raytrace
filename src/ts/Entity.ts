import { Vec3, Vec3ConstructorArgs } from "./math/Vec3";

export type EntityConstructorArgs = {
    /**
     * The position of the entity in the world
     */
    position?: Vec3ConstructorArgs;
};

/**
 * Defines which values are used if attributes are missing
 * from the Entity constructor arguments 
 */
const ENTITY_DEFAULTS: EntityConstructorArgs = {
    position: [0, 0, 0]
}

export class Entity {
    position!: Vec3;

    constructor(args?: EntityConstructorArgs) {
        this.position = new Vec3(args?.position ?? ENTITY_DEFAULTS.position);
    }
}
