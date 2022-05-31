// Fawez TEKA 
//     https://www.linkedin.com/in/fawez-teka/
//     https://github.com/TekaFawez
//    Copyright © Fawez TEKA . All rights reserved.

function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') { //UnauthorizedError: name of error in Backend
        // jwt authentication error
        return res.status(401).json({ message: "The user is not authorized" })
    }

    if (err.name === 'ValidationError') {
        //  validation error
        return res.status(401).json({ message: err })
    }

    // default to 500 server error
    return res.status(500).json(err);
}

module.exports = errorHandler;