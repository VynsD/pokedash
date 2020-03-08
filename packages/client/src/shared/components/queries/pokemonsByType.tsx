import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { PokemonsConnection, PokemonEdge } from '../../interfaces';

const QUERY_BY_TYPE = gql`
  query queryByType($pokemonType: String!) {
    pokemonsByType(type: $pokemonType) {
      edges {
        cursor,
        node {
          id,
          name,
          types,
        }
      }
      pageInfo {
        endCursor,
        hasNextPage
      }
    }
}
`;

function PokemonsByType(props: any) {
  let pokemonType = props.pokemonType;
  console.log(pokemonType)
  const { loading, error, data } = useQuery(QUERY_BY_TYPE, {
    variables: { pokemonType },
  });
  // Loading Template
  if (loading) return <p><span>Data Loading...</span></p>
  // Error Template
  if (error) return <p><span>Error while fetching data</span></p>

  // Pagination Template
  const Pagination = () => {
    return (
      <div>
        <span>paginator</span>
      </div>
    );
  }

  const responseParsed = data.pokemonsByType.edges.map((el: PokemonEdge) => el.node);
  console.log(responseParsed);
  // Success Template
  return data.pokemonsByType.edges.map(({ cursor, node }: PokemonEdge) =>
    <div key={cursor}>
      <span>{node.id}</span>
      <span>{node.name}</span>
      <span>{node.types}</span>
      <Pagination />
    </div>
  );
}

export default PokemonsByType;