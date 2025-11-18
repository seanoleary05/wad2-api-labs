use("assignment")
db.dropDatabase("assignment");


use ("assignment")
db.createCollection("flights")
db.createCollection("passengers")
db.createCollection("aircrafts")

db.passengers.insertOne(
    {
        _id : 1,
        full_name: "Sean O'Leary",
        age: 20,
        air_miles: 31,
        height: 126,
        weight: 62000,
        ticket: [
            {
            ticket_id: 101,
            assigned_seat: "G01",
            baggage_allowance: 10000
            }
        ]
    }
)

db.passengers.find().pretty()