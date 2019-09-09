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

## Request Format

The payload for the endpoint is structured as.. with the location names being interchangable
{
  "locations" : [ 
      "Statue of Liberty", 
      "Miami, FL", 
      "Paris"
    ]
}