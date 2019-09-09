const express = require('express');
const bodyParser = require('body-parser');

const app = express();

function parseLocations(locations) {
    locations.forEach(location => {
        console.log(location);
    });
}

var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

// Initialize the app.
const server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.get('/health', (req, res) => res.send('Application is healthy'));

app.get('/Blanket/Locations', (req, res) => {

    // Validate Locations input 

    // Find closest location for each 
    parseLocations(req.body.locations);

    // console.log(req.body.locations);
    res.send(req.body.locations);
});