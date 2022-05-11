import React from 'react';

// Create Apollo Provider 
// ApolloProvider is a special type of react component that we'll use to provide data to all of the other compenents
// ApolloClient is a constructor function that will help initialize the connection to the GraphQL API Server.
// InMemoryCache enables the Apollo client instant to cache API response data so that we can perform requests more efficeicently.
// createHttpLink allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests.
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';



import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// establish a link to the GraphQL server as /graphql
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Create the connection the API endpoint.
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

// ApolloProvider is used to pass the entire div into the client prop.
function App() {
  return (
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
