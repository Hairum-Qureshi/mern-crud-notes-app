import { Link } from "react-router-dom";
import "../css/index.css";
import { useState } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStickyNotes from "../hooks/useStickyNotes";
import { StickyNote } from "../interfaces";
import StickyNoteComponent from "./StickyNote";
import Draggable from "react-draggable";

// Long Notes:
// Titles cannot have profanity, but body text can have filtered profanity

// Sticky Notes:
// No profanity whatsoever

// When a user presses the "create sticky note"/"create long note" button, create the cookie in the backend storing the uuid

export default function Home() {
	const { createStickyNote, stickyNotes } = useStickyNotes();
	const [theme, setTheme] = useState("light");

	function changeTheme() {
		if (theme === "light") setTheme("dark");
		else setTheme("light");
	}

	return (
		<div className="w-full h-screen p-5">
			<div>
				<div className="flex items-center">
					<h1 className="text-3xl font-semibold">
						Anonymous Notes - Speak Your Mind!
					</h1>
					<div className="ml-auto">
						<Link to="/new-note">
							<button className="bg-sky-800 text-white p-2 rounded text-base mr-2">
								Create a Big Note
							</button>
						</Link>
						<Link to="/notes/all">
							<button className="bg-slate-700 text-white p-2 rounded text-base mr-2">
								View Notes
							</button>
						</Link>
						<Link to="/important">
							<button className="bg-black text-white p-2 rounded text-base mr-2">
								Disclaimers & Rules
							</button>
						</Link>
						<button
							className="bg-sky-900 text-white p-2 rounded text-base w-10"
							onClick={changeTheme}
						>
							{theme == "light" ? (
								<FontAwesomeIcon icon={faMoon} />
							) : (
								<FontAwesomeIcon icon={faSun} />
							)}
						</button>
					</div>
				</div>
				<div>
					<button
						className="bg-sky-700 text-white p-2 rounded text-base mt-2"
						onClick={createStickyNote}
					>
						Create a Sticky Note
					</button>
				</div>
				<div className="w-full flex grid-cols-1 flex-wrap items-center justify-center mt-5">
					{stickyNotes.map((stickyNote: StickyNote) => {
						return (
							<Draggable>
								<div>
									<StickyNoteComponent stickyNote={stickyNote} />
								</div>
							</Draggable>
						);
					})}
				</div>
			</div>
		</div>
	);
}
