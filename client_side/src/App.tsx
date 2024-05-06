import homeHeaderTopPic from "./assets/images/home-header-top.png";
import fb from "./assets/images/fb.png";
import ytb from "./assets/images/ytb.png";
import VN from "./assets/images/VietNam.png";
import UK from "./assets/images/UK.png";
import news from "./assets/images/home-news-img1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPhone,
	faEnvelope,
	faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
export default function App() {
	const [data, setData] = useState([]);
	const [id, setId] = useState("");
	const [license, setLicense] = useState("");
	const [seatNum, setSeatNum] = useState(0);
	const [driverId, setDriverId] = useState("");
	const [vallet, setVallet] = useState([]);
	const [price, setPrice] = useState("");
	const [seatType, setSeatType] = useState("");
	const [seat, setSeat] = useState([]);

	const newtrip = {
		id: id,
		license: license,
		seatNum: seatNum,
		driverId: driverId,
		vallet: vallet,
		seatType: seatType,
		price: price,
		seat: seat,
	};

	const FetchData = () => {
		fetch(`http://localhost:3000/getAllTrip`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json(); // Parse the response body as JSON
				} else {
					throw new Error("Failed to fetch data");
				}
			})
			.then((data) => {
				// Data contains the parsed JSON response
				setData(data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	};
	const deleteData = useCallback(async (tripID: string) => {
		await fetch(`http://localhost:3000/deleteTrip/${tripID}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.ok) {
					FetchData();
					console.log("success deleting");
				}
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	const createData = useCallback(async (item: any) => {
		try {
			const response = await fetch(`http://localhost:3000/createTrip`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(item),
			});

			if (response.ok) {
				FetchData(); // Refetch data after successful creation
				console.log("Trip created successfully");
				// Optionally, display a success message to the user
			} else {
				// Handle non-200 responses (e.g., server errors)
				console.error("Failed to create trip:", response.statusText);
				// Optionally, display an error message to the user
			}
		} catch (error) {
			console.error("Error creating trip:", error);
			// Handle fetch or network errors
			// Optionally, display an error message to the user
		}
	}, []);
	const updateData = useCallback(async (tripID: string, price: string) => {
		await fetch(`http://localhost:3000/updateTrip/${tripID}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ price }), // Wrapping price in an object
		})
			.then(async (response) => {
				if (response.ok) {
					await response.json(); // Parse response JSON data
					FetchData();
					console.log("success updating");
				} else {
					throw new Error("Failed to update trip"); // Throw an error for non-200 responses
				}
			})
			.catch((error) => {
				console.error("Error updating trip:", error);
			});
	}, []);

	useEffect(() => {
		FetchData();
	}, []);

	const Item = (item: any) => {
		const [check, setCheck] = useState(true);
		const [updatePrice, setUpdatePrice] = useState(item.item.price);
		function debounce(func, timeout = 700) {
			let timer;
			return (...args) => {
				clearTimeout(timer);
				timer = setTimeout(() => {
					func.apply(this, args);
				}, timeout);
			};
		}

		return (
			<div className="flex flex-row items-center justify-center gap-10 mx-5 my-5 border-2 border-black border-solid">
				<div className="flex items-center justify-center h-12 mx-2 truncate">
					{item.item.id}
				</div>
				<div className="flex items-center justify-center h-12 mx-2 truncate">
					{item.item.license}
				</div>
				<div className="flex items-center justify-center h-12 mx-2 truncate">
					{item.item.seatNum}
				</div>
				<div className="flex items-center justify-center h-12 mx-2 truncate">
					{item.item.driverId}
				</div>
				<div className="flex items-center justify-center h-12 mx-5 truncate">
					<input
						defaultValue={updatePrice}
						className="border-2 border-black border-solid"
						onChange={debounce((event) => {
							const newValue = event.target.value;
							setUpdatePrice(newValue);
							updateData(item.item.id, newValue);
						})}
						onSelect={() => setCheck(false)}
						onBlur={() => setCheck(true)}
					/>
				</div>
				<div className="flex items-center justify-center h-12 mx-2 truncate">
					{item.item.seat}
				</div>
				<button
					className="px-2 mx-2 capitalize bg-red-300 rounded-md"
					onClick={() => deleteData(item.item.id)}
				>
					delete
				</button>
			</div>
		);
	};

	return (
		<div className="flex flex-col items-center w-full h-full overflow-auto text-white bg-black ">
			<header className="flex flex-col items-center w-full text-black bg-white border h-36 ">
				<div
					className="flex items-center justify-center w-full h-10"
					style={{
						backgroundImage: `url(${homeHeaderTopPic})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover", // Optional: Adjust to fit your needs
					}}
				>
					<div className="mr-10 text-white">
						<FontAwesomeIcon icon={faPhone} className="mr-2" />
						19006067
					</div>
					<div className="text-white mr-14">
						<FontAwesomeIcon icon={faEnvelope} className="mr-2" />
						Hotro@futabus.vn
					</div>
					<div className="ml-20 ">
						<img
							src={fb}
							alt="Facebook"
							className="ml-10 mr-1 truncate rounded-full w-7 h-7"
						/>
					</div>
					<div>
						<img
							src={ytb}
							alt="Youtube"
							className="mr-1 truncate rounded-full w-7 h-7"
						/>
					</div>
					<div className="flex items-center justify-center mr-2 text-white ">
						<img
							src={VN}
							alt="Vietnam Flag"
							className="ml-10 mr-1 truncate rounded-full w-7 h-7"
						/>
						VN
					</div>
					<div className="flex items-center justify-center mr-2 text-white ">
						<img
							src={UK}
							alt="UK Flag"
							className="ml-10 mr-1 truncate rounded-full w-7 h-7"
						/>
						UK
					</div>

					<div className="ml-10 text-white capitalize ">
						<button
							className="px-2 py-1 bg-green-500 rounded-md"
							// onClick={handleClick}
						>
							<FontAwesomeIcon icon={faCircleUser} className="mr-2" />
							Login
						</button>
					</div>
				</div>
			</header>
			<div
				className="flex items-center justify-center w-full h-full scale-90"
				style={{
					backgroundImage: `url(${news})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover", // Optional: Adjust to fit your needs
					height: "800px",
				}}
			></div>
			<div
				className="flex flex-col items-center justify-center w-full overflow-auto text-black bg-white"
				style={{
					height: "1000px",
				}}
			>
				<div className="border-2 border-black border-solid">
					{data.map((item: any) => {
						return <Item item={item} />;
					})}
				</div>
				<div className="flex flex-col items-center justify-center my-5">
					{/* <TextField></TextField> */}
					<div className="text-3xl capitalize">Create a New Trip:</div>
					<div className="flex flex-row my-2">
						<div className="w-40 ">Id:</div>
						<input
							value={id}
							className="border-2 border-black border-solid"
							onChange={(o: any) => {
								console.log(o.target.value);
								setId(o.target.value);
							}}
						/>
					</div>
					<div className="flex flex-row my-2">
						<div className="w-40 ">License:</div>
						<input
							value={license}
							className="border-2 border-black border-solid"
							onChange={(o: any) => {
								setLicense(o.target.value);
							}}
						/>
					</div>
					<div className="flex flex-row my-2">
						<div className="w-40 ">Seat Number:</div>
						<input
							value={seatNum}
							className="border-2 border-black border-solid"
							onChange={(o: any) => {
								setSeatNum(o.target.value);
							}}
						/>
					</div>
					<div className="flex flex-row my-2">
						<div className="w-40 ">DriverId:</div>
						<input
							value={driverId}
							className="border-2 border-black border-solid "
							onChange={(o: any) => {
								setDriverId(o.target.value);
							}}
						/>
					</div>
					<div className="flex flex-row my-2">
						<div className="w-40 ">Vallet:</div>
						<input
							value={vallet}
							className="border-2 border-black border-solid"
							onChange={(o: any) => {
								setVallet(o.target.value);
							}}
						/>
					</div>
					<div className="flex flex-row my-2">
						<div className="w-40 ">Price:</div>
						<input
							value={price}
							className="border-2 border-black border-solid"
							onChange={(o: any) => {
								setPrice(o.target.value);
							}}
						/>
					</div>
					<div className="flex flex-row my-2">
						<div className="w-40 ">Seat Type:</div>
						<input
							value={seatType}
							className="border-2 border-black border-solid"
							onChange={(o: any) => {
								setSeatType(o.target.value);
							}}
						/>
					</div>
					<div className="flex flex-row my-2">
						<div className="w-40 ">Seat List:</div>
						<input
							value={seat}
							className="border-2 border-black border-solid"
							onChange={(o: any) => {
								setSeat(o.target.value);
							}}
						/>
					</div>
					<div>
						<button
							className="px-2 py-2 mx-2 my-2 text-white bg-blue-500 rounded-md"
							onClick={() => {
								setId("");
								setLicense("");
								setDriverId("");
								setVallet([]);
								setSeatNum(0);
								setSeat([]);
								setSeatType("");
								setPrice("");
								createData(newtrip);
							}}
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
