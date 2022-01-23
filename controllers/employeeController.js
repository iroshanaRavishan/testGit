const { request } = require('express');
const express = require('express');
var router = express.Router();//getting router function from express
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');

//localhost:3000/employees/list
//READ**********
// return all the data inside the database
router.get('/',(req, res) => {
    Employee.find((err, docs) => {
        if(!err){
            res.send(docs);
        }else{
            console.log('Error in Retriving Employee : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//READ**********
//taking the values according to the given Id
router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given Id : ${req.params.id}`);
    }
    Employee.findById(req.params.id,(err, docs) =>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Error in Retriving Employee : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// INSERT*******
//this router is used to save the data to a the relavant collection
router.post('/',(req, res) => {
    var emp = new Employee({

        name : req.body.name,
        position : req.body.position,
        office : req.body.office,
        salary : req.body.salary

    });
    emp.save((err, docs) => {
        if(!err){
            res.send(docs);
        }else{
            console.log('Error insaving Employee' + JSON.stringify(err, undefined, 2));
        }
    });
});


//UPDATE********
//this is used for updating the data within the database
router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`Sorry, cant find that : ${req.params.id}`)
    }

    var emp = {
        
        name : req.body.name,
        position : req.body.position,
        office : req.body.office,
        salary : req.body.salary
    };

    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, {new: true}, (err, docs) =>{
        if(!err){
            res.send(docs);
        }else{
            console.log('Error found while updating : ' + JSON.stringify(err, undefined, 2));
        }
    });
});


//DELETE*********
//this is used to delete the data in the collection in mongoDB
router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`Sorry cant find that id : ${req.params.id}`);
    }

    Employee.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.send(docs);
        }else{
            console.log('Error found while updating : ' + JSON.stringify(err, undefined, 2));
        }
    });
})

module.exports = router;