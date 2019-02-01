const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set("view engine" , 'hbs');

hbs.registerHelper("getCurrentYear" , () => new Date().getFullYear());
hbs.registerHelper("screamIt" , (text) => text.toUpperCase());

app.use((req,res,next) => {
    var date = new Date().toString();
    var log = `${date} ${req.method} ${req.url}`;

    fs.appendFile('server.log' , log + "\n" , (err) => {
        if (err) {
            console.log("Cannot append file to log!");
        }
    });
    next();
});

// app.use((req,res,next) => {
//     res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + "/public"));

app.get('/' , (req,res) => {
    res.render("home.hbs" , {
        welcomeMessage : "Welcome to the Website!",
        title : "Home",
        message : "Some Message",
    })
});

app.get("/about" , (req,res) => {
    res.render('about.hbs' , {
        welcomeMessage : "About Page!",
        title : "About",
        message : "Some Message",
    });
})

app.get("/bad" , (req,res) => {
    res.send({
        errorMessage : "Error handling request!"
    });
})

app.listen(port , () => {
    console.log("Server is running at port "+port);
});