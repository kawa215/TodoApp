const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dir = __dirname + "/app/views/";
var path = require('path');

const app = express();

app.use(express.static(dir));

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// db.sequelize.sync();

// app.get("/", function (req, res) {
//   res.sendFile(path + "index.html");
// });

app.get('/add', function(req, res) {
  res.sendFile(path.join(__dirname, '/app/views/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get('/tutorials', function(req, res) {
  res.sendFile(path.join(__dirname, '/app/views/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
