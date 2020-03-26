import React, { Component } from 'react';
import * as ANTD from 'antd';

import Pokemons from '../components/queries/pokemons';
import PokemonsByType from '../components/queries/pokemonsByType';

// Types
type ContnetState = {
  pokemonSearchedByName: string
  pokemonSearchedByType: string
}
// Const
const { Search } = ANTD.Input;
const { Radio } = ANTD;
class Content extends Component<{}, ContnetState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      pokemonSearchedByName: "",
      pokemonSearchedByType: "",
    }
  }
  setPokemonNameValue(this: any, value: string): void {
    this.setState({
      pokemonSearchedByName: value
    });
  };
  setPokemonTypeValue(this: any, value: string): void {
    this.setState({
      pokemonSearchedByType: value
    });
  };
  typeSetter = (e: any): void => {
    this.setPokemonTypeValue(e.target.value);
  };

  render() {
    return (
      <main className="mainWrapper">
        --------- By Name -------
        <Search
          placeholder="Search By Name"
          onSearch={(value: string) => this.setPokemonNameValue(value)}
          type="text"
          enterButton
        />
            ~~~~~ Result ~~~~~~
        {this.state.pokemonSearchedByName ? <Pokemons q={this.state.pokemonSearchedByName} /> : null}

        --------- By Type -------
        <Radio.Group className="radio" buttonStyle="solid" onChange={this.typeSetter}>
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
        {this.state.pokemonSearchedByType ? (
          <div className="grid-wrapper">
            <PokemonsByType pokemonType={this.state.pokemonSearchedByType} />
          </div>
        ) : null}

      </main>
    );
  }
}

export default Content;