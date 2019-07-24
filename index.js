// import express module ( library )
const express = require ('express');
//Import the mongoose module
var mongoose = require('mongoose');
// we call the express function ( invoke )
const app = express();
//Set up default mongoose connection
// Database name --> Capien
var mongoDB = 'mongodb://127.0.0.1/capien';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Define a schema
var Schema = mongoose.Schema;

var capien = new Schema({
    name: String,
    img: String,
    status: String
});

var capienModel = mongoose.model('Capien', capien);


app.post('/', (req, res, next) => {
    const name = req.params.name;
    const img = req.params.img;
    const status = req.params.status;

    capienModel = mongoose.model('Capien', capien);
    capienModel.name = name;
    capienModel.img = img;
    capienModel.status = status;

    if (mongoose.get(capienModel) !== -1) {
        mongoose.put(capienModel).subscribe((res) => {
            res.send('Data has been inserted!')
        }).catch((err) => {
            res.send(err.message);
        });
    } else {
        mongoose.update(capienModel).subscribe( (res) => {
            res.send('updated!')
        }).catch( (err) => {
            res.send(err.message);
        });
    }
    res.end();
});

// server api
//127.0.0.1/gym/1
app.get('/', (req, res, next) => {
    res.send(db.get(req.params.id));
});
//


app.listen(3000);
console.log('Server is running on http://localhost:3000');
