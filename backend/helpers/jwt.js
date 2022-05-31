// Fawez TEKA 
//     https://www.linkedin.com/in/fawez-teka/
//     https://github.com/TekaFawez
//    Copyright © Fawez TEKA . All rights reserved.

const expressJwt = require('express-jwt')

//protection
//bech naarfou user Auth wala leee bech yetstaaml API
function authJwt() {
    const secret = process.env.secret
    return expressJwt({
        secret, //compare with the secret 
        algorithms: ['HS256'], //algo men library JWT
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },

            '/api/v1/users/login',

            '/api/v1/users/register'
            // { url: /(.*)/ },

        ]

    })
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true)
    }

    done();
};
module.exports = authJwt;