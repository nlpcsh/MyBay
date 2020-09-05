'use strict';

const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        index: true,
        unique: true,
        maxlength: 50,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    googleId: String,
    firstName: {
        type: String,
        trim: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        maxlength: 50,
        trim: true
    },
    info: {
        type: String,
        maxlength: 200
    },
    whishList: Array,
    image: {
        data: Buffer, 
        contentType: String 
    },
    orders: Array,
    created: {
        type : Date,
        default: Date.now
    }
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = new mongoose.model('User', userSchema);
