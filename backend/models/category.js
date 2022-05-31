// Fawez TEKA 
//     https://www.linkedin.com/in/fawez-teka/
//     https://github.com/TekaFawez
//    Copyright © Fawez TEKA . All rights reserved.


const mongoose = require('mongoose');



const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    color: {
        type: String,
    }

})
categorySchema.virtual('id').get(function() {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});


exports.Category = mongoose.model('Category', categorySchema);