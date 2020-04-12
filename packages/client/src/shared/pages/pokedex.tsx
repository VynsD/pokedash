import React, { Component, useState } from 'react';
import * as ANTD from 'antd';
import PokemonsByNumber from '../queries/pokemonsByNumber';

// Types
type PokedexState = {
  pokemonSearchedByNumber: string,
}
type LeftSidePropsType = {
  formatID: (value: number) => string;
  formatReverse: (value: string) => number;
  onChange: (value: number) => void;
  pokemonSearchedByNumber: string;
}
type RightSidePropsType = {
  pokemonSearchedByNumber: string;
}

function LeftSide(Props: LeftSidePropsType) {
  // Hooks
  const [leftSideState] = useState(Props);

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
            {Props.pokemonSearchedByNumber ? <PokemonsByNumber after={Props.pokemonSearchedByNumber} limit={1} typeData="image" /> : null}
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
              <ANTD.InputNumber
                defaultValue={0}
                min={0}
                max={151}
                formatter={(value) => leftSideState.formatID(Number(value))}
                parser={(value) => leftSideState.formatReverse(`${value}`)}
                onChange={(value) => leftSideState.onChange(Number(value))}
              />
            </div>
          </div>
          <div className="left-pannel_btnSection--cross"></div>
        </div>
      </div>
      <div className="left-hinge"></div>
    </div>
  )
}

function RightSide(Props: RightSidePropsType) {
  // Hooks
  const [rightPannelState, setRightPannelState] = useState('right-wrapper--open');
  function changePannelState(): void {
    rightPannelState === 'right-wrapper--open' ? (
      setRightPannelState('right-wrapper--close')
    ) : (
        setRightPannelState('right-wrapper--open')
      );
  }
  // Const
  let btns: Array<{ name: string }> = new Array(10).fill({ name: 'singleBtn' });

  return (
    <div
      className={'right-wrapper ' + rightPannelState}
      onClick={() => changePannelState()}
    >
      <div className="right-header">
        <div className="right-header--curve"></div>
      </div>
      <div className="right-pannel">
        <div className="right-pannel_rotated right-pannel_rotated--arrow"></div>
        <div className="right-pannel_rotated right-pannel_rotated--bar"></div>
        <div className="right-pannel_screen">
          {Props.pokemonSearchedByNumber ? <PokemonsByNumber after={Props.pokemonSearchedByNumber} limit={1} typeData="description" /> : null}
        </div>
        <div className="right-pannel_multiBtns">
          {
            btns.map((el, i) => {
              return <span key={i} className={el.name}></span>
            })
          }
        </div>
        <div className="right-pannel_midBtns">
          <div className="right-pannel_midBtns--left">
            <div className="whiteBtn"></div>
            <div className="whiteBtn"></div>
          </div>
          <div className="right-pannel_midBtns--right-upper">
            <div className="blackBtn-slim"></div>
            <div className="blackBtn-slim"></div>
          </div>
          <div className="right-pannel_midBtns--right-lower">
            <div className="led-yellow"></div>
          </div>
        </div>
        <div className="right-pannel_lowBtns">
          <div className="right-pannel_lowBtns--left">
            <div className="blackBtn"></div>
            <div className="blackBtn"></div>
          </div>
          <div className="right-pannel_lowBtns--right">
            <div className="blackBtn"></div>
            <div className="blackBtn"></div>
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
      pokemonSearchedByNumber: ""
    }
  }
  formatID(value: number): string {
    return value < 10 ? `00${value}` : value < 100 ? `0${value}` : `${value}`;
  }
  formatReverse(value: string): number {
    let parsed = value.replace(/^00|^0/g, "");
    return parseInt(parsed);
  }
  setPokemonNumberValue(value: number): void {
    // Get the exact number insert and format for query prupose
    let parsed = this.formatID(value - 1)
    this.setState({
      pokemonSearchedByNumber: parsed
    });
  };

  render() {
    const LeftSideProps = {
      formatID: this.formatID,
      formatReverse: this.formatReverse,
      onChange: (value: number) => {
        this.setPokemonNumberValue(value);
      },
      pokemonSearchedByNumber: this.state.pokemonSearchedByNumber
    }
    const RightSideProps = {
      pokemonSearchedByNumber: this.state.pokemonSearchedByNumber
    }

    return (
      <div className="pokedex">
        <div className="pokedex-wrapper">
          <LeftSide {...LeftSideProps} />
          <RightSide {...RightSideProps} />
        </div>
      </div>
    );
  }
}

export default Pokedex;
