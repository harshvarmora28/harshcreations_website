// Author: Harsh Varmora

const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
// const bodyparser = require("body-parser");
const port = process.env.PORT || 80;

// Connecting with mongoose
mongoose.connect("mongodb://localhost/harshCreationsHireMeData", {useNewUrlParser: true, useUnifiedTopology: true});

// Express specific Stuff
app.use("/static", express.static("static"));
app.use(express.urlencoded());

// Pug specific Stuff
app.set("view engine", "pug");   // Set the template engine as Pug
app.set("views", path.join(__dirname, "template"));   // Set the views directory as template

// Saving data in mongoDB database using Mongoose

// Defining schema for mongoose
const hireSchema = new mongoose.Schema({
    name: String,
    email: String,
    country: String,
    purposeOfWebsite: String
});

// Making a mongoose model
const HireMe = mongoose.model("hireData", hireSchema);

// Endpoints
app.get("/", (req, res) =>{
    const params = {};
    res.status(200).render("home.pug", params);
});

app.get("/hireme", (req, res) =>{
    const params = {};
    res.status(200).render("hireMe.pug", params);
});

// To save the data in the mongoDB database
app.post("/hireme", (req, res) =>{
    var myData = new HireMe(req.body);
    myData.save().then(() =>{
        res.send("Your data has been stored successfully on our Database!")
    }).catch(() =>{
        res.status(400).send("Sorry unable to save your data to our Database!")
    });
});

// Starting the Server
app.listen(port, () =>{
    console.log(`The Application started successfully on Port ${port}`);
});
