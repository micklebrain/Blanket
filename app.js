const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

var verifiedLocations = [];
var locationCoordinates = [];

const protocol = "https://";
const googlePlacesDomain = "maps.googleapis.com/"
const googlePlacesSearchParameters = "maps/api/place/findplacefromtext/json?input=";
const API_KEY = "AIzaSyC9VCYHJUjZKap_qj22RkOYCYH5POTlje4";
const googleApiKeyParemeters = "&inputtype=textquery&fields=formatted_address,name,geometry&key=" + API_KEY;
var googlePlaceSearchURL = protocol + googlePlacesDomain + googlePlacesSearchParameters + "Statue%20Of%20%20Liberty" + googleApiKeyParemeters;

function getCoordinatesForLocation() {

    const request = require('request');
    request(googlePlaceSearchURL, function (error, response, body) {

        if (error) {
            console.log("error: ");
            console.log(error);
        }

        console.log("Potential Locations ");
        // Converting JSON-encoded string to JS object
        // Converting JSON object to JS object
        var locationsJSON = JSON.parse(body);
        printCoordinatesOfLocations(locationsJSON);
    });

}

// Define recursive function to print nested values
function printCoordinatesOfLocations(locationsJson) {

    var latitude = "";
    var longitude = "";
    var name = "";

    name = locationsJson['candidates'][0]['name'];
    latitude = locationsJson['candidates'][0]['geometry']['location']['lat'];
    longitude = locationsJson['candidates'][0]['geometry']['location']['lng'];

    console.log('Name: ');
    console.log(name);
    console.log('Logitude: ');
    console.log(longitude);
    console.log('Latitude: ');
    console.log(latitude);

    var blanketLocation = {};
    blanketLocation.name = name;
    blanketLocation.latitude = latitude;
    blanketLocation.longitude = longitude;
    locationCoordinates.push(blanketLocation);

    console.log("All coordinates");
    console.log(locationCoordinates);

};

function parseLocations(locations) {
    locations.forEach(location => {
        verifiedLocations.push(location);
    });
}

// Initialize the app.
const server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.get('/health', (req, res) => res.send('Application is healthy'));

app.get('/Blanket/Locations', (req, res) => {

    // Validate Locations input 
    parseLocations(req.body.locations);

    // Veriried Locatins
    console.log("Locations input: ");
    verifiedLocations.forEach(verifiedLocation => {
        console.log(verifiedLocation);
    })

    // Find coordinates for each location 
    getCoordinatesForLocation();

    // console.log(req.body.locations);
    res.send(req.body.locations);
});