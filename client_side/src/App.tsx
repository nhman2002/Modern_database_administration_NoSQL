// import { useState } from "react";
// import * as pic from "../public/images/home-header-top.png"
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

function App() {
	const mockIndex = [1, 2, 3, 4, 5];
	const mockData = {
		id: "Trip:101",
		license: "59-SA-12345",
		seatNum: 45,
		driverId: "Employee:9991",
		vallet: ["Employee:5555", "Employee:1111"],
		seatType: "bed",
		price: "200000",
		seat: ["A01", "A02", "A03", "A04", "A05", "A06", "A10", "A11", "A12"],
	};

	return (
		<div className=" h-full w-full flex  items-center bg-black text-white flex-col overflow-auto">
			<header className="flex border h-36 w-full items-center bg-white text-black flex-col ">
				<div
					className="w-full flex items-center justify-center h-10"
					style={{
						backgroundImage: `url(${homeHeaderTopPic})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover", // Optional: Adjust to fit your needs
					}}
				>
					<div className="text-white mr-10">
						<FontAwesomeIcon icon={faPhone} className="mr-2" />
						19006067
					</div>
					<div className="text-white mr-14">
						<FontAwesomeIcon icon={faEnvelope} className="mr-2" />
						Hotro@futabus.vn
					</div>
					<div className=" ml-20">
						<img
							src={fb}
							alt="Facebook"
							className=" w-7 h-7 rounded-full truncate ml-10 mr-1"
						/>
					</div>
					<div>
						<img
							src={ytb}
							alt="Youtube"
							className=" w-7 h-7 rounded-full truncate  mr-1"
						/>
					</div>
					<div className=" flex mr-2 justify-center items-center text-white">
						<img
							src={VN}
							alt="Vietnam Flag"
							className=" w-7 h-7 rounded-full truncate ml-10 mr-1"
						/>
						VN
					</div>
					<div className=" flex mr-2 justify-center items-center text-white">
						<img
							src={UK}
							alt="UK Flag"
							className=" w-7 h-7 rounded-full truncate ml-10 mr-1"
						/>
						UK
					</div>

					<div className=" capitalize text-white ml-10">
						<button
							className="bg-green-500 rounded-md py-1 px-2"
							// onClick={handleClick}
						>
							<FontAwesomeIcon icon={faCircleUser} className="mr-2" />
							Login
						</button>
					</div>
				</div>
			</header>
			<div
				className="w-full flex items-center justify-center h-full scale-90"
				style={{
					backgroundImage: `url(${news})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover", // Optional: Adjust to fit your needs
					height: "800px",
				}}
			></div>
			<div
				className="w-full flex justify-center items-center bg-white text-black flex-col"
				style={{
					height: "1000px",
				}}
			>
        
				{mockIndex.map(() => {
					return <div>hello</div>;
				})}
			</div>
		</div>
	);
}

export default App;
