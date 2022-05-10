// import the gql tagged template function
// gql is an advanced use of template literals
const { gql } = require('apollo-server-express');

// create our typeDefinitions
// api access through 2 ways. Querys and Mutations.
// declare a query and name it
// graphQL has built in data types known as scalars
// the "!" after the query parameter to be carried out. The data must exist.
const typeDefs = gql`
    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
    }

    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
    }

    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        thoughts: [Thought]
        friends: [User]
    }

    type Query {
        users: [User]
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    }
`;

// export the typeDefinitions
module.exports = typeDefs;