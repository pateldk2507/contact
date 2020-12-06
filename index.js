const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/Contact');

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

    Contact.find({}, function(err,contacts){

        if(err){
            console.log("Error",err);
            return;
        }

        return res.render('home',{
            type : "getContact",
            title: "Contacts",
            contact_list : contacts,
        });

    })

    
});

app.post('/create-contact',function(req,res){

    // ContactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone,
    // });

    Contact.create({
        name: req.body.name,
        phone: req.body.phone,
    }, function(err, newContact){

        if(err){
            console.log("Error in create contact");
            return;
        }

        console.log("********", newContact);
        return res.redirect('back');
    })


});


app.get('/delete-contact/:id',function(req,res){

    let id =req.params.id;
    
    // let contactIndex = ContactList.findIndex(contact => contact.phone == phone);
    
    // if(contactIndex != -1){
    //     ContactList.splice(contactIndex,1);
    // }

    Contact.findByIdAndDelete(id, function(err){
        console.log("error while deleting data!",err);
        return;
    })

    return res.redirect('back');
});


app.get('/get-contact-details/:id',function(req,res){

     id =req.params.id;
    
    // let contactIndex = ContactList.findIndex(contact => contact.phone == phone);
    
    // if(contactIndex != -1){
        
    //     console.log(ContactList[contactIndex]);
    // }


    
        Contact.find({'_id':id}, function(err,contacts){

            if(err){
                console.log("Error",err);
                return;
            }
            
            console.log("Find ID", contacts);

            return res.render('home',{
                type : "updateContact",
                update_list : contacts,
            });
    })

    
   
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