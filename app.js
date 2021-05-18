const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let items = ["buy food", "cook food","eat food"];
let workItems = []
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// Using EJS
app.set("view engine" , "ejs");
//Get request
app.get("/", function(req , res){
    let today = new Date();
     const options = {
         weekday : "long",
         day : "numeric",
         month : "long" 
     };
     let day = today.toLocaleDateString("en-US" , options);    
     res.render("list" , {listTitle : day , newListItems : items});
});
//Work route
app.get("/work", function( req , res ){

    res.render("list" , {listTitle : "Work List",newListItems : workItems})
})
//POST ROUTE
app.post("/", function(req , res){
    item = req.body.newitem;
    if(req.body.list === "Work")
    {
        console.log(req.body.list);
workItems.push(item);
res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");

    }
});
// work post route
app.post("/work", function( req , res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})
// server is running on  port 3000
app.listen(3000, function(){
    console.log("app started on port 3000");
});