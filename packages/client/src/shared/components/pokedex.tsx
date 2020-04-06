import React, { Component } from 'react';
import * as ANTD from 'antd';

import Pokemons from '../components/queries/pokemons';

// Types
type PokedexState = {
  pokemonSearchedByNumber: number,
}

function LeftSide(Props: any) {
  return (
    <div className="left-wrapper">
      <div className="left-header">
        <div className="left-header_left--curve">
          <div className="left-header_left--led-blue"></div>
          <div className="left-header_left--led-red"></div>
          <div className="left-header_left--led-yellow"></div>
          <div className="left-header_left--led-green"></div>
        </div>
        <div className="left-header_middle--curve"></div>
        <div className="left-header_right--curve"></div>
      </div>
      <div className="left-pannel">
        <div className="left-pannel_frame">
          <div className="left-pannel_red-dot left-pannel_red-dot--upper-left"></div>
          <div className="left-pannel_red-dot left-pannel_red-dot--upper-right"></div>
          <div className="left-pannel_screen">
            {/* METTERE pokemons query result */}
          </div>
          <div className="left-pannel_red-dot left-pannel_red-dot--lower"></div>
          <div className="left-pannel_grill"></div>
        </div>
        <div className="left-pannel_btnSection">
          <div className="left-pannel_btnSection--circle"></div>
          <div className="left-pannel_btnSection--area">
            <div className="left-pannel_btnSection--area-btnRed"></div>
            <div className="left-pannel_btnSection--area-btnBlue"></div>
            <div className="left-pannel_btnSection--area-lowScreen">
              {/* METTERE ANTD input number */}
            </div>
          </div>
          <div className="left-pannel_btnSection--cross"></div>
        </div>
      </div>
      <div className="left-hinge"></div>
    </div>
  )
}

function RightSide(Props: any) {
  return (
    <div className="right-wrapper">
      <div className="right-header">
        ::after
        ::before
      </div>
      <div className="right-pannel">

        <div className="right-screenDescription">
        </div>

        <div className="right-multiBtns">
        </div>

        <div className="right-midBtns">
          <div className="midBtn-left">
            <div className="btnWhite">btn1</div>
            <div className="btnWhite">btn2</div>
          </div>
          <div className="midBtn-right">
            <div className="btnBlack">btn1</div>
            <div className="btnBlack">btn2</div>
            <div className="btnOrange">btnCirlce</div>
          </div>
        </div>

        <div className="right-lowBtns">
          <div className="left">
            <div className="btnBlack">btn1</div>
            <div className="btnBlack">btn2</div>
          </div>
          <div className="right">
            <div className="btnBlack">btn3</div>
            <div className="btnBlack">btn4</div>
          </div>
        </div>
      </div>

    </div>
  )
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
    const LeftSideProps = {
      formatID: this.formatID,
      formatReverse: this.formatReverse,
      setPokemonNumberValue: this.setPokemonNumberValue
    }

    return (
      <div className="FAKEpokedex-wrapper">
        --------- By Number -------
        <ANTD.InputNumber
          defaultValue={0}
          min={0}
          max={151}
          formatter={(value: any) => this.formatID(value)}
          parser={(value: any) => this.formatReverse(value)}
          onChange={(value: any) => this.setPokemonNumberValue(value)}
        />
        ~~~~~ Result ~~~~~~
        {this.state.pokemonSearchedByNumber ? <Pokemons after={this.state.pokemonSearchedByNumber} limit={1} /> : null}

        <div className="pokedex-wrapper">
          <LeftSide {...LeftSideProps} />
          <RightSide />
        </div>

      </div>
    );
  }
}

export default Pokedex;
