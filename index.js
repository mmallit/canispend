var express = require('express');
 
var app = express();
var bodyParser = require('body-parser');
 
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


var password = '7cc5cbe8-289a-458b-9373-f79940b42562';
var user = 'admin';
var mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:7cc5cbe8-289a-458b-9373-f79940b42562@ds016718.mlab.com:16718/canispend');


var Balance     = require('./app/models/balance');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
// on routes that end in /balance
// ----------------------------------------------------


    // create a balance (accessed at POST http://localhost:8080/api/balance)
router.route('/balance').post(function(req, res) {

        var balance = new Balance();      // create a new instance of the Bear model
        balance.amount = req.body.amount;  // set the bears name (comes from the request)
        balance.date = Date.now();

        // save the bear and check for errors
        balance.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Balance created!' });
        });

    });

router.route('/balance').get(function(req, res) {
        Balance.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, post) {
          console.log( post );
            res.json(post);
            
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================

app.listen(port);
console.log('Magic happens on port ' + port);