import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useStickyNotes from "../hooks/useStickyNotes";
import { useState } from "react";

export default function Navbar() {
	const { createStickyNote } = useStickyNotes();
	const [theme, setTheme] = useState("light");

	function changeTheme() {
		if (theme === "light") setTheme("dark");
		else setTheme("light");
	}

	return (
		<div className="w-full p-2 flex items-center mx-2">
			<Link to="/">
				<h1 className="text-2xl">Anonymous Notes - Speak Your Mind!</h1>
			</Link>
			<div className="ml-auto">
				<Link to="/new-note">
					<button className="text-white p-2 rounded text-base mr-2">
						Create a Big Note
					</button>
				</Link>
				<Link to="/notes/all">
					<button className="text-white p-2 rounded text-base mr-2">
						View Notes
					</button>
				</Link>
				<Link to="/sticky-notes">
					<button
						className="text-white p-2 rounded text-base mr-2"
						onClick={createStickyNote}
					>
						Sticky Notes
					</button>
				</Link>
				<Link to="/important">
					<button className="text-white p-2 rounded text-base mr-2">
						Disclaimers & Rules
					</button>
				</Link>
				<Link to="/contact">
					<button
						className="text-white p-2 rounded text-base mr-2"
						onClick={createStickyNote}
					>
						Contact
					</button>
				</Link>
				<button
					className="bg-sky-800 text-white p-2 rounded text-base w-10"
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
	);
}
