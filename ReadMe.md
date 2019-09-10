# Locations API

This api has a single endpoint \Blanket\Locations that takes an array of locations in the body and returns the nearsest location of the other endpoints. The location name is passed to the Google Places API to make an asynchronous request to get back the coordinates of the location. The distance formula is then used to find the next closest locatin from each valid location.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/white-rose/Blanket.git # or clone your own fork
cd Blanket
npm install
npm start
```

Your app should now be running on [localhost:8080](http://localhost:8080/).

## Deploying to Heroku

```
Set git remote heroku - https://git.heroku.com/blanketlocations.git
git push heroku master
heroku open
```

This api is currently live at https://blanketlocations.herokuapp.com/blanket/locations

## Requests

* If Google Maps Places API does not recognize location name then it will be ignored when finding the nearest location
* Assumption from instructions is that payloads must contain between 50-100 locations

## Request & Response Examples

### API Resources

  - [GET /Blanket/Locations](#get-locations)

### GET /Blanket/Locations

Example: https://blanketlocations.herokuapp.com/blanket/locations

Request body:

    {
        "locations": [
            "Statue of Liberty", 
            "Miami, FL", 
            "Paris",
            "Los Angeles", 
            "Chicago", 
            "Houston",
            "Phoenix", 
            "Philadelphia", 
            "San Antonio",
            "San Diego", 
            "Dallas", 
            "San Jose",
            "Austin", 
            "Jacksonville", 
            "Fort Worth",
            "Columbus", 
            "San Francisco", 
            "Charlotte",
            "Seattle", 
            "Denver", 
            "Washington",
            "Boston", 
            "Detroit", 
            "Nashville",
            "Portland", 
            "Memphis", 
            "Oklahoma City",
            "Las Vegas", 
            "Louisville", 
            "Baltimore",
            "Mulwaukee", 
            "Tuscon", 
            "Fresno",
            "Mesa", 
            "Sacramento", 
            "Atlanta",
            "Kansas City", 
            "Colorado Springs", 
            "Miami",
            "Raleigh", 
            "Omaha", 
            "Long Beach",
            "Virgina Beach", 
            "Oakland", 
            "Tulsa",
            "Arlington", 
            "Tampa", 
            "New Orleans",
            "Aurora", 
            "Anaheim",
            "Unknown area"
        ]
    }

Response body:

    {
        {
            "name": "Fort Worth",
            "nearestLocation": "Dallas"
        },
        {
            "name": "San Jose",
            "nearestLocation": "Oakland"
        },
        {
            "name": "Austin",
            "nearestLocation": "San Antonio"
        },
        {
            "name": "Los Angeles",
            "nearestLocation": "Long Beach"
        },
        {
            "name": "Paris",
            "nearestLocation": "Boston"
        },
        {
            "name": "Colorado Springs",
            "nearestLocation": "Denver"
        },
        {
            "name": "Phoenix",
            "nearestLocation": "Mesa"
        },
        {
            "name": "Memphis",
            "nearestLocation": "Nashville"
        },
        {
            "name": "Nashville",
            "nearestLocation": "Louisville"
        },
        {
            "name": "Las Vegas",
            "nearestLocation": "Anaheim"
        },
        {
            "name": "Jacksonville",
            "nearestLocation": "Tampa"
        },
        {
            "name": "Fresno",
            "nearestLocation": "San Jose"
        },
        {
            "name": "Baltimore",
            "nearestLocation": "Aurora at North Bethesda Center"
        },
        {
            "name": "Milwaukee",
            "nearestLocation": "Chicago"
        },
        {
            "name": "San Antonio",
            "nearestLocation": "Austin"
        },
        {
            "name": "Statue of Liberty National Monument",
            "nearestLocation": "Philadelphia"
        },
        {
            "name": "New Orleans",
            "nearestLocation": "Memphis"
        },
        {
            "name": "Houston",
            "nearestLocation": "Austin"
        },
        {
            "name": "Philadelphia",
            "nearestLocation": "Statue of Liberty National Monument"
        },
        {
            "name": "Boston",
            "nearestLocation": "Statue of Liberty National Monument"
        },
        {
            "name": "San Francisco",
            "nearestLocation": "Oakland"
        },
        {
            "name": "Omaha",
            "nearestLocation": "Kansas City"
        },
        {
            "name": "Tampa",
            "nearestLocation": "Jacksonville"
        },
        {
            "name": "Tulsa",
            "nearestLocation": "Oklahoma City"
        },
        {
            "name": "Virginia Beach",
            "nearestLocation": "Washington"
        },
        {
            "name": "Kansas City",
            "nearestLocation": "Omaha"
        },
        {
            "name": "Louisville",
            "nearestLocation": "Nashville"
        },
        {
            "name": "Tucson",
            "nearestLocation": "Mesa"
        },
        {
            "name": "Raleigh",
            "nearestLocation": "Charlotte"
        },
        {
            "name": "Seattle",
            "nearestLocation": "Portland"
        },
        {
            "name": "Portland",
            "nearestLocation": "Seattle"
        },
        {
            "name": "Columbus",
            "nearestLocation": "Detroit"
        },
        {
            "name": "Detroit",
            "nearestLocation": "Columbus"
        },
        {
            "name": "Atlanta",
            "nearestLocation": "Nashville"
        },
        {
            "name": "Long Beach",
            "nearestLocation": "Los Angeles"
        },
        {
            "name": "San Diego",
            "nearestLocation": "Anaheim"
        },
        {
            "name": "Oakland",
            "nearestLocation": "San Francisco"
        },
        {
            "name": "Charlotte",
            "nearestLocation": "Raleigh"
        },
        {
            "name": "Anaheim",
            "nearestLocation": "Long Beach"
        },
        {
            "name": "Mesa",
            "nearestLocation": "Phoenix"
        },
        {
            "name": "Miami",
            "nearestLocation": "Miami"
        },
        {
            "name": "Miami",
            "nearestLocation": "Miami"
        },
        {
            "name": "Chicago",
            "nearestLocation": "Milwaukee"
        },
        {
            "name": "Dallas",
            "nearestLocation": "Fort Worth"
        },
        {
            "name": "Sacramento",
            "nearestLocation": "Oakland"
        },
        {
            "name": "Denver",
            "nearestLocation": "Colorado Springs"
        },
        {
            "name": "Washington",
            "nearestLocation": "Arlington County"
        },
        {
            "name": "Arlington County",
            "nearestLocation": "Washington"
        },
        {
            "name": "Oklahoma City",
            "nearestLocation": "Tulsa"
        },
        {
            "name": "Aurora at North Bethesda Center",
            "nearestLocation": "Washington"
        },
        {
            "UnverifiedLocationName": "Unknown area"
        }
        ]
    }

  