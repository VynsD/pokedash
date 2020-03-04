import React from 'react';
import logo from './logo.svg';
import * as ANTD from 'antd';
import './assets/styles/Main.scss';

function sayHiTo(name: string): void {
  return console.log('Hello ' + name);
}

function Main() {
  return (
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
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Main;
