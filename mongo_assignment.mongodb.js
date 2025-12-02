use("assignment")
db.dropDatabase("assignment");


use ("assignment")
db.createCollection("passengers")
db.createCollection("flights")
db.createCollection("aircrafts")


// Passenger Inserts

db.passengers.insertOne(
    {
        _id : "P1",
        full_name: "Sean O'Leary",
        age: 20,
        air_miles: 31,
        height: 126.00,
        weight: 100.00,
        ticket: [
            {
            ticket_id: "T1",
            assigned_seat: "S01",
            baggage_allowance: 10.00
            }
        ]
    }
)

db.passengers.insertMany(
    [
        {_id: "P2", full_name: "Friderik Piety", age:35, height:140.23,weight:130.00, ticket: [{ticket_id:"T2", assigned_seat:"S45", baggage_allowance:10.00}]},
        {_id: "P3", full_name: "Ceferina Eskender", age:43, height:123.31,weight:150.00, ticket: [{ticket_id:"T3", assigned_seat:"S52", baggage_allowance:10.00}]},
        {_id: "P4", full_name: "Theoderich Dan", age:23, height:172.82,weight:164.00, ticket: [{ticket_id:"T4", assigned_seat:"S12", baggage_allowance:12.00}]},
        {_id: "P5", full_name: "Eline Dan", age:25, height:147.14,weight:158.00, ticket: [{ticket_id:"T5", assigned_seat:"S13", baggage_allowance:12.00}]},
        
        
    ]
)

// Flight Inserts

db.flights.insertOne(
    {
        _id : "F1",
        distance: 1019,
        departing_time: new Date(),
        landing_time: new Date("2025-11-26T16:00:00Z"),
        is_departing: true,
        number_of_stops: 2,
        gate: [
            {
                _id: "G1",
                gate_name: "Gate 1",
                waiting_seats: 46
            },

        ],
        airline: [
            {
                _id: "AL1",
                name: "Ryanair",
                reliabilty: "reliable",
                customer_rating: 85,
                country: "Ireland"
            }
        ],
        passengers: ["P1","P2","P3"]
    }
)

db.flights.insertMany(
    [
        {_id : "F2", distance: 2128, departing_time: new Date(), landing_time: new Date("2025-11-27T11:30:00Z"), is_departing: true, number_of_stops: 3,
             gate:[{_id:"G2", gate_name: "Gate 2", waiting_seats:30}], airline:[{_id:"AL2", name: "Aer Lingus",
                 reliabilty: "Not reliable", customer_rating: 73, country: "Ireland" }], passengers:["P4","P5"]}
    ]
)


// Aircraft Inserts

db.aircrafts.insertOne(
    {
    _id: "AC1",
    capacity: 32,
    class: "economy",
    wingspan: 50,
    max_speed: 800.00,
    noise_levels: "extreme",
    manufacturer: "Boeing"

    }

)

db.aircrafts.insertMany(
    [
    {_id: "AC2", capacity: 64, class:"business", wingspan: 130, max_speed: 950.00, noise_levels: "minimal", manufacturer: "Gulfstream" },
    {_id: "AC3", capacity: 10,  class:null, wingspan:75, max_speed: 750.00, noise_levels: "extreme", manufacturer: "Boeing" },
    {_id: "AC4", capacity: 64, class: "economy", wingspan: 120, max_speed:800.00, noise_levels: "minimal", manufacturer: "Boeing"}
    ]
)


// Simple Passenger Update

db.passengers.updateOne(
    {_id:"P1"},
    {$set: 
        {age: 21, height:130}
    }
)


// Flight Array Update

db.flights.updateOne(
    {_id:"F2"},
    {$pop : {passengers:1}} // removes passenger P5 from flight F2 
)
db.flights.updateOne(
    {_id:"F1"},
    {$push : {passengers:"P5"}} // adds passenger P5 to flight F1
)


db.passengers.deleteOne(  // Renoves passenger 3 from flight 1
    {age:{$gt:40}}
)

db.flights.updateOne(
    {_id: "F1"},
    {$pull: {passengers:"P3"}} // Removes P3 from passengers array 
)

//db.flights.find().pretty()
//db.passengers.find().pretty()


// aggregates


// Will get the passengers whose ticket allows them to carry above 10kg of luggage, also renames the name, weight and height fields
/*
db.passengers.aggregate([{
    "$match": {
            "ticket.baggage_allowance" : {"$gt": 10}

    }
},
    {
    "$project" : {
        _id:0, name: "$full_name", heightMetres: "$height", weightKilos: "$weight" 

    }
}

])
*/

// Will lookup passengers assigned to Boeing Flights

db.aircrafts.aggregate([{
    "$match": { manufacturer: "Boeing"}

},
    {"$count": "Boeing Aircrafts" }
])

// Will find all the passengers aboard each flight 
db.flights.aggregate([{
    $lookup: {
      from: "passengers",
      localField: "passengers",
      foreignField: "_id",
      as: "Passengers Onboard"
    }
    
}])
 
