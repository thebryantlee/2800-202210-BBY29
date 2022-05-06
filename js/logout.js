const express = require("express");
const session = require("express-session");
const app = express();
app.get("/logout", function(req,res){

    if (req.session) {
        req.session.destroy(function(error) {
            if (error) {
                res.status(400).send("Unable to log out") //Can Change This Message If We Want
            } else {
                // session deleted, redirect to home
                res.redirect("/");
            }
        });
    }
});