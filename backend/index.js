const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors package

const app = express();
const port = 3000;
app.use(cors());

// MongoDB connection URI
const uri = "mongodb://localhost:27017"; // Update with your MongoDB connection URI

// Database name and collection name
const dbName = "FutaBus"; // Update with your database name
const collectionName = "Trip"; // Update with your collection name

// Middleware to parse JSON body
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Function to connect to MongoDB
async function connectToMongoDB() {
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	await client.connect();
	return client.db(dbName).collection(collectionName);
}

app.get("/getAllTrip", async (req, res) => {
	const tripCollection = await connectToMongoDB();

	try {
		const data = await tripCollection.find({}).toArray();
		console.log("ne", data);
		res.json(data);
	} catch (error) {
		console.error("Error fetching sample data: ", error);
		res.sendStatus(500);
	}
});

app.delete("/deleteTrip/:tripID", async (req, res) => {
	const tripID = req.params.tripID; // Access tripID from req.params.tripID
	const tripCollection = await connectToMongoDB();

	try {
		console.log(tripID);

		const data = await tripCollection.deleteOne({ id: tripID }); // Remove toArray()
		console.log("ne", data);
		res.json(data);
	} catch (error) {
		console.error("Error deleting data: ", error);
		res.sendStatus(500);
	}
});

app.post("/createTrip", async (req, res) => {
	const item = req.body;
	const tripCollection = await connectToMongoDB();
	console.log(item);

	try {
		const result = await tripCollection.insertOne(item);

		// Extract the inserted ID from the result
		const insertedId = result.insertedId;

		// Send a simple success response with the inserted ID
		res.json({ insertedId: insertedId, message: "Trip created successfully" });
	} catch (error) {
		console.error("Error creating trip:", error);
		res
			.status(500)
			.json({ error: "An error occurred while creating the trip" });
	}
});

app.put("/updateTrip/:tripID", async (req, res) => {
	const tripID = req.params.tripID;
	const updatePrice = req.body.price; // Access price from req.body
	const tripCollection = await connectToMongoDB();

	try {
		const result = await tripCollection.updateOne(
			{ id: tripID },
			{ $set: { price: updatePrice } }
		);

		// Check if any document is modified
		if (result.modifiedCount > 0) {
			res.status(200).json({ message: "Trip updated successfully" });
		} else {
			res.status(404).json({ message: "Trip not found" });
		}
	} catch (error) {
		console.error("Error updating trip:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Route to serve the HTML page
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
