const express = require('express');
const path = require('path');
const port = 7000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//express. urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.
app.use(express.urlencoded());

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
    // console.log(req);
    // console.log(__dirname);
    return res.render('home',{
        title: "My contacts",
        contactLists: contact_list
    }); 
    // res.end("<h1> Hey!!</h1>");
});

app.get('/practice', function(req, res){
    console.log("hey!!");
    return res.render('practice',{
        title: "I am flying"
    });
});

app.post('/create-contact',function(req, res){
    // return res.redirect('practice');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone_number);
    // contact_list.push({
    //     name: req.body.name,
    //     phone: req.body.phone_number
    // });
    contact_list.push(req.body);
    return res.redirect('back');
});


app.listen(port, function(error){
    if(error){
        console.log("Error in running server", error);
    }
    console.log("Sucessfully server is running on port:", port);
});