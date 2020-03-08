import React from 'react';
import logo from './logo.svg';
import * as ANTD from 'antd';
import './assets/styles/Main.scss';

import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost'; // import gql from 'graphql-tag';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';

import Pokemons from './shared/components/queries/pokemons';
import PokemonsByType from './shared/components/queries/pokemonsByType';

// Client-Server linking
const client: any = new ApolloClient({
  uri: "http://localhost:4000/"
});

let showPokemonByType = false;

// Testing graphql Query
client.query({
  query: gql`
              {
                pokemons(after: "149", limit: 1) {
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
            `
}).then((result: JSON) => {
  console.log('gql Query succeded: ');
  console.log(result);
}).catch((error: Error) => {
  console.error(error);
});


function sayHiTo(name: string): void {
  return console.log('Hello ' + name);
}

function callPokemonByType(): boolean {
  showPokemonByType = !showPokemonByType;
  console.log(showPokemonByType);
  return showPokemonByType
}

function Main() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <ANTD.Button
            type="primary"
            onClick={() => sayHiTo('Enzo')}
          >
            Greetings Dude
          </ANTD.Button>
          <ANTD.Button
            type="danger"
            onClick={() => callPokemonByType()}>
            Search By Type
          </ANTD.Button>
          <Pokemons q="Mew" />
          {/*showPokemonByType ? <PokemonsByType pokemonType="fire" /> : null*/}
          <PokemonsByType pokemonType="fire" />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default Main;
