import "../css/index.css";
import useStickyNotes from "../hooks/useStickyNotes";
import { StickyNote } from "../interfaces";
import StickyNoteComponent from "./StickyNote";
import Draggable from "react-draggable";
import Navbar from "./Navbar";
import lightmodeImgLaptop from "../assets/lighmode-laptop-bg.png";

// Long Notes:
// Titles cannot have profanity, but body text can have filtered profanity

// Sticky Notes:
// No profanity whatsoever

// When a user presses the "create sticky note"/"create long note" button, create the cookie in the backend storing the uuid

export default function Home() {
	const { stickyNotes } = useStickyNotes();

	return (
		<div className="w-full h-screen bg-[#f7f8fc]">
			<div className="border border-black w-full lg:flex">
				<div className="lg:w-1/2 w-full h-screen border-2 border-red-700">
					<h1 className="lg:text-6xl text-5xl m-5 text-left lg:leading-tight font-semibold p-3">
						Your thoughts, <br />
						Your voice, easily shared without needing to create an account.
					</h1>
				</div>
				<div className="border-2 border-blue-700 lg:w-1/2 w-full">
					{/* <img
						src="https://pngimg.com/d/sticky_note_PNG18964.png"
						alt=""
						className="w-72 h-72 object-cover"
					/> */}
				</div>
			</div>

			{/* <div className="w-full flex flex-wrap items-center justify-center">
					<img src={lightmodeImgLaptop} alt="" className="max-w-full h-auto" />
				</div> */}
		</div>
	);
}
