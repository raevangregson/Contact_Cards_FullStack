var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var inMemoryDatabase = require("./in-memory-database");
var db = inMemoryDatabase();

app.use(express.static('client/build'));

app.use(bodyParser.json());

var items = [
  {name: "fishy",price:2},
  {name:"carrots",price:3}
];

db.init(items);
// respond with "Hello World!" on the homepage
app.get("/api/groceries", function (req, res) {
res.send(db.readAll());
});

app.get("/api/groceries/:id", function (req, res) {
var id = req.params.id;
console.log(id);
res.send(db.read(id));
});

app.post("/api/groceries/", function (req, res) {
  console.log(req.body);
  db.create(req.body);
res.send("Ok!");
});

app.put('/api/groceries/:id', function(req, res) {
    var id = req.params.id;
    var list = req.body;
    db.update(id,list);
    res.send("SUCCESS");
});

app.delete('/api/groceries/:id', function(req, res) {
    var id = req.params.id;
    db.delete(id);
    res.send("SUCCESS");
});

var server = app.listen(5000, function () {
var port = server.address().port;
console.log("App's server listening at http://localhost:%s", port);
});
