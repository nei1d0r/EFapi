const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//create schema and model
const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required : [true, 'First Name field is required']
    },
    lastName: {
        type: String,
        required : [true, 'last name field is required']
    },
    notes: {
        type: String, max:1000
    }
});

// define model
const Customer = mongoose.model('customer', CustomerSchema); // mongoose pluralises this customer=>customers for collection!

//export schema
module.exports = Customer;