import { Link } from "react-router-dom";
import "../css/index.css";
import { useState } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Long Notes:
// Titles cannot have profanity, but body text can have filtered profanity

// Sticky Notes:
// No profanity whatsoever

// When a user presses the "create sticky note"/"create long note" button, create the cookie in the backend storing the uuid

export default function Home() {
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
						Anonymous Notes - Speak Your Mind
					</h1>
					<div className="ml-auto">
						<button className="bg-black text-white p-2 rounded text-base mr-2">
							Disclaimers
						</button>
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
					<button className="bg-sky-700 text-white p-2 rounded text-base mt-2">
						Create a Sticky Note
					</button>
				</div>
				<div>
					<Link to="/new-note">
						<button className="bg-slate-700 text-white p-2 rounded text-base mt-2">
							Create a Big Note
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
