import {
	faArrowLeft,
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
import { useTheme } from "../contexts/themeContext";

export default function NotesViewer() {
	const [numButtons, setNumButtons] = useState<number[]>([]);
	const { allNotesData, loadingStatus, numPages, totalNotes } = useNotes();
	const { currUID } = useSessionContext()!;
	const [searchParams, setSearchParams] = useSearchParams();
	const pageNumber = searchParams.get("page");
	const { theme } = useTheme()!;

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

	return (
		<div className={`${theme === "dark" ? "dark" : ""}`}>
			<div className="lg:p-10 p-3 lg:h-[calc(100vh-3.5rem)] w-full dark:bg-slate-800 dark:text-slate-50">
				<div className="mb-3 relative">
					<h1 className="text-3xl font-semibold mb-1 lg:-mt-4">
						View All Posted Notes ({totalNotes})
					</h1>
					<p className="text-base">
						Click on the blog title to go to that blog
					</p>
				</div>
				{!loadingStatus ? (
					<>
						<div className="overflow-x-auto pb-20">
							<table className="w-full table-auto">
								<thead className="bg-slate-700 dark:bg-slate-900 text-white dark:text-white">
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
												key={note._id}
												className={`${
													index % 2 === 0
														? "bg-white dark:bg-slate-500"
														: "bg-slate-200 dark:bg-slate-700"
												}`}
											>
												<Link to={`/note/${note._id}`}>
													<td className="p-3 text-base text-gray-700 dark:text-slate-50">
														{note.note_title}
													</td>
												</Link>
												<td className="p-3 text-base text-gray-700 dark:text-slate-50">
													{note.curr_uid === currUID ? (
														<>{<FontAwesomeIcon icon={faCrown} />} You</>
													) : (
														"Anonymous"
													)}
												</td>
												<td className="p-3 text-base text-gray-700 flex justify-left">
													{note.containsProfanity ? (
														<div className="inline-block bg-red-600 dark:bg-red-700 text-white px-2 py-1 items-center rounded text-base">
															Explicit
														</div>
													) : (
														<div className="inline-flex bg-green-600 dark:bg-green-700 text-white px-2 py-1 rounded text-base items-center">
															Not Explicit
														</div>
													)}
												</td>
												<td className="p-3 text-base text-gray-700 dark:text-slate-50">
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
					<div className="flex items-center justify-center mt-20 dark:text-slate-50">
						<l-tailspin
							size="40"
							stroke="5"
							speed="0.9"
							color={theme === "dark" ? "white" : "black"}
						></l-tailspin>

						<h1 className="text-2xl font-semibold ml-3">LOADING NOTES</h1>
					</div>
				)}
			</div>
			{totalNotes > 9 && (
				<div className="w-full lg:absolute fixed bottom-0 p-5 flex items-center text-lg justify-center shadow-md">
					<Link
						to={
							Number(pageNumber) <= 1
								? "/notes/all"
								: `?page=${Number(pageNumber) - 1}`
						}
						className={`w-9 h-9 rounded p-2 ${
							Number(pageNumber) <= 1
								? "pointer-events-none bg-red-800 dark:bg-red-800 text-white"
								: "bg-black dark:bg-slate-900 text-white dark:text-slate-50"
						} flex items-center justify-center mr-2`}
					>
						<FontAwesomeIcon icon={faArrowLeft} />
					</Link>
					{numButtons.map((buttonNo: number) => {
						return (
							<Link
								key={buttonNo}
								to={`?page=${buttonNo}`}
								className={`w-9 h-9 rounded p-2 ${
									Number(pageNumber) === buttonNo
										? "bg-slate-400 dark:bg-slate-600 text-white"
										: "bg-black dark:bg-slate-900 text-white dark:text-slate-50"
								} flex items-center justify-center mr-2`}
							>
								{buttonNo}
							</Link>
						);
					})}
					<Link
						to={`?page=${Number(pageNumber) + 1}`}
						className={`w-9 h-9 rounded p-2 ${
							Number(pageNumber) >= numPages
								? "pointer-events-none bg-red-800 dark:bg-red-800 text-white"
								: "bg-black dark:bg-slate-900 text-white dark:text-slate-50"
						} flex items-center justify-center mr-2`}
					>
						<FontAwesomeIcon icon={faArrowRight} />
					</Link>
				</div>
			)}
		</div>
	);
}
