import React, { Component } from 'react';
import './assets/styles/Main.scss';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from 'apollo-boost'; // import gql from 'graphql-tag';

import Header from './shared/components/header';
import Content from './shared/components/content';
import Pokedex from './shared/components/pokedex';
import Footer from './shared/components/footer';

// Types
type MainState = {
  triggerDashboard: boolean,
  triggerPokedex: boolean
}

// Client-Server linking
const client: any = new ApolloClient({
  uri: "http://localhost:4000/"
});

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

class Main extends Component<{}, MainState> {
  constructor(props: MainState) {
    super(props);
    this.state = {
      triggerDashboard: true,
      triggerPokedex: false,
    };
  }

  getState() {
    console.log(this.state);
  }
  callDashboard = (): void => {
    this.setState({
      triggerDashboard: true,
      triggerPokedex: false
    });
  }
  callPokedex = (): void => {
    this.setState({
      triggerDashboard: false,
      triggerPokedex: true
    });
  }

  render() {
    const HeaderProps = {
      callDashboard: this.callDashboard,
      callPokedex: this.callPokedex,
    }

    return (
      <ApolloProvider client={client}>
        <div className="app-content">
          <Header {...HeaderProps} />
          <div className="app-wrapper">
            {this.state.triggerDashboard ? <Content /> : null}
            {this.state.triggerPokedex ? <Pokedex /> : null}
          </div>
          <Footer />
        </div>
      </ApolloProvider>
    );
  }
}

export default Main;
