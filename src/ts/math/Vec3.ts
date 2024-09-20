
type Vec3NamedArgs = {
    x: number;
    y: number;
    z: number;
}
type Vec3ArrayArgs = [number, number, number];
export type Vec3ConstructorArgs = Vec3NamedArgs | Vec3ArrayArgs;


function isNamedArgs(obj: any): obj is Vec3NamedArgs {
    return 'x' in obj && 'y' in obj && 'z' in obj;
}

export class Vec3 {
    x!: number
    y!: number
    z!: number

    constructor(args: Vec3ConstructorArgs) {
        if (isNamedArgs(args)) {
            this.x = args.x;
            this.y = args.y;
            this.z = args.z;
        } else {
            this.x = args[0];
            this.y = args[1];
            this.z = args[2];
        }
    }

    equals(other: Vec3): boolean {
        return (this.x === other.x
             && this.y === other.y
             && this.z === other.z);
    }

    magnitude(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    }

    dot(other: Vec3): number {
        return (this.x * other.x) + (this.y * other.y) + (this.z * other.z);
    }

    scale(by: number): Vec3 {
        return new Vec3([this.x * by, this.y * by, this.z * by]);
    }

    add(other: Vec3): Vec3 {
        return new Vec3([this.x + other.x, this.y + other.y, this.z + other.z]);
    }

    minus(other: Vec3): Vec3 {
        return new Vec3([this.x - other.x, this.y - other.y, this.z - other.z]);
    }

    square(): Vec3 {
        return new Vec3([this.x * this.x, this.y * this.y, this.z * this.z]);
    }

    toString(): string {
        return `[${this.x},${this.y},${this.z}]`;
    }
}