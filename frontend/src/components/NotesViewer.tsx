import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useNotes from "../hooks/useNotes";
import { Note } from "../interfaces";
import useSessionContext from "../contexts/sessionContext";

export default function NotesViewer() {
	const { allNotesData } = useNotes();
	const { currUID } = useSessionContext()!;

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
			<h1 className="text-3xl font-semibold mb-3">View All Posted Notes</h1>
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
					{allNotesData.map((note: Note) => {
						return (
							<>
								<tr className="bg-white">
									<Link to={`/note/${note._id}`}>
										<td className="p-3 text-base text-gray-700">
											{note.note_title}
										</td>
									</Link>
									<td className="p-3 text-base text-gray-700">
										{note.curr_uid === currUID ? "You" : "Anonymous"}
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
		</div>
	);
}

// import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";
// import useNotes from "../hooks/useNotes";

// export default function NotesViewer() {
// 	const { allNotesData } = useNotes();

// 	console.log(allNotesData);

// 	return (
// 		<div className="lg:p-10 p-3">
// 			<Link to="/">
// 				<div className="flex items-center text-lg">
// 					<FontAwesomeIcon icon={faArrowLeftLong} />
// 					<h1 className="ml-2">Go Back</h1>
// 				</div>
// 			</Link>
// 			<h1 className="text-3xl font-semibold mb-3">View All Posted Notes</h1>
// 			<table className="w-full table-auto">
// 				<thead className="bg-slate-700 text-white border-b-2 border-gray-200">
// 					<tr>
// 						<th className="p-3 text-base font-semibold tracking-wide text-left">
// 							Blog Title
// 						</th>
// 						<th className="p-3 text-base font-semibold tracking-wide text-left">
// 							Owner
// 						</th>
// 						<th className="p-3 text-base font-semibold tracking-wide text-left">
// 							Flag
// 						</th>
// 						<th className="p-3 text-base font-semibold tracking-wide text-left">
// 							Posted Date
// 						</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					<tr className="bg-white">
// 						<td className="p-3 text-base text-gray-700">
// 							Lorem ipsum dolor sit amet consectetur adipisicing elit.
// 							Perferendis, facilis.
// 						</td>
// 						<td className="p-3 text-base text-gray-700">You</td>
// 						<td className="p-3 text-base text-gray-700 flex justify-left">
// 							<div className="inline-block bg-red-600 text-white px-2 py-1 items-center rounded text-base">
// 								Explicit
// 							</div>
// 						</td>
// 						<td className="p-3 text-base text-gray-700">1961</td>
// 					</tr>
// 					<tr className="bg-gray-50">
// 						<td className="p-3 text-base text-gray-700">Witchy Woman</td>
// 						<td className="p-3 text-base text-gray-700">Anonymous</td>
// 						<td className="p-3 text-base text-gray-700 flex justify-left">
// 							<div className="inline-flex bg-green-600 text-white px-2 py-1 rounded text-base items-center">
// 								Not Explicit
// 							</div>
// 						</td>
// 						<td className="p-3 text-base text-gray-700">1972</td>
// 					</tr>
// 					<tr className="bg-white">
// 						<td className="p-3 text-base text-gray-700">Shining Star</td>
// 						<td className="p-3 text-base text-gray-700">You</td>
// 						<td className="p-3 text-base text-gray-700 flex justify-left">
// 							<div className="inline-flex bg-green-600 text-white px-2 py-1 rounded text-base items-center">
// 								Not Explicit
// 							</div>
// 						</td>
// 						<td className="p-3 text-base text-gray-700">1975</td>
// 					</tr>
// 				</tbody>
// 			</table>
// 		</div>
// 	);
// }
