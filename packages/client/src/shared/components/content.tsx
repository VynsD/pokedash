import React, { Component } from 'react';
import * as ANTD from 'antd';

import Pokemons from '../components/queries/pokemons';
import PokemonsByType from '../components/queries/pokemonsByType';

// Types
type ContnetState = {
  typesDrawer: boolean
  searchBarSelected: string
  drawerUnfold: string
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
      typesDrawer: false,
      searchBarSelected: "search-bar",
      drawerUnfold: "drawer-radio drawer-radio--initial",
      pokemonSearchedByName: "",
      pokemonSearchedByType: "",
    }
  }
  setPokemonNameValue(this: any, value: string): void {
    this.setState({
      pokemonSearchedByName: value,
      pokemonSearchedByType: ""
    });
  };
  setPokemonTypeValue(this: any, value: string): void {
    this.setState({
      pokemonSearchedByName: "",
      pokemonSearchedByType: value
    });
  };
  openSearch = (): void => {
    this.setState({
      searchBarSelected: "search-bar--open"
    });
  };
  closeSearch = (): void => {
    this.setState({
      searchBarSelected: "search-bar"
    });
  };
  controllDrawer = (): void => {
    (this.state.drawerUnfold === "drawer-radio drawer-radio--initial") ||
      (this.state.drawerUnfold === "drawer-radio drawer-radio--fold") ? (
        this.setState({
          drawerUnfold: "drawer-radio drawer-radio--unfold"
        })
      ) : (
        this.setState({
          drawerUnfold: "drawer-radio drawer-radio--fold"
        })
      );
  };
  typeSetter = (e: any): void => {
    this.setPokemonTypeValue(e.target.value);
  };

  render() {
    return (
      <main className="main-wrapper">
        <div className="main-wrapper_header">
          <div className="main-wrapper_header--input">
            <Search
              className={this.state.searchBarSelected}
              placeholder="Search By Name"
              onFocus={() => this.openSearch()}
              onBlur={() => this.closeSearch()}
              onSearch={(value: string) => this.setPokemonNameValue(value)}
              type="text"
              enterButton
            />
          </div>
          <div className="main-wrapper_header--drawer">
            <div className="drawer-handle">
              <ANTD.Button
                className="drawer-handle--trigger"
                type="primary"
                onClick={() => this.controllDrawer()}
                ghost
              >
                {(this.state.drawerUnfold === "drawer-radio drawer-radio--initial" ||
                  this.state.drawerUnfold === "drawer-radio drawer-radio--fold") ? 'Search By Type' : 'Close Drawer'}
              </ANTD.Button>
            </div>
            <div className={this.state.drawerUnfold}>
              {
                <Radio.Group
                  className="radio-wrapper"
                  buttonStyle="solid"
                  onChange={this.typeSetter}
                >
                  <Radio.Button className="radio--bug" value="Bug">Bug</Radio.Button>
                  <Radio.Button className="radio--dark" value="Dark">Dark</Radio.Button>
                  <Radio.Button className="radio--dragon" value="Dragon">Dragon</Radio.Button>
                  <Radio.Button className="radio--electric" value="Electric">Electric</Radio.Button>
                  <Radio.Button className="radio--fairy" value="Fairy">Fairy</Radio.Button>
                  <Radio.Button className="radio--fighting" value="Fighting">Fighting</Radio.Button>
                  <Radio.Button className="radio--fire" value="Fire">Fire</Radio.Button>
                  <Radio.Button className="radio--flying" value="Flying">Flying</Radio.Button>
                  <Radio.Button className="radio--ghost" value="Ghost">Ghost</Radio.Button>
                  <Radio.Button className="radio--grass" value="Grass">Grass</Radio.Button>
                  <Radio.Button className="radio--ground" value="Ground">Ground</Radio.Button>
                  <Radio.Button className="radio--ice" value="Ice">Ice</Radio.Button>
                  <Radio.Button className="radio--normal" value="Normal">Normal</Radio.Button>
                  <Radio.Button className="radio--poison" value="Poison">Poison</Radio.Button>
                  <Radio.Button className="radio--psychic" value="Psychic">Psychic</Radio.Button>
                  <Radio.Button className="radio--rock" value="Rock">Rock</Radio.Button>
                  <Radio.Button className="radio--steel" value="Steel">Steel</Radio.Button>
                  <Radio.Button className="radio--water" value="Water">Water</Radio.Button>
                </Radio.Group>
              }
            </div>
          </div>
        </div>
        <div className="main-wrapper_results" >
          {/* Results Placeholder */}
          {(!this.state.pokemonSearchedByName && !this.state.pokemonSearchedByType) ? (
            <div className="grid-onlyElement">
              <h2 className="grid-onlyElement--text">Search for a Pokémon!</h2>
            </div>
          ) : null}
          {/* Result By Name */}
          {this.state.pokemonSearchedByName ? <Pokemons q={this.state.pokemonSearchedByName} /> : null}
          {/* Result By Type */}
          {this.state.pokemonSearchedByType ? <PokemonsByType pokemonType={this.state.pokemonSearchedByType} /> : null}
        </div>
      </main>
    );
  }
}

export default Content;