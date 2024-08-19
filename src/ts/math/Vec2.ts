import { Err, Ok, Result } from "../util/Result";

type Vec2NamedArgs = {
    x: number;
    y: number;
}

type Vec2ArrayArgs = [number, number];
export type Vec2ConstructorArgs = Vec2NamedArgs | Vec2ArrayArgs;

function isNamedArgs(obj: any): obj is Vec2NamedArgs {
    return 'x' in obj && 'y' in obj;
}

export class Vec2 {
    x!: number
    y!: number

    constructor(args: Vec2ConstructorArgs) {
        if (isNamedArgs(args)) {
            this.x = args.x;
            this.y = args.y;
        } else {
            this.x = args[0];
            this.y = args[1];
        }
    }

    equals(other: Vec2): boolean {
        return (this.x == other.x
                && this.y == other.y);
    }

    dot(other: Vec2): number {
        return this.x * other.x + this.y * other.y;
    }

    scale(by: number): Vec2 {
        return new Vec2({
            x: this.x * by,
            y: this.y * by
        });
    }

    add(other: Vec2): Vec2 {
        return new Vec2({
            x: this.x + other.x,
            y: this.y + other.y
        });
    }

    toString(): string {
        return `[${this.x},${this.y}]`;
    }

    static parse(input: string): Result<Vec2, string> {
        const regex = /\[\s*(\d.?\d?),\s*(\d.?\d?)\]/ // Should match [1.2, 34]
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

        return Ok(new Vec2({
            x: x.value,
            y: y.value
        }));
    }
}