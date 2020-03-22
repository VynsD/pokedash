import React, { Component } from 'react';
import logo from './assets/img/logo.svg';
import * as ANTD from 'antd';
import './assets/styles/Main.scss';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'; // import gql from 'graphql-tag';

import Header from './shared/components/header';
import Content from './shared/components/content';
import Footer from './shared/components/footer';
import Pokemons from './shared/components/queries/pokemons';
import PokemonsByType from './shared/components/queries/pokemonsByType';

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
const { Radio } = ANTD;
// Vars

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

function formatID(value: number): string {
  return value < 10 ? `00${value}` : value < 100 ? `0${value}` : `${value}`;
}

function formatReverse(value: string): number {
  let parsed = value.replace(/^00|^0/g, "");
  return parseInt(parsed);
}

function checkIsArray(this: any, value: string): void {
  let stringParsed = value.split(' ');
  return this.setPokemonTypeValue(stringParsed.length < 0 ? value : stringParsed)
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

  getState() {
    console.log(this.state);
  }

  setPokemonNameValue(this: any, value: string): void {
    this.setState({
      pokemonSearchedByName: value
    });
  };
  setPokemonNumberValue(this: any, value: number): void {
    let parsed = value - 1 // For specific Number insert
    this.setState({
      pokemonSearchedByNumber: formatID(parsed)
    });
  };
  setPokemonTypeValue(this: any, value: string | string[]): void {
    console.log(value)
    this.setState({
      pokemonSearchedByType: value
    });
  };

  typeSetter = (e: any): void => {
    console.log(`radio ${e.target.value} checked`);
    this.setPokemonTypeValue(e.target.value);
    /* this.setState({
      pokemonSearchedByType: e.target.value
    }); */
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <Content />

          <div className="app-wrapper">

            --------- By Name -------
            <Search
              placeholder="Search By Name"
              onSearch={(value: string) => this.setPokemonNameValue(value)}
              type="text"
              enterButton
            />
            ~~~~~ Result ~~~~~~
            {this.state.pokemonSearchedByName ? <Pokemons q={this.state.pokemonSearchedByName} /> : null}

            --------- By Number -------
            <ANTD.InputNumber
              defaultValue={0}
              min={1}
              max={151}
              formatter={(value: any) => formatID(value)}
              parser={(value: any) => formatReverse(value)}
              onChange={(value: any) => this.setPokemonNumberValue(value)}
            />
            ~~~~~ Result ~~~~~~
            {this.state.pokemonSearchedByNumber ? <Pokemons after={this.state.pokemonSearchedByNumber} limit={1} /> : null}

            --------- By Type -------

            <Radio.Group buttonStyle="solid" onChange={this.typeSetter}>
              <Radio.Button className="radio-bug" value="Bug">Bug</Radio.Button>
              <Radio.Button className="radio-dark" value="Dark">Dark</Radio.Button>
              <Radio.Button className="radio-dragon" value="Dragon">Dragon</Radio.Button>
              <Radio.Button className="radio-electric" value="Electric">Electric</Radio.Button>
              <Radio.Button className="radio-fairy" value="Fairy">Fairy</Radio.Button>
              <Radio.Button className="radio-fighting" value="Fighting">Fighting</Radio.Button>
              <Radio.Button className="radio-fire" value="Fire">Fire</Radio.Button>
              <Radio.Button className="radio-flying" value="Flying">Flying</Radio.Button>
              <Radio.Button className="radio-ghost" value="Ghost">Ghost</Radio.Button>
              <Radio.Button className="radio-grass" value="Grass">Grass</Radio.Button>
              <Radio.Button className="radio-ground" value="Ground">Ground</Radio.Button>
              <Radio.Button className="radio-ice" value="Ice">Ice</Radio.Button>
              <Radio.Button className="radio-normal" value="Normal">Normal</Radio.Button>
              <Radio.Button className="radio-poison" value="Poison">Poison</Radio.Button>
              <Radio.Button className="radio-psychic" value="Psychic">Psychic</Radio.Button>
              <Radio.Button className="radio-rock" value="Rock">Rock</Radio.Button>
              <Radio.Button className="radio-steel" value="Steel">Steel</Radio.Button>
              <Radio.Button className="radio-water" value="Water">Water</Radio.Button>
            </Radio.Group>

            ~~~~~ Result ~~~~~~
            {this.state.pokemonSearchedByType ? <PokemonsByType pokemonType={this.state.pokemonSearchedByType} /> : null}

            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <Footer />
        </div>
      </ApolloProvider>
    );
  }
}

export default Main;
