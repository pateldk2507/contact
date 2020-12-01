const express = require('express');
const path = require('path');
const port = 8000;
var $ = require('jquery');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


const ContactList = [
    {
        name: "DhavalPatel",
        phone : 8200004258,
    },
    {
        name : "Akash Patel",
        phone : 9974398232
    },
    {
        name : "Jigar Patel",
        phone  : 9714233673
    }
];

var phone;

app.get('/',function(req,res){
    return res.render('home',{
        type : "getContact",
        title: "Contacts",
        contact_list : ContactList,
    });
});

app.post('/create-contact',function(req,res){

    ContactList.push({
        name: req.body.name,
        phone: req.body.phone,
    });

    res.redirect('/');
    
});


app.get('/delete-contact/:phone',function(req,res){

    let phone =req.params.phone;
    
    let contactIndex = ContactList.findIndex(contact => contact.phone == phone);
    
    if(contactIndex != -1){
        ContactList.splice(contactIndex,1);
    }

    res.redirect('back');
});


app.get('/get-contact-details/:phone',function(req,res){

     phone =req.params.phone;
    
    let contactIndex = ContactList.findIndex(contact => contact.phone == phone);
    
    if(contactIndex != -1){
        
        console.log(ContactList[contactIndex]);


        return res.render('home',{
            type : "updateContact",
            updateContact : ContactList[contactIndex],
            contact_list : ContactList,
        });
    }

   
});


app.post('/update-contact',function(req,res){

    console.log(phone,req.body.name);
    let contactIndex = ContactList.findIndex(contact => contact.phone == phone);
    
    if(contactIndex != -1){
        
        ContactList[contactIndex].name= req.body.name;
        return res.render('home',{
            type : "getContact",
            title: "Contacts",
            contact_list : ContactList,
        });
    }

   
});










app.listen(port,function(err){

if(err){
    console.log("Server error: ",err);
}

console.log("Server running on port: ",port);

});