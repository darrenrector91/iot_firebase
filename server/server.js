var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;

// FIREBASE Initializaton 
var admin = require('firebase-admin');
var serviceAccount = require('./ds18b20-3f71f-firebase-adminsdk-60ps0-015e5d7523.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ds18b20-3f71f.firebaseio.com/'
});




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// app.use('/jobs', jobsRoute);
// app.use('/auth', auth);
// app.use('/contacts', contactsRoute);

// Start listening for requests on a specific port
app.listen(port, function () {
    console.log('listening on port', port);
});
