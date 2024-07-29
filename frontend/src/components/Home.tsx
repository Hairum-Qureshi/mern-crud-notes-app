import "../css/index.css";
import useStickyNotes from "../hooks/useStickyNotes";
import { StickyNote } from "../interfaces";
import StickyNoteComponent from "./StickyNote";
import laptopImag from "../assets/laptop-image.png";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";

// Long Notes:
// Titles cannot have profanity, but body text can have filtered profanity

// Sticky Notes:
// No profanity whatsoever

// When a user presses the "create sticky note"/"create long note" button, create the cookie in the backend storing the uuid

export default function Home() {
	const { stickyNotes } = useStickyNotes();
	const { theme } = useTheme()!;

	// TODO - align left div using items center
	// TODO - Make div go all the way on the bottom on mobile view

	return (
		<div className={theme === "dark" ? "dark" : ""}>
			<div className="w-full flex flex-col bg-[#f7f8fc] dark:bg-slate-800 dark:text-white pb-10">
				<div className="w-full lg:flex">
					<div className="lg:w-1/2 w-full">
						<h1 className="lg:text-6xl text-5xl m-5 text-left lg:leading-tight font-semibold p-3">
							Your thoughts, <br />
							Your voice, easily shared without the hassle of creating an
							account.
						</h1>
						<p className="text-xl mx-10">
							Please check out&nbsp;
							<Link to="/important">
								<u className="text-blue-600 dark:text-sky-400">
									the disclaimers/rules
								</u>
							</Link>
							&nbsp;page for some important information you should know before
							making any posts.
						</p>
					</div>
					<div className="lg:w-1/2 w-full flex items-center justify-center">
						<img
							src={laptopImag}
							alt="Laptop with sticky notes on it"
							className="object-cover scale-100"
						/>
					</div>
				</div>
				<div className="bg-slate-200 p-5 text-2xl lg:absolute bottom-0 w-full lg:mb-0 -mb-10 h-72 dark:bg-slate-700">
					<div className="flex">
						{/* <div>
						Wanna vent? Post a lengthy note&nbsp;
						<Link to="/new-note">
							<u className="text-blue-600">here!</u>
						</Link>
					</div>
					<div className="mt-5">
						Wanna share a quick fun fact about yourself? Post a sticky
						note&nbsp;
						<Link to="/sticky-notes">
							<u className="text-blue-600">here!</u>
						</Link>
					</div> */}
					</div>
				</div>
				{/* <div className="flex flex-grow flex-col">
				<div className="w-full p-2 text-xl my-10 flex-grow bg-slate-200">
					<div>
						Wanna Vent? Post a lengthy note&nbsp;
						<Link to="/new-note">
							<u className="text-blue-600">here!</u>
						</Link>
					</div>
					<div>
						Wanna share a quick fun fact about yourself? Post a sticky
						note&nbsp;
						<Link to="/sticky-note">
							&nbsp;
							<u className="text-blue-600">here!</u>
						</Link>
					</div>
				</div>
			</div> */}
			</div>
		</div>
	);
}
