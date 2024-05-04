const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB connection URI
const uri = 'mongodb://localhost:27017'; // Update with your MongoDB connection URI

// Database name and collection name
const dbName = 'futabus'; // Update with your database name
const collectionName = 'futabus'; // Update with your collection name

// Middleware to parse JSON body
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));


// Function to connect to MongoDB
async function connectToMongoDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return client.db(dbName).collection(collectionName);
}

// Route to mark ticket as paid
// Route to mark ticket as paid
app.put('/mark-as-paid/:ticketID', async (req, res) => {
    const ticketID = req.params.ticketID;
    const ticketCollection = await connectToMongoDB();
    console.log(ticketID);
    //ticket ID to int
    id = parseInt(ticketID);

    try {
        const result = await ticketCollection.updateOne(
            { ID:id },
            { $set: { status: 'fulfilled' } }
        );
        console.log(result);
        if (result.modifiedCount === 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Error marking ticket as paid:', error);
        res.sendStatus(500);
    }
});

// Route to cancel ticket
app.put('/cancel-ticket/:ticketID', async (req, res) => {
    const ticketID = req.params.ticketID;
    const ticketCollection = await connectToMongoDB();
    id = parseInt(ticketID);


    try {
        const result = await ticketCollection.updateOne(
            { ID: id },
            { $set: { status: 'cancelled' } }
        );
        if (result.modifiedCount === 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Error cancelling ticket:', error);
        res.sendStatus(500);
    }
});

// Route to edit ticket details
app.put('/edit-ticket/:ticketID', async (req, res) => {
    const ticketID = req.params.ticketID;
    const editedTicket = req.body;
    const ticketCollection = await connectToMongoDB();
    id = parseInt(ticketID);


    try {
        const result = await ticketCollection.updateOne(
            { ID : id},
            { $set: { 
                'ticket_context.departure': editedTicket.departure,
                'ticket_context.destination': editedTicket.destination,
                'ticket_context.seatNum': editedTicket.seatNum,
                'ticket_context.trip': editedTicket.trip
            } }
        );
        if (result.modifiedCount === 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Error editing ticket:', error);
        res.sendStatus(500);
    }
});

// Route to serve the sample data as JSON
app.get('/sample-data', async (req, res) => {
    const ticketCollection = await connectToMongoDB();

    try {
        const sampleData = await ticketCollection.find({}).toArray();
        res.json(sampleData);
    } catch (error) {
        console.error('Error fetching sample data:', error);
        res.sendStatus(500);
    }
});

// Route to serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
