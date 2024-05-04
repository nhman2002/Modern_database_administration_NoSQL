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
	const ticketCollection = await connectToMongoDB();

	try {
		const sampleData = await ticketCollection.find({}).toArray();
        console.log("ne",sampleData)
		res.json(sampleData);
	} catch (error) {
		console.error("Error fetching sample data:", error);
		res.sendStatus(500);
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
