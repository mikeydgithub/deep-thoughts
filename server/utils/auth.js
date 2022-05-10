// json web token
const jwt = require('jsonwebtoken');

// the secret merely enables the server to verify whether it recognizes this token.
const secret = 'mysecretssshhhhh';
const expiration = '2h';

module.exports = {
    // signtoken function expects a user object and will add that users username, email, and id properties to the token
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
    authMiddleware: function ({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // seperate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
            token = token
            .split('')
            .pop()
            .trim();
        }

        // if no token return request object as is
        if (!token) {
            return req;
        }

        try {
            // decode and attach user data to request object
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        // return updated request object
        return req;
    }
}