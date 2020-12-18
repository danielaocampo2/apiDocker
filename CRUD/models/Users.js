const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema for Business
let Users = new Schema({
    names: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    cc: {
        type: Number,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: "1"
    }
}, {
    collection: 'users'
});
module.exports = mongoose.model('Users', Users);