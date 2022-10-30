type ResultOk<T> = { ok: true; value: T };
type ResultErr<E> = { ok: false; error: E | undefined };

export type Result<T, E = undefined> = ResultOk<T> | ResultErr<E>;

export const ok = <T>(value: T): Result<T> => {
  return {
    ok: true,
    value,
  };
};

export const err = <E>(error: E): ResultErr<E> => {
  return {
    ok: false,
    error,
  };
};
