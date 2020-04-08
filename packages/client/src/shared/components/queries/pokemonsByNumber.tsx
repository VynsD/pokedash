import React from 'react';
import * as ANTD from 'antd';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'; // import gql from 'graphql-tag';
import { PokemonEdge } from '../../interfaces';

import Loading from '../loading';
import ErrorNotFound from '../errors';

// Consts
const QUERY_BY_TYPE = gql`
  query query($q: String, $after: ID, $limit: Int) {
    pokemons(q: $q, after: $after, limit: $limit) {
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

function PokemonsByNumber(props: any) {
  // Consts
  let { q, after, limit, typeData } = props;
  const { loading, error, data } = useQuery(QUERY_BY_TYPE, {
    variables: { q, after, limit },
  });
  const ErrorProps = {
    reserchType: 'ByName'
  }
  // Loading Template
  if (loading) return <Loading />
  // Error Template
  if (error) return <ErrorNotFound {...ErrorProps} /> // TODO FIX

  // Success Template
  return (
    typeData === 'description' ? (
      <div className='grid-onlyElement'>
        {
          data.pokemons.edges.map(({ cursor, node }: PokemonEdge) =>
            <div className="card-description" key={cursor}>
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
          )
        }
      </div>
    ) : (
        <div className='grid-onlyElement'>
          {
            data.pokemons.edges.map(({ cursor, node }: PokemonEdge) =>
              <ANTD.Card
                className="card"
                key={cursor}
                cover={
                  <img
                    alt="pokemon img"
                    src={node.sprites.old}
                    className="card-sprite card-sprite-fixed" />
                }
              >
                <span className="card-number">{node.id}</span>
                <ANTD.Card.Meta
                  title={node.name}
                >
                </ANTD.Card.Meta>
              </ANTD.Card>
            )
          }
        </div>
      )
  )
}

export default PokemonsByNumber;
