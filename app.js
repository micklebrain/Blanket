const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

var unknownLocations = [];
var verifiedLocations = [];
var locationCoordinates = [];
var response = []

const protocol = "https://";
const googlePlacesDomain = "maps.googleapis.com/"
const googlePlacesSearchParameters = "maps/api/place/findplacefromtext/json?input=";
const GOOGLE_PLACES_API_KEY = "AIzaSyC9VCYHJUjZKap_qj22RkOYCYH5POTlje4";
const googleApiKeyParemeters = "&inputtype=textquery&fields=formatted_address,name,geometry&key=" + GOOGLE_PLACES_API_KEY;

async function parseLocations(locations) {

    var locationsPromises = [];

    locations.forEach(async (location) => {
        await locationsPromises.push(fetchCoordinatesForLocation(location));
        verifiedLocations.push(location);
    });

    await Promise.all(locationsPromises);
}

async function fetchCoordinatesForLocation(locationName) {

    const CANDIDATES = 'candidates';
    const GEOMETRY = 'geometry';
    const LOCATION = 'location';
    const LATITUDE = 'lat';
    const LONGITUDE = 'lng';

    var locationParameter = locationName.split(' ').join('%20');
    var googlePlaceSearchURL = protocol + googlePlacesDomain + googlePlacesSearchParameters + locationParameter + googleApiKeyParemeters;

    const request = require('request-promise');

    return new Promise((resolve, _reject) => request(googlePlaceSearchURL, async function (error, _response, body) {
        if (error) {
            console.log("error: ");
            console.log(error);
        } else {
            // Converting JSON-encoded string to JS object
            var locationsJSON = JSON.parse(body);
            if (locationsJSON[CANDIDATES].length !== 0) {
                const name = locationsJSON[CANDIDATES][0]['name'];
                const latitude = locationsJSON[CANDIDATES][0][GEOMETRY][LOCATION][LATITUDE];
                const longitude = locationsJSON[CANDIDATES][0][GEOMETRY][LOCATION][LONGITUDE];

                var blanketLocation = {};
                blanketLocation.name = name;
                blanketLocation.latitude = latitude;
                blanketLocation.longitude = longitude;
                locationCoordinates.push(blanketLocation);
                resolve();
                // if (err) reject(err);
                // await parseAndAddCoordinates(locationsJSON);
            } else {
                var unknownLocationJSON = {}
                unknownLocationJSON.UnknownLocationName = locationName
                unknownLocations.push(unknownLocationJSON);
                resolve();
            }
        }
    }));

}

async function findNearestNeighbors() {

    var shortestDistance = 100000;
    var shortestPlaceInBetween = "";

    console.log("Number of locations: ");
    console.log(locationCoordinates.length);

    var nearestLocationsMap = new Map();

    // Use Distance Formula to find nearest coordinates for each pair of coordinates 
    for (var i = 0; i < locationCoordinates.length; i++) {

        var locationResponse = {};
        var locationName = locationCoordinates[i].name;

        if (nearestLocationsMap.has(locationName)) {
            locationResponse = {};
            locationResponse.name = locationCoordinates[i].name;
            locationResponse.nearestLocation = nearestLocationsMap.get(locationName);
            nearestLocationsMap.set(locationResponse.nearestLocation, locationResponse.name);
            response.push(locationResponse);
        } else {
            var longitude = locationCoordinates[i].longitude;
            var latitude = locationCoordinates[i].latitude;
            for (var j = 0; j < locationCoordinates.length; j++) {
                if (j !== i) {
                    var longitude2 = locationCoordinates[j].longitude;
                    var latitude2 = locationCoordinates[j].latitude;
                    var lng = longitude - longitude2;
                    var lat = latitude - latitude2;
                    // Calculate the distance between two points

                    const dist = Math.sqrt((Math.pow(lng, 2) + Math.pow(lat, 2)));
                    if (dist < shortestDistance) {
                        shortestDistance = dist;
                        shortestPlaceInBetween = locationCoordinates[j].name;
                    }
                }
            }

            var locationResponse = {};
            locationResponse.name = locationName;
            locationResponse.nearestLocation = shortestPlaceInBetween;
            nearestLocationsMap.set(locationResponse.nearestLocation, locationResponse.name);
            response.push(locationResponse);
            shortestDistance = 100000;
            shortestPlaceInBetween = "";
        }
    }

    // console.log(nearestLocationsMap);

    for (var j = 0; j < unknownLocations.length; j++) {
        response.push(unknownLocations[j]);
    }

    locationCoordinates = [];
    verifiedLocations = [];
    unknownLocations = [];

}

function validateInput() {
    if (verifiedLocations.length < 50 || verifiedLocations.length > 100) return false;
    return true;
}

// Initialize the app.
const server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.get('/health', (req, res) => res.send('Application is healthy'));

app.get('/blanket/locations', async (req, res) => {

    // Validate Locations input 
    await parseLocations(req.body.locations);

    if (!validateInput()) res.status(400).send("Number of Locations must between 50 and 100");
    else findNearestNeighbors().then(res.send(response));

});