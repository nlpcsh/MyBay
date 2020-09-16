'use strict';

const findOrCreate = require('mongoose-findorcreate');
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        maxlength: 50
    },
    model: {
        type: String,
        maxlength: 50
    },
    price: {
        type: Number,
        min: 0
    },
    image: {
        type: String,
        maxlength: 250
    },
    added: {
        type : Date,
        default: Date.now
    },
    description: {
        type: String,
        maxlength: 200
    },
    available: {
        type: Boolean,
        default: true
    }
});

// image: {
//     data: Buffer, 
//     contentType: String 
// },

itemSchema.plugin(findOrCreate);

module.exports = new mongoose.model('Item', itemSchema);