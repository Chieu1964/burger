var express = require('express');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var PORT = process.env.PORT || 3000;
var app = express();

// The following code to serve images, CSS files, and JavaScript files in Public directory:
app.use(express.static('public'));

// Parse application body as JSON
app.use(bodyParser.urlencoded({
    extended: true
}));

// Set handlebars:
var exphbs = require("express-handlebars");

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Import routes and give the server access to them.
var routes = require('./controllers/burger_controllers.js');

app.use(routes);

// Start our server so that it can begin listening to client requests:
app.listen(PORT, function() {
    // Log server-side when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});