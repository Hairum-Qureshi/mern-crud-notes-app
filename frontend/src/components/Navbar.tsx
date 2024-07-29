import { faBars, faMoon, faSun, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useStickyNotes from "../hooks/useStickyNotes";
import { useState } from "react";
import { useTheme } from "../contexts/themeContext";

export default function Navbar() {
	const [openNavbar, setOpenNavbar] = useState(false);
	const { createStickyNote } = useStickyNotes();
	const { theme, toggleTheme } = useTheme()!;

	return (
		<div className="w-full p-2 items-center relative h-14">
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
						onClick={toggleTheme}
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
							onClick={toggleTheme}
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

// import { faBars, faMoon, faSun, faX } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";
// import useStickyNotes from "../hooks/useStickyNotes";
// import { useEffect, useState } from "react";
// import { useTheme } from "../contexts/themeContext";

// export default function Navbar() {
// 	const [openNavbar, setOpenNavbar] = useState(false);
// 	const { createStickyNote } = useStickyNotes();
// const { theme, toggleTheme } = useTheme()!;

// 	return (
// 		<div className="w-full p-2 flex items-center relative h-14">
// 			<div className="flex w-full">
// 				<Link to="/">
// 					<h1
// 						className="lg:text-2xl text-xl ml-2 items-center"
// 						onClick={() => setOpenNavbar(false)}
// 					>
// 						Anonymous Notes - Speak Your Mind!
// 					</h1>
// 				</Link>
// 				<div className="ml-auto">
// 					<div className="lg:flex items-center ml-auto hidden">
// 						<Link to="/new-note" onClick={() => setOpenNavbar(false)}>
// 							<button className="text-white p-2 text-center block w-full">
// 								Create a Big Note
// 							</button>
// 						</Link>
// 						<Link to="/notes/all" onClick={() => setOpenNavbar(false)}>
// 							<button className="text-white p-2 text-center block w-full">
// 								View Notes
// 							</button>
// 						</Link>
// 						<Link to="/sticky-notes" onClick={() => setOpenNavbar(false)}>
// 							<button
// 								className="text-white p-2 text-center block w-full"
// 								onClick={createStickyNote}
// 							>
// 								Sticky Notes
// 							</button>
// 						</Link>
// 						<Link to="/important" onClick={() => setOpenNavbar(false)}>
// 							<button className="text-white p-2 text-center block w-full">
// 								Disclaimers & Rules
// 							</button>
// 						</Link>
// 						<Link to="/contact" onClick={() => setOpenNavbar(false)}>
// 							<button
// 								className="text-white p-2 text-center block w-full mr-4 -ml-2"
// 								onClick={createStickyNote}
// 							>
// 								Contact
// 							</button>
// 						</Link>
// 						<button
// 							className="bg-sky-800 text-white p-2 rounded text-base w-10"
// 							onClick={toggleTheme}
// 						>
// 							{theme === "light" ? (
// 								<FontAwesomeIcon icon={faMoon} />
// 							) : (
// 								<FontAwesomeIcon icon={faSun} />
// 							)}
// 						</button>
// 					</div>
// 					<div className="ml-auto flex items-center lg:hidden">
// 						{!openNavbar ? (
// 							<FontAwesomeIcon
// 								icon={faBars}
// 								className="text-2xl"
// 								onClick={() => setOpenNavbar(true)}
// 							/>
// 						) : (
// 							<FontAwesomeIcon
// 								icon={faX}
// 								className="text-2xl"
// 								onClick={() => setOpenNavbar(false)}
// 							/>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 			{openNavbar && (
// 				<div className="lg:hidden bg-black text-white w-full h-screen bottom-0">
// 					{/* absolute lg:hidden h-screen left-0 z-10 bg-slate-900 w-full flex text-center items-center justify-center border-2 border-white  */}
// 					<div className="text-3xl mt-5">
// 						<Link to="/new-note" onClick={() => setOpenNavbar(false)}>
// 							<button className="text-white p-2 text-center block w-full">
// 								Create a Big Note
// 							</button>
// 						</Link>
// 						<Link to="/notes/all" onClick={() => setOpenNavbar(false)}>
// 							<button className="text-white p-2 text-center block w-full">
// 								View Notes
// 							</button>
// 						</Link>
// 						<Link to="/sticky-notes" onClick={() => setOpenNavbar(false)}>
// 							<button
// 								className="text-white p-2 text-center block w-full"
// 								onClick={createStickyNote}
// 							>
// 								Sticky Notes
// 							</button>
// 						</Link>
// 						<Link to="/important" onClick={() => setOpenNavbar(false)}>
// 							<button className="text-white p-2 text-center block w-full">
// 								Disclaimers & Rules
// 							</button>
// 						</Link>
// 						<Link to="/contact" onClick={() => setOpenNavbar(false)}>
// 							<button
// 								className="text-white p-2 text-center block w-full"
// 								onClick={createStickyNote}
// 							>
// 								Contact
// 							</button>
// 						</Link>
// 						<button
// 							className="bg-sky-800 text-white p-2 rounded mt-5 w-14"
// 							onClick={toggleTheme}
// 						>
// 							{theme === "light" ? (
// 								<FontAwesomeIcon icon={faMoon} />
// 							) : (
// 								<FontAwesomeIcon icon={faSun} />
// 							)}
// 						</button>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// }
