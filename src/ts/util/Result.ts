
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
