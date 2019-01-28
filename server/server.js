var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("server/public"));

// app.use('/jobs', jobsRoute);
// app.use('/auth', auth);
// app.use('/contacts', contactsRoute);

// Start listening for requests on a specific port
app.listen(process.env.PORT || port, function() {
  console.log("listening on port", process.env.PORT || 5000);
});
