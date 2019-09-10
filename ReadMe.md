# Locations API

This api has a single endpoint \Blanket\Locations that takes an array of locations in the body and returns the nearsest location from each other of the given locations

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
heroku create
git push heroku master
heroku open
```

This api is currently live at https://blanketlocations.herokuapp.com/Blanket/Locations

## Requests

* If Google Maps Places API does not recognize location name then it will be ignored when finding the nearest location

### Good examples

  {
  "locations" : [ 
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

