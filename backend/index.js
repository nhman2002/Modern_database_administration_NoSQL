const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/FutaBus", {
	// dbName: "FutaBus",
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const tripSchema = new mongoose.Schema({
	id: String,
	license: String,
	seatNum: Number,
	driverId: String,
	vallet: [String],
	seatType: String,
	price: String,
	seat: [String],
});

// Create a model for the "Trip" collection
// const Trip = mongoose.model("Trip", tripSchema);

// Retrieve all data from the "Trip" collection
// Trip.find({}, (err, trips) => {
// 	if (err) {
// 		console.error("Error retrieving trips:", err);
// 	} else {
// 		console.log("All trips:", trips);
// 	}
// });

// For backend and express
const express = require("express");
const app = express();
const cors = require("cors");
console.log("App listen at port 3000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
	resp.send("App is Working");
	// You can check backend is working or not by
	// entering http://loacalhost:5000

	// If you see App is working means
	// backend working properly
});

// app.post("/register", async (req, resp) => {
// 	try {
// 		const user = new User(req.body);
// 		let result = await user.save();
// 		result = result.toObject();
// 		if (result) {
// 			delete result.password;
// 			resp.send(req.body);
// 			console.log(result);
// 		} else {
// 			console.log("User already register");
// 		}
// 	} catch (e) {
// 		resp.send("Something Went Wrong");
// 	}
// });
app.get("/Trip", async (req, res) => {
	try {
		const Trip = await Trip.find({});
		res.send(Trip);
		console.log(Trip);
	} catch (err) {
		console.log(err);
	}
});
app.listen(3000);
