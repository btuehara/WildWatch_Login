//configure express server

// initializes Express framework
const express = require("express");
//creates express application
const app = express();
//initializes Mongoose framework
const mongoose = require("mongoose")
//imports bodyparser module to app
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

//connects VS Code to mongoDB Atlas database called wildwatchDB
mongoose.connect("mongodb+srv://btuehara:bry1@cluster0.yfup1uv.mongodb.net/wildwatchDB")

//data schema
const wildwatchSchema = {
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}

//create a wildwatch model using mongoose
const customers = mongoose.model("customers", wildwatchSchema);

//initiates a get response from the express server and transfers the file to the given path
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})
app.get("/confirmation", function(req, res) {
    res.sendFile(__dirname + "/index1.html");
})

//app.post
app.post("/", async (req, res) => {
    try {
        const newcustomer = new customers({
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        await newcustomer.save(); // Use await with save() to handle promises
        res.redirect("/confirmation");
    } catch (error) {
        console.error("Error saving customer:", error);
        // Handle the error (e.g., show an error page or log it)
        res.status(500).send("Error saving customer data");
    }
});


//sets up a server on port 3000 and listens to incoming requests
app.listen(3000, function() {
    console.log("server is running on 3000");
})