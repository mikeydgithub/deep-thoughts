import React from 'react';

// Create Apollo Provider 
// ApolloProvider is a special type of react component that we'll use to provide data to all of the other compenents
// ApolloClient is a constructor function that will help initialize the connection to the GraphQL API Server.
// InMemoryCache enables the Apollo client instant to cache API response data so that we can perform requests more efficeicently.
// createHttpLink allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests.
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// retrieve the token from the localstorage every time we make a graphql request
import { setContext } from '@apollo/client/link/context';

// set up main URL routes using react router. react-router-dom statment.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';


import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// establish a link to the GraphQL server as /graphql
const httpLink = createHttpLink({
  uri: '/graphql',
});

// setContext create a middleware function that will retrieve the token for us and combine it with the existings httpLink
const authLink = setContext((_, {headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the connection the API endpoint.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

// ApolloProvider is used to pass the entire div into the client prop.
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />
          <div className='container'>
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/login'
                element={<Login />}
              />
              <Route 
                path='/signup'
                element={<Signup/>}
              />
              <Route
              // the ? in username is meant to be optional
                path='/profile/:username?'
                element={<Profile />}
              />
              <Route 
                path='/thought/:id'
                element={<SingleThought />}
              />
              <Route 
                path='*'
                element={<NoMatch />}
              />
            </Routes> 
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
