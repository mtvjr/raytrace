
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

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y + this.y);
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
}