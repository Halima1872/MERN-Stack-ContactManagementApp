const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const Contact = require('./models/contact');
const user = require('./models/user');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secret = "thisismysecret"
const withAuth = require('./middleware');
const cookieParser = require('cookie-parser');
const localStorage = require('localStorage');
const corsConfig = {
    origin: 'http://localhost:5173',
    credentials: true,
    };

    app.use(cookieParser());
app.use(cors(corsConfig));

const bodyParser = require('body-parser'); // Import the 'body-parser' package

// Use bodyParser middleware
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))


mongoose.connect('mongodb://127.0.0.1:27017/CRUD')
.then(() => {
    console.log("Mongo Connection Established!")
}).catch((err) => {
    console.log("Mongo Failed to connect!")
    console.log(err)
});


app.post("/newUser", async(req, res) => {
    const {username,password,email,contactNumber} = req.body;
    console.log(username,password,email,contactNumber);
    const user = new User({username,password,email,contactNumber})
    await user.save();
    res.status().send(200);

})

app.get("/user", async(req, res) => {
    const user = await User.find({username:req.query.username});
    if(user.length === 0){
        res.status(404).send("User not found");
        return;
    }
    else{
        res.status(200).send("user found");
    }

})
app.post("/login", async(req, res) => {
    const {username,password} = req.body;

    const user = await User.findOne({username:username});
    
    if(user === null){
        res.status(404).send("User not found");
        return;
    }
    user.comparePassword(password,function(err,isMatch){
        if(err){
            console.log(err);
            res.status(404).send("User not found");
            return;
        }
        else{
            if(isMatch){
                const userId = user._id.toString(); 
                const payload = { userId };
                const token = jwt.sign(payload,secret,{expiresIn:'1h'});
                localStorage.setItem('token',token);
                res.sendStatus(200);
            }
            else{
                res.status(404).send("User not found");
                return;
            }
        }
    })
})
app.get("/users/:id", async(req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(user === null){
        res.status(404).send("User not found");
        return;
    }
    else{
        res.status(200).send(user);
    }
})
app.post("/users/:id/contacts", async(req, res) => {
    console.log("hello");
    const {name,contactNumber,email,address} = req.body;
    const userId = req.params.id;
    const contact = new Contact({userId,name,contactNumber,email,address});
    await contact.save();
    res.status(200).send("Contact saved");
})
app.get("/users/:id/contacts", async(req, res) => {
    const userId = req.params.id;
    const contacts = await Contact.find({userId:userId});
    if(contacts.length === 0){
        res.status(404).send("No contacts found");
        return;
    }
    else{
        res.status(200).send(contacts);
    }
})
app.get("/users/:id/contacts/:contactId", async(req, res) => {
    const userId = req.params.id;
    const contactId = req.params.contactId;
    const contact = await Contact.findById(contactId);
    if(contact === null){
        res.status(404).send("Contact not found");
        return;
    }
    else{
        res.status(200).send(contact);
    }

})
app.put("/users/:id/contacts/:contactId", async(req, res) => {
    const userId = req.params.id;
    const contactId = req.params.contactId;
    const {name,contactNumber,email,address} = req.body;
    const contact = await Contact.findByIdAndUpdate(contactId,{name,contactNumber,email,address});
    if(contact === null){
        res.status(404).send("Contact not found");
        return;
    }
    else{
        res.status(200).send("Contact updated");
    }
    
})
app.delete("/users/:id/contacts/:contactId", async(req, res) => {
    const userId = req.params.id;
    const contactId = req.params.contactId;
    const contact = await Contact.findByIdAndDelete(contactId);
    if(contact === null){
        res.status(404).send("Contact not found");
        return;
    }
    else{
        res.status(200).send("Contact deleted");
    }
})
app.get("/checkToken", withAuth, function(req, res) {
    const userId = req.userId;
    res.status(200).send(userId.toString())
  });
app.get("/logout", function(req, res) {
    localStorage.removeItem('token');
    res.status(200).send("Logged out")
    });
    

app.listen(8500,() => {
    console.log('Server is running on port 8500');
});