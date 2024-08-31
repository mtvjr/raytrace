
export type ColorConstructorArgs = Partial<Color>;

var COLOR_DEFAULTS: ColorConstructorArgs = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 255,
}

export class Color {
    private _alpha: number;
    private _red: number;
    private _green: number;
    private _blue: number;


    constructor(args?: ColorConstructorArgs) {
        this.red = args?.red ?? COLOR_DEFAULTS.red;
        this.green = args?.green ?? COLOR_DEFAULTS.green;
        this.blue = args?.blue ?? COLOR_DEFAULTS.blue;
        this.alpha = args?.alpha ?? COLOR_DEFAULTS.alpha;
    }

    private validate(n: number) {
        if (Number.isInteger(n) === false) {
            throw new Error("Color values must be integral")
        }

        if (n < 0 || n > 255) {
            throw new Error("Color values must be between 0 and 255")
        }
    }
    

    get alpha() {
        return this._alpha;
    }

    set alpha(a: number) {
        this.validate(a)
        this._alpha = a;
    }

    get red() {
        return this._red;
    }

    set red(r: number) {
        this.validate(r)
        this._red = r;
    }

    get green() {
        return this._green;
    }

    set green(g: number) {
        this.validate(g)
        this._green = g;
    }

    get blue() {
        return this._blue;
    }

    set blue(b: number) {
        this.validate(b)
        this._blue = b;
    }

    toString(): string {
        return `[${this.red}, ${this.green}, ${this.blue}, ${this.alpha}]`;
    }
}