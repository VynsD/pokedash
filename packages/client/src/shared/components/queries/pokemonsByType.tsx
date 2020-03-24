import React from 'react';
import * as ANTD from 'antd';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { PokemonsConnection, PokemonEdge } from '../../interfaces';

const QUERY_BY_TYPE = gql`
  query queryByType($pokemonType: String!, $after: ID, $limit: Int) {
    pokemonsByType(type: $pokemonType, after: $after, limit: $limit) {
      edges {
        cursor,
        node {
          id,
          name,
          types,
          classification,
          sprites {
            new,
            old
          }
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
    <ANTD.Card
      className="card"
      key={cursor}
      hoverable
      cover={
        <img
          alt="pokemon img"
          src={node.sprites.new}
          className="card-sprite card-sprite-fixed" />
      }
    >
      <span>{node.id}</span>
      <ANTD.Card.Meta
        title={node.name}
        description={
          <div>
            <span>{node.classification}</span>
            <span>{node.types}</span>
          </div>
        }>
      </ANTD.Card.Meta>
      {/*<Pagination /> NOT HERE*/}
    </ANTD.Card>
  );
}

export default PokemonsByType;