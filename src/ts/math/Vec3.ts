import { Err, Ok, Result } from "../util/Result";

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
        return (this.x == other.x
                && this.y == other.y
                && this.z == other.z);
    }

    dot(other: Vec3): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    scale(by: number): Vec3 {
        return new Vec3([this.x * by, this.y * by, this.z * by]);
    }

    add(other: Vec3): Vec3 {
        return new Vec3([this.x + other.x, this.y + other.y, this.z + other.z]);
    }

    toString(): string {
        return `[${this.x},${this.y},${this.z}]`;
    }

    static parse(input: string): Result<Vec3, string> {
        const regex = /\[\s*(\d.?\d?),\s*(\d.?\d?),\s*(\d.?\d?)\]/ // Should match [1.2, 34, 35]
        const results = regex.exec(input)
        if (results === null) {
            return Err(`Input string "${input}" not in form [x, y, z]`);
        }

        const myNumParser = (input: string): Result<number, string> => {
            let num = parseFloat(input)
            if (isNaN(num)) {
                return Err(`"${input}" is not a valid number`)
            }
            return Ok(num)
        }

        const x = myNumParser(results[1]);
        if (x.ok === false) return x;

        const y = myNumParser(results[2]);
        if (y.ok === false) return y;

        const z = myNumParser(results[3]);
        if (z.ok === false) return z;

        return Ok(new Vec3([x.value, y.value, z.value]));
    }
}