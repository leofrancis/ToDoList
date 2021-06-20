const express = require("express");
const bodyParser = require("body-parser")
const date = require(__dirname+"/date.js")

const app = express();

const items = ["Buy Food","Cook Food","Eat Food"];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  const day = date.getDate();

  res.render('list', {
    listTitle: day,
    newItemsList: items
  })

});


app.post("/", function(req, res){
  const item = req.body.itemValue;
  const list = req.body.list;

  console.log(req.body);
  if (list === "Work"){
      workItems.push(item);

      res.redirect("/work");
  }
  else{
    items.push(item);

    res.redirect("/");
  }


});

app.get("/work", function(req, res) {

  res.render('list', {
    listTitle: "Work List",
    newItemsList: workItems
  })
});

app.post("/work", function(req, res){
  const item = req.body.itemValue;

  workItems.push(item);

  res.redirect("/work");
});

app.get("/about", function(req, res){
  res.render("about");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
