
type OkType<T> = {
    ok: true,
    value: T
}

type ErrType<E> = {
    ok: false,
    error: E
}

export type Result<T, E> = OkType<T> | ErrType<E>

export function Ok<T>(value: T): OkType<T> {
    return {
        "ok": true,
        "value": value
    }
}

export function Err<E>(error: E): ErrType<E> {
    return {
        "ok": false,
        "error": error,
    }
}

export function unwrap<T, E>(result: Result<T, E>): T {
    if (result.ok === false) {
        throw Error("Invalid unwrap of " + result);
    }
    return result.value;
}
