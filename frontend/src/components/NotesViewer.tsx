import { faArrowLeftLong, faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useNotes from "../hooks/useNotes";
import { Note } from "../interfaces";
import useSessionContext from "../contexts/sessionContext";
import { tailspin } from "ldrs";

// TODO - consider adding pagination

export default function NotesViewer() {
	const { allNotesData, loadingStatus } = useNotes();
	const { currUID } = useSessionContext()!;

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

	console.log(allNotesData);

	return (
		<div className="lg:p-10 p-3">
			<Link to="/">
				<div className="flex items-center text-lg">
					<FontAwesomeIcon icon={faArrowLeftLong} />
					<h1 className="ml-2">Go Back</h1>
				</div>
			</Link>
			<div className="mb-3">
				<h1 className="text-3xl font-semibold mb-1">View All Posted Notes</h1>
				<p className="text-base">Click on the blog title to go to that blog</p>
			</div>
			{!loadingStatus ? (
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
								<>
									<tr
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
								</>
							);
						})}
					</tbody>
				</table>
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
	);
}
