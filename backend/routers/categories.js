// Fawez TEKA 
//     https://www.linkedin.com/in/fawez-teka/
//     https://github.com/TekaFawez
//    Copyright © Fawez TEKA . All rights reserved.

const express = require('express');
const router = express.Router();
const { Category } = require('../models/category');

router.get(`/`, async(req, res) => {

    const categoryList = await Category.find();
    if (!categoryList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(categoryList);
})


router.get(`/:id`, async(req, res) => {

    const categoryList = await Category.findById(req.params.id);
    if (!categoryList) {
        res.status(500).json({ message: 'The category with the given ID was not found.' })
    }
    res.status(200).send(categoryList);
})





router.post('/', async(req, res) => {
    let category = new Category({
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon

    })
    category = await category.save();
    if (!category)
        return res.status(404).send('the category can not be created');
    res.send(category);
})



router.put('/:id', async(req, res) => {

    const category = await Category.findByIdAndUpdate(
        req.params.id, {
            name: req.body.name,
            icon: req.body.icon || category.icon,
            color: req.body.color,
        }, { new: true }
    )
    if (!category) return res.status(404).send('the category can not be updated');
    res.send(category);
})






router.delete('/:id', async(req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({ success: true, message: 'the category is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "category not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})




module.exports = router;