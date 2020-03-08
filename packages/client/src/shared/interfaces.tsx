export interface PageInfo {
  endCursor: string
  hasNextPage: Boolean
}

export interface Pokemon {
  id: string
  name: String
  types: [String]
  classification: string
}

export interface PokemonEdge {
  cursor: string,
  node: Pokemon
}

export interface PokemonsConnection {
  edges: [PokemonEdge],
  pageInfo: PageInfo
}