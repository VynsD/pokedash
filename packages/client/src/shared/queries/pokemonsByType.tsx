import React from 'react';
import * as ANTD from 'antd';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'; // import gql from 'graphql-tag';
import { PokemonEdge } from '../data/interfaces';

import Loading from '../components/loading';
import ErrorNotFound from '../components/errors';

// Type
type queryParams = {
  q?: string,
  after?: string,
  limit?: number,
  pokemonType: string
}

// Query Body
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

function PokemonsByType(props: queryParams) {
  // Consts
  let pokemonType = props.pokemonType;
  const { loading, error, data } = useQuery(QUERY_BY_TYPE, {
    variables: { pokemonType },
  });
  const ErrorProps = {
    reserchType: 'ByType'
  }
  // Loading Template
  if (loading) return <Loading />
  // Error Template
  if (error) return <ErrorNotFound {...ErrorProps} />
  // Success Template
  return (
    <div className="grid-wrapper">
      {
        data.pokemonsByType.edges.map(({ cursor, node }: PokemonEdge) =>
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
            <span className="card-number">{node.id}</span>
            <ANTD.Card.Meta
              title={node.name}
              description={
                <div className="card-description">
                  <div className="card-description--classification" >
                    <span>{node.classification}</span>
                  </div>
                  <div className="card-description--types">
                    {
                      node.types.map((el, i) => {
                        return <span key={i} className="types-label">{el}</span>
                      })
                    }
                  </div>
                </div>
              }>
            </ANTD.Card.Meta>
          </ANTD.Card>
        )
      }
    </div>
  )
}

export default PokemonsByType;
