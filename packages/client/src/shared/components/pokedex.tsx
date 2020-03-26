import React, { Component } from 'react';
import * as ANTD from 'antd';

import Pokemons from '../components/queries/pokemons';

// Types
type PokedexState = {
  pokemonSearchedByNumber: number,
}

class Pokedex extends Component<{}, PokedexState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      pokemonSearchedByNumber: 0
    }
  }
  formatID(value: number): string {
    return value < 10 ? `00${value}` : value < 100 ? `0${value}` : `${value}`;
  }
  formatReverse(value: string): number {
    let parsed = value.replace(/^00|^0/g, "");
    return parseInt(parsed);
  }
  setPokemonNumberValue(this: any, value: number): void {
    let parsed = value - 1 // For specific Number insert
    this.setState({
      pokemonSearchedByNumber: this.formatID(parsed)
    });
  };

  render() {
    return (
      <div className="pokedex-wrapper">
        --------- By Number -------
        <ANTD.InputNumber
          defaultValue={0}
          min={1}
          max={151}
          formatter={(value: any) => this.formatID(value)}
          parser={(value: any) => this.formatReverse(value)}
          onChange={(value: any) => this.setPokemonNumberValue(value)}
        />
        ~~~~~ Result ~~~~~~
        {this.state.pokemonSearchedByNumber ? <Pokemons after={this.state.pokemonSearchedByNumber} limit={1} /> : null}
      </div>
    );
  }
}

export default Pokedex;