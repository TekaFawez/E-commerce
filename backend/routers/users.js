// Fawez TEKA 
//     https://www.linkedin.com/in/fawez-teka/
//     https://github.com/TekaFawez
//    Copyright © Fawez TEKA . All rights reserved.


const express = require('express');
const router = express.Router();
const { User } = require('../models/user')
const bcryptjs = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken')

router.get(`/`, async(req, res) => {

    const userList = await User.find() //.select('name phone email');
    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.send(userList);
})


router.get(`/:id`, async(req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
        res.status(500).json({ success: false })
    }
    res.send(user);
})




router.post('/', async(req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if (!user)
        return res.status(400).send('the user cannot be created!')

    res.send(user);
})

router.put('/:id', async(req, res) => {

    const userExist = await User.findById(req.params.id)
    let newPassword;
    if (req.params.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash
    }

    const user = await User.findByIdAndUpdate(
        req.params.id, {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        }, { new: true }
    )
    if (!user) return res.status(404).send('the user can not be updated');
    res.send(user);
})


router.post('/login', async(req, res) => {
    const user = await User.findOne({ email: req.body.email }) //user mawjoud wala
    const secret = process.env.secret;
    if (!user) {
        return res.status(400).send('the User not found!')
    }
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        //decode PasswordHash  and compard with Password enter
        const token = jwt.sign({
                userId: user.id,
                isAdmin: user.isAdmin

            },
            secret //pass to creat your token
            , { expiresIn: '1d' } //kol nhar token yetbadel lel protection 
        )
        res.status(200).send({ user: user.email, token: token })
    } else {
        res.status(404).send('password Wrong');

    }




})
router.post('/register', async(req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if (!user)
        return res.status(400).send('the user cannot be created!')

    res.send(user);
})

router.get(`/get/count`, async(req, res) => {
    const userCount = await User.countDocuments()

    if (!userCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        userCount: userCount
    });
})
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        if (user) {
            return res.status(200).json({ success: true, message: 'the user is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "user not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})

//          a3mel localhost:3000/api/v1/users/register

// {

//     "name": "hadhemi",
//     "email": "hadhemi@gmmail.com",
//     "password": "hadhemi123",
//     "phone": "55027104",
//     "isAdmin": true,
//     "street": "4772",
//     "apartment": "a5",
//     "zip": "7789",
//     "city": "krrr",
//     "country": "kr"

// }
// mbaad localhost:3000/api/v1/users/login bech takhou Token 
// aaml copier coller lel token fil postMan => authorization => type Bearer Token 
// wa9tha tnajem taaml kol chay post Get Put Delete ama lazem tkoun isAdmin true


module.exports = router;