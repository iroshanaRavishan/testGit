//establishing the connection to the database
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CrudDB', (err) => {
    if(!err){
        console.log('MongoDB connection was Successful.!');
    }else{
        console.log('Error while connecting MongoDB : '+ JSON.stringify(err,undefined, 2));
    }
});

module.exports = mongoose;