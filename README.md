# travel-buddies

## run the front-end

Go to folder travel-buddies/front-end

> npm start

## run the back-end

Go to folder travel-buddies/back-end

> npm run dev

## run the database seed

Go to folder travel-buddies/back-end

> npm run seed

### To-Do List

E can you do another join on the query to get trip by id to get favourite photo too to include an image on the card for past trips? Thanks.
I'm only able to get host_id not host_name for the trip tiles(cards). Can we do a join like for trip by id for the general trip query?
I'm struggling to pass the trip_id into the onClick to access the relevant record with the trips/trip_id api endpoint for the page with the trip details.

---
Hi B, 

1) 
I can do this query! Or do you prefer to do by yourself for your practice? Let me know!

we will need to create a file:
- photoRoutes.js
    (something like this)
    >> router.get("/trip/:trip_id", (req, res) => {...

2)
General trip query? What that means?
We have the JSON response by trip id like that:
{
  "id": 1,
  "trip_name": "England",
  "start_date": "2024-10-19T13:00:00.000Z",
  "end_date": "2024-10-29T13:00:00.000Z",
  "created_at": "2024-10-24T01:39:50.000Z",
  "updated_at": "2024-10-24T01:39:50.000Z",
  "itinerary": "Visit to beaches",
  "notes": "Pack sunscreen",
  "host_id": 1,
  "host_name": "Evandro",
  "host_email": "evandro.lugli@gmail.com",
  "co_host_id": 2,
  "co_host_name": "Bryony",
  "co_host_email": "bryony.seth@gmail.com"
}

And all trips like that:
  {
    "id": 1,
    "host_id": 1,
    "co_host_id": 2,
    "trip_name": "England",
    "start_date": "2024-10-19T13:00:00.000Z",
    "end_date": "2024-10-29T13:00:00.000Z",
    "created_at": "2024-10-24T01:39:50.000Z",
    "updated_at": "2024-10-24T01:39:50.000Z",
    "itinerary": "Visit to beaches",
    "notes": "Pack sunscreen"
  },

How do you need the JSON?

3)
I can have a look later


4)
Friendly reminder:
Every time that we gonna work on the project:
1st: pull (just in case)
2nd: push - commit changes (when finish)

---