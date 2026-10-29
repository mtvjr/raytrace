
export type ColorConstructorArgs = Partial<Color>;

var COLOR_DEFAULTS = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 255,
} satisfies ColorConstructorArgs;

export class Color {
    private _alpha: number;
    private _red: number;
    private _green: number;
    private _blue: number;


    constructor(args?: ColorConstructorArgs) {
        this._red = Color.validateColorChannel(args?.red ?? COLOR_DEFAULTS.red);
        this._green = Color.validateColorChannel(args?.green ?? COLOR_DEFAULTS.green);
        this._blue = Color.validateColorChannel(args?.blue ?? COLOR_DEFAULTS.blue);
        this._alpha = Color.validateColorChannel(args?.alpha ?? COLOR_DEFAULTS.alpha);
    }

    public static validateColorChannel(n: number): number {
        if (Number.isInteger(n) === false) {
            throw new Error("Color values must be integral")
        }

        if (n < 0 || n > 255) {
            throw new Error("Color values must be between 0 and 255")
        }

        return n;
    }
    

    get alpha() {
        return this._alpha;
    }

    set alpha(a: number) {
        this._alpha = Color.validateColorChannel(a);
    }

    get red() {
        return this._red;
    }

    set red(r: number) {
        this._red = Color.validateColorChannel(r);
    }

    get green() {
        return this._green;
    }

    set green(g: number) {
        this._green = Color.validateColorChannel(g);
    }

    get blue() {
        return this._blue;
    }

    set blue(b: number) {
        this._blue = Color.validateColorChannel(b);
    }

    toString(): string {
        return `[${this.red}, ${this.green}, ${this.blue}, ${this.alpha}]`;
    }
}