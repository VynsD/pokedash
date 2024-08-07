import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import { identity } from "fp-ts/lib/function";
import { data } from "../data/pokemons";
import { toConnection, slice } from "../functions";
import { Connection, PokeImage } from "../types";

interface Pokemon {
  id: string;
  name: string;
  types: string[];
  classification: string;
  sprites: PokeImage
}

const SIZE = 10;

export function query(args: {
  q?: string;
  after?: string;
  limit?: number;
}): Connection<Pokemon> {
  const { q, after, limit = SIZE } = args;

  const filterByQ: (as: Pokemon[]) => Pokemon[] =
    // filter only if q is defined
    q === undefined
      ? identity
      : A.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  const sliceByAfter: (as: Pokemon[]) => Pokemon[] =
    // filter only if after is defined
    after === undefined
      ? identity
      : as =>
        pipe(
          as,
          A.findIndex(a => a.id === after),
          O.map(a => a + 1),
          O.fold(() => as, idx => as.slice(idx))
        );

  const results: Pokemon[] = pipe(
    data,
    filterByQ,
    sliceByAfter,
    // slicing limit + 1 because the `toConnection` function should known the connection size to determine if there are more results
    slice(0, limit + 1)
  );
  return toConnection(results, limit);
}

export function queryByType(args: {
  type: string;
  after?: string;
  limit?: number;
}): Connection<Pokemon> {
  const { type, after, limit = SIZE } = args;

  const filterByType: (as: Pokemon[]) => Pokemon[] =
    // filter only Type selected
    type === undefined
      ? identity
      : A.filter(p => p.types.some(e => e.toLowerCase().includes(type.toLowerCase())));

  const sliceByAfter: (as: Pokemon[]) => Pokemon[] =
    // filter only if after is defined
    after === undefined
      ? identity
      : as =>
        pipe(
          as,
          A.findIndex(a => a.id === after),
          O.map(a => a + 1),
          O.fold(() => as, idx => as.slice(idx))
        );

  const results: Pokemon[] = pipe(
    data,
    filterByType,
    sliceByAfter,
    // slicing limit + 1 because the `toConnection` function should known the connection size to determine if there are more results
    slice(0, limit + 1)
  );
  return toConnection(results, limit);
}
