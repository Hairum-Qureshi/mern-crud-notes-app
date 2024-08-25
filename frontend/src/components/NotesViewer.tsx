import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useSearchParams } from "react-router-dom";
import useNotes from "../hooks/useNotes";
import { Note } from "../interfaces";
import useSessionContext from "../contexts/sessionContext";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/themeContext";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";

// TODO - make the loading separate from the 'no notes' message and only make the table appear if there are notes published

export default function NotesViewer() {
	const [numButtons, setNumButtons] = useState<number[]>([]);
	const { allNotesData, loadingStatus, numPages, totalNotes, errorMessageNV } =
		useNotes();
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

	useEffect(() => {
		document.title = "All Posted Notes";
	}, []);

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
			<div className="lg:p-10 p-3 bg-[#f7f8fc] min-h-[calc(100vh+3.5rem)] max-h-auto w-full dark:bg-slate-800 dark:text-slate-50">
				<div className="mb-3 relative">
					<h1 className="text-3xl font-semibold mb-1 lg:-mt-4">
						View All Posted Notes ({totalNotes})
					</h1>
					<p className="text-base">Click on the blog title to view that blog</p>
					{errorMessageNV &&
						totalNotes > 0 &&
						errorMessageNV !== "No notes" &&
						totalNotes !== Number(pageNumber) && (
							<div className="w-full bg-red-700 text-white p-2 rounded-md mt-2">
								{errorMessageNV}
							</div>
						)}
				</div>
				{totalNotes === 0 &&
					Number(pageNumber) <= numPages &&
					!loadingStatus && (
						<div className="text-3xl font-semibold w-3/4 m-auto dark:text-white text-center mt-16">
							There are currently no notes to check out. If you would like to
							have your notes shown publicly, click&nbsp;
							<Link to="/new-note" className="dark:text-sky-400 text-blue-500">
								<u>here</u>
							</Link>
							&nbsp;to post your first note!
						</div>
					)}
				{Number(pageNumber) > numPages && (
					<div className="text-3xl font-semibold w-3/4 m-auto dark:text-white text-center mt-16">
						There are currently no notes on this page. <br />
						Click&nbsp;
						<Link to="/notes/all" className="dark:text-sky-400 text-blue-500">
							<u>here</u>
						</Link>
						&nbsp;to view all posted notes!
					</div>
				)}
				{!loadingStatus && totalNotes > 0 && (
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
														? "bg-white dark:bg-slate-600"
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
				)}
				{loadingStatus && (
					<div className="flex items-center justify-center mt-20 dark:text-slate-50">
						<LoadingSpinner>LOADING NOTES...</LoadingSpinner>
					</div>
				)}
			</div>
			<Pagination
				totalNotes={totalNotes}
				pageNumber={pageNumber}
				numPages={numPages}
				numButtons={numButtons}
			/>
		</div>
	);
}
