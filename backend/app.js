// Fawez TEKA 
//     https://www.linkedin.com/in/fawez-teka/
//     https://github.com/TekaFawez
//    Copyright © Fawez TEKA . All rights reserved.
const express = require('express');
const morgan = require('morgan'); //log http requiset
const mongoose = require('mongoose');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handelr')


const app = express();





//npm i cors

const cors = require('cors');
//hedha lazem taamlou bech maytblokech cors !!!!!
app.use(cors());
app.options('*', cors());



require('dotenv/config')
const api = process.env.API_URL




const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');



//middeleware

app.use(express.json()); //replace body-parser
app.use(morgan('tiny')); //vue in the terminal http request from front end
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use(errorHandler);






//routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/orders`, ordersRouter)










mongoose.connect("mongodb://localhost:27017/EshopeDB", { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to db!'));

app.listen(3000, () => {

    console.log("the server is running http://localhost:3000")
})