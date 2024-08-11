import { Err, Ok, Result } from "../util/Result";


export class Vec3 {
    x: number
    y: number
    z: number

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
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
        return new Vec3(this.x * by, this.y * by, this.z * by);
    }

    add(other: Vec3): Vec3 {
        return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
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

        return Ok(new Vec3(x.value, y.value, z.value));
    }
}