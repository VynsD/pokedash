import React, { Component } from 'react';
import logo from './logo.svg';
import * as ANTD from 'antd';
import './assets/styles/Main.scss';

import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost'; // import gql from 'graphql-tag';
import { ApolloProvider } from '@apollo/react-hooks';

import Pokemons from './shared/components/queries/pokemons';
import PokemonsByType from './shared/components/queries/pokemonsByType';
import { stringify } from 'querystring';

// Client-Server linking
const client: any = new ApolloClient({
  uri: "http://localhost:4000/"
});

// Types
type MainState = {
  pokemonSearchedByName: string,
  pokemonSearchedByNumber: number,
  pokemonSearchedByType: string | [string]
}
// Const
const { Search } = ANTD.Input;
// Vars
let showPokemonByType = false; // TODO Still Needed?

// Testing graphql Query Pokemon
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
};

function callPokemonByType(): boolean {
  showPokemonByType = !showPokemonByType;
  console.log(showPokemonByType);
  return showPokemonByType
};

function formatID(value: number): string {
  return value < 10 ? `00${value}` : value < 100 ? `0${value}` : `${value}`;
}


class Main extends Component<{}, MainState> {
  constructor(props: MainState) {
    super(props);
    this.state = {
      pokemonSearchedByName: "",
      pokemonSearchedByNumber: 0,
      pokemonSearchedByType: ""
    };
  }

  setPokemonNameValue(this: any, value: string): void {
    this.setState({
      pokemonSearchedByName: value
    });
  };
  setPokemonNumberValue(this: any, value: number): void {
    this.setState({
      pokemonSearchedByNumber: value - 1 // For specific Number insert
    });
  };
  setPokemonTypeValue(this: any, value: string | string[]): void {
    this.setState({
      pokemonSearchedByType: value
    });
  };

  checkIsArray(value: string): void {
    let stringParsed = value.split(' ');
    return this.setPokemonTypeValue(stringParsed.length < 0 ? value : stringParsed)
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />

            <ANTD.Button
              type="primary"
              onClick={() => sayHiTo('Enzo')}
            >
              Greetings Dude
            </ANTD.Button>
            <ANTD.Button
              type="danger"
              onClick={() => callPokemonByType()}
            >
              Search By Type test
            </ANTD.Button>


            <Search
              placeholder="Search By Name"
              onSearch={(value: string) => this.setPokemonNameValue(value)}
              type="text"
              enterButton
            />
            --------- By Name -------
            {this.state.pokemonSearchedByName ? <Pokemons q={this.state.pokemonSearchedByName} /> : null}

            {/*<ANTD.InputNumber
              defaultValue={0}
              min={1}
              max={150}
              formatter={value => formatID(value)}
              onChange={(value: number) => this.setPokemonNumberValue(value)}
            />*/}
            --------- By Number -------
            {/*showPokemonByType ? <PokemonsByType pokemonType="fire" /> : null*/}

            {/*onSearch={(value: string) => this.checkIsArray(value)}*/}
            <Search
              placeholder="Search By Type"
              onSearch={(value: string) => this.setPokemonTypeValue(value)}
              type="text"
              enterButton
            />
            --------- By Type -------
            {this.state.pokemonSearchedByType ? <PokemonsByType pokemonType={this.state.pokemonSearchedByType} /> : null}
            <PokemonsByType pokemonType={this.state.pokemonSearchedByType} />

            --------- Querie Example -------
          </header>
        </div>
      </ApolloProvider>
    );
  }
}

export default Main;
