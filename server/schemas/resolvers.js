// import models
const { User, Thought } = require("../models");

const resolvers = {
    Query: {
        // parent here is used a placeholder so we can get access to the username.
        thoughts: async (parent, { username }) => {
            // using ternary operators to check if username exists. if it does we set params to an object with username key set to that value.
            // if it does not we simply return an empty object.
            const params = username ? { username } : {};
            // .find() method on Thought model. .sort() method to return in descending order
            // dont need to worry about error handling as Apollo can infer if something goes wrong.
            // pass params object into our find method 
            return Thought.find(params).sort({ createdAt: -1 });
        },
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
    }
};

// export resolvers
module.exports = resolvers;