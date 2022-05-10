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
        me: User
        users: [User]
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    }

    type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
    }

    type Auth {
        token: ID!
        user: User
    }
`;

// export the typeDefinitions
module.exports = typeDefs;