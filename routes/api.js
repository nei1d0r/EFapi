//import express module
const express = require('express');
//setup express router
const router = express.Router();
//import Customer model
const Customer = require('../models/customer');

//project route for redirects/sendFiles
const root = {root: './public'};

//get a list of customers from the db
router.get('/customers', (req, res, next) => {
    Customer.find({}).then(function (customers) {    
        res.send(customers);    
    }).catch(next);    
});


router.get('/customer', (req, res, next) => {
    if(req.query.id){
        Customer.findById({_id: req.query.id}).then(function(customer) {
        res.render('customer.ejs', {customer : customer});       
        console.log(customer);
    }).catch(next);
    } else {
        res.sendFile('index.html', root);
    };    
});

/*
router.get('/customer', (req, res, next) => {
    req.query.id ? res.send(console.log(req.query.id)) : res.sendFile('/views/customer.html', root);       
});
*/

//add a customer to the db
// create new instance and save to db
router.post('/customers', function(req,res,next){
    Customer.create(req.body).then(function(customer){
        res.send(customer);
    }).catch(next);
});

//update customer in the db
router.put('/customers/:id', function(req,res,next){
    Customer.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Customer.findOne({_id: req.params.id}).then(function(customer){
            res.send(customer);
        }).catch(next);
    });
});

//delete customer from the db
router.delete('/customers/:id', function(req,res,next){
    Customer.findByIdAndRemove({_id:req.params.id}).then(function(customer){
        res.send(customer);
    });
});

router.get('*', function(req, res){
    res.status(404).send('what???');
});

module.exports = router;