const express = require('express');
const path = require('path');
const port = 7000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//express. urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.
app.use(express.urlencoded());
app.use(express.static('assets'));


var contact_list = [
    {
        name:"Vanshika",
        phone_number: "12345"
    },
    {
        name:"Ritish",
        phone_number:"45678"
    },
    {
        name:"qwerty",
        phone_number:"34567"
    }
]

app.get('/', function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "My contacts",
            contactLists: contacts
        });
    }); 
});

app.get('/practice', function(req, res){
    return res.render('practice',{
        title: "I am flying"
    });
});

app.post('/create-contact',function(req, res){
    Contact.create({
        name: req.body.name,
        phone_number: req.body.phone_number
    }, function( err, newContact){
        if(err){
            console.log("error in creating the contact");
            return;
        }
        console.log("**********New Contact is created*********", newContact);
        return res.redirect('back');
    });
    // return res.redirect('back');
});


// For deleting a contact
app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    // get the query from the URL
    // let phone = req.query.phone_number;
    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if (err){
            console.log("Error in deleting an object from database");
            return;
        }
        return res.redirect('back');
    });

    // let contactIndex = contact_list.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contact_list.splice(contactIndex, 1);
    // }
    // return res.redirect('back');
});


app.listen(port, function(error){
    if(error){
        console.log("Error in running server", error);
    }
    console.log("Sucessfully server is running on port:", port);
});