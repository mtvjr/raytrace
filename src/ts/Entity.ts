import { Vec3, Vec3ConstructorArgs } from "./math/Vec3";

export type EntityConstructorArgs = {
    /**
     * The position of the entity in the world
     */
    position?: Vec3ConstructorArgs;
};

const ENTITY_DEFAULTS: EntityConstructorArgs = {
    "position": [0, 0, 0]
}

export class Entity {
    position!: Vec3;

    constructor(args?: EntityConstructorArgs) {
        this.position = new Vec3(args?.position === undefined
                                    ? ENTITY_DEFAULTS.position
                                    : args.position);
    }
}