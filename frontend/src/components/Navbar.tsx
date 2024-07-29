import { faBars, faMoon, faSun, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useStickyNotes from "../hooks/useStickyNotes";
import { useState } from "react";

export default function Navbar() {
	const [openNavbar, setOpenNavbar] = useState(false);
	const { createStickyNote } = useStickyNotes();
	const [theme, setTheme] = useState("light");

	function changeTheme() {
		if (theme === "light") {
			setTheme("dark");
			localStorage.setItem("theme", "dark");
		} else {
			setTheme("light");
			localStorage.setItem("theme", "light");
		}
	}

	return (
		<div className="w-full p-2 items-center relative">
			<div className="flex">
				<Link to="/">
					<h1
						className="lg:text-2xl text-xl ml-2"
						onClick={() => setOpenNavbar(false)}
					>
						Anonymous Notes - Speak Your Mind!
					</h1>
				</Link>
				<div className="lg:flex items-center ml-auto hidden">
					<Link to="/new-note" onClick={() => setOpenNavbar(false)}>
						<button className="text-white p-2 text-center block w-full">
							Create a Big Note
						</button>
					</Link>
					<Link to="/notes/all" onClick={() => setOpenNavbar(false)}>
						<button className="text-white p-2 text-center block w-full">
							View Notes
						</button>
					</Link>
					<Link to="/sticky-notes" onClick={() => setOpenNavbar(false)}>
						<button
							className="text-white p-2 text-center block w-full"
							onClick={createStickyNote}
						>
							Sticky Notes
						</button>
					</Link>
					<Link to="/important" onClick={() => setOpenNavbar(false)}>
						<button className="text-white p-2 text-center block w-full">
							Disclaimers & Rules
						</button>
					</Link>
					<Link to="/contact" onClick={() => setOpenNavbar(false)}>
						<button
							className="text-white p-2 text-center block w-full mr-4 -ml-2"
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
				<div className="ml-auto flex items-center lg:hidden">
					{!openNavbar ? (
						<FontAwesomeIcon
							icon={faBars}
							className="text-2xl"
							onClick={() => setOpenNavbar(true)}
						/>
					) : (
						<FontAwesomeIcon
							icon={faX}
							className="text-2xl"
							onClick={() => setOpenNavbar(false)}
						/>
					)}
				</div>
			</div>
			{openNavbar && (
				<div className="absolute lg:hidden left-0 z-10 bg-slate-900 w-full h-screen flex text-center items-center justify-center">
					<div className="text-3xl mt-5">
						<Link to="/new-note" onClick={() => setOpenNavbar(false)}>
							<button className="text-white p-2 text-center block w-full">
								Create a Big Note
							</button>
						</Link>
						<Link to="/notes/all" onClick={() => setOpenNavbar(false)}>
							<button className="text-white p-2 text-center block w-full">
								View Notes
							</button>
						</Link>
						<Link to="/sticky-notes" onClick={() => setOpenNavbar(false)}>
							<button
								className="text-white p-2 text-center block w-full"
								onClick={createStickyNote}
							>
								Sticky Notes
							</button>
						</Link>
						<Link to="/important" onClick={() => setOpenNavbar(false)}>
							<button className="text-white p-2 text-center block w-full">
								Disclaimers & Rules
							</button>
						</Link>
						<Link to="/contact" onClick={() => setOpenNavbar(false)}>
							<button
								className="text-white p-2 text-center block w-full"
								onClick={createStickyNote}
							>
								Contact
							</button>
						</Link>
						<button
							className="bg-sky-800 text-white p-2 rounded mt-5 w-14"
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
			)}
		</div>
	);
}
