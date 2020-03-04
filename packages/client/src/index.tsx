import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import Main from './Main';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost'; // import gql from 'graphql-tag';
import * as serviceWorker from './serviceWorker';

// Client-Server linking
const client: any = new ApolloClient({
  uri: "http://localhost:4000/"
});

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

// Injecting Main component
ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your App to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
