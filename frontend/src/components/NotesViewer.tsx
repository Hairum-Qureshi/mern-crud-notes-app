import {
	faArrowLeft,
	faArrowLeftLong,
	faArrowRight,
	faCrown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useSearchParams } from "react-router-dom";
import useNotes from "../hooks/useNotes";
import { Note } from "../interfaces";
import useSessionContext from "../contexts/sessionContext";
import { tailspin } from "ldrs";
import { useEffect, useState } from "react";

// TODO - consider scenario where there's tons of buttons for each page; implement some type of logic to only list X number of buttons and if there's number of pages beyond that, maybe create a button that has ellipses?
// TODO - implement logic to render out any error messages to the user
// TODO - if there are no notes, add a message saying there are no notes

export default function NotesViewer() {
	const [numButtons, setNumButtons] = useState<number[]>([]);
	const { allNotesData, loadingStatus, numPages, totalNotes } = useNotes();
	const { currUID } = useSessionContext()!;
	const [searchParams, setSearchParams] = useSearchParams();
	const pageNumber = searchParams.get("page");

	useEffect(() => {
		const updateButtons = () => {
			if (numPages <= 0) {
				setNumButtons([]);
			} else {
				const buttons = [];
				for (let i = 1; i <= numPages; i++) {
					buttons.push(i);
				}
				setNumButtons(buttons);
			}
		};

		updateButtons();
	}, [numPages]);

	console.log(numPages);

	tailspin.register();

	function formatDate(utcDate: string): string {
		const date = new Date(utcDate);

		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		};

		const formattedDate = date.toLocaleDateString("en-US", options);
		return formattedDate;
	}

	console.log(numPages);

	return (
		<>
			<div className="lg:p-10 p-3 h-screen w-full">
				<Link to="/">
					<div className="flex items-center text-lg">
						<FontAwesomeIcon icon={faArrowLeftLong} />
						<h1 className="ml-2">Go Back</h1>
					</div>
				</Link>
				<div className="mb-3 relative">
					<h1 className="text-3xl font-semibold mb-1">
						View All Posted Notes ({totalNotes})
					</h1>
					<p className="text-base">
						Click on the blog title to go to that blog
					</p>
				</div>
				{!loadingStatus ? (
					<>
						<div className="overflow-x-auto pb-20">
							{" "}
							{/* Added pb-20 for padding bottom */}
							<table className="w-full table-auto">
								<thead className="bg-slate-700 text-white border-b-2 border-gray-200">
									<tr>
										<th className="p-3 text-base font-semibold tracking-wide text-left">
											Blog Title
										</th>
										<th className="p-3 text-base font-semibold tracking-wide text-left">
											Owner
										</th>
										<th className="p-3 text-base font-semibold tracking-wide text-left">
											Flag
										</th>
										<th className="p-3 text-base font-semibold tracking-wide text-left">
											Posted Date
										</th>
									</tr>
								</thead>
								<tbody>
									{allNotesData.map((note: Note, index: number) => {
										return (
											<tr
												key={note._id} // Added key prop
												className={`${
													index % 2 === 0 ? "bg-white" : "bg-slate-200"
												}`}
											>
												<Link to={`/note/${note._id}`}>
													<td className="p-3 text-base text-gray-700">
														{note.note_title}
													</td>
												</Link>
												<td className="p-3 text-base text-gray-700">
													{note.curr_uid === currUID ? (
														<>{<FontAwesomeIcon icon={faCrown} />} You</>
													) : (
														"Anonymous"
													)}
												</td>
												<td className="p-3 text-base text-gray-700 flex justify-left">
													{note.containsProfanity ? (
														<div className="inline-block bg-red-600 text-white px-2 py-1 items-center rounded text-base">
															Explicit
														</div>
													) : (
														<div className="inline-flex bg-green-600 text-white px-2 py-1 rounded text-base items-center">
															Not Explicit
														</div>
													)}
												</td>
												<td className="p-3 text-base text-gray-700">
													{formatDate(note.createdAt)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</>
				) : (
					<div className="flex items-center justify-center mt-20">
						<l-tailspin
							size="40"
							stroke="5"
							speed="0.9"
							color="black"
						></l-tailspin>
						<h1 className="text-2xl font-semibold ml-3">LOADING NOTES</h1>
					</div>
				)}
			</div>
			{totalNotes > 9 && (
				<div className="w-full lg:absolute fixed bottom-0 p-5 flex items-center text-lg justify-center bg-white shadow-md">
					{" "}
					{/* Added bg-white and shadow-md */}
					<Link
						to={
							Number(pageNumber) <= 1
								? "/notes/all"
								: `?page=${Number(pageNumber) - 1}`
						}
						className={`w-9 h-9 rounded p-2 bg-black text-white flex items-center justify-center mr-2 ${
							Number(pageNumber) <= 1 ? "pointer-events-none bg-red-900" : ""
						}`}
					>
						<FontAwesomeIcon icon={faArrowLeft} />
					</Link>
					{numButtons.map((buttonNo: number) => {
						return (
							<Link
								key={buttonNo} // Added key prop
								to={`?page=${buttonNo}`}
								className={`w-9 h-9 rounded p-2 ${
									Number(pageNumber) === buttonNo ? "bg-slate-400" : "bg-black"
								} text-white flex items-center justify-center mr-2`}
							>
								{buttonNo}
							</Link>
						);
					})}
					<Link
						to={`?page=${Number(pageNumber) + 1}`}
						className={`w-9 h-9 rounded p-2 bg-black text-white flex items-center justify-center mr-2 ${
							Number(pageNumber) >= numPages && "pointer-events-none bg-red-900"
						}`}
					>
						<FontAwesomeIcon icon={faArrowRight} />
					</Link>
				</div>
			)}
		</>
	);
}
