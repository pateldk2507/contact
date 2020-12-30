//import library
const mongoose  = require('mongoose');

//connnect to the database
mongoose.connect("mongodb+srv://pateldk2507:WaHp8luLkhO4lEP9@cluster0.j88h2.mongodb.net/contact?retryWrites=true&w=majority",{ useNewUrlParser: true });

//acquire the connection to the check if it is successful
var db = mongoose.connection;

//Error 
db.on('error', console.error.bind(console,'Error connecting to the database'));

//Up and running print the relavent message
db.once('open',function(){
    console.log("Succesfully connected to the Database");
});



