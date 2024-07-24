import { useEffect } from "react";
import useNotes from "../hooks/useNotes";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

export default function Note() {
	const { getNoteData, noteData } = useNotes();

	const note_id = window.location.href.split("/").pop();
	useEffect(() => {
		if (note_id) {
			getNoteData(note_id);
		}
	}, [note_id]);

	// TODO - need to add buttons for editing/deleting notes

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
		<div className="flex items-center flex-col w-full">
			<div className="w-full lg:w-7/12 mt-7">
				{!noteData ? (
					<div>
						<Link to="/">
							<div className="flex items-center text-lg">
								<FontAwesomeIcon icon={faArrowLeftLong} />
								<h1 className="ml-2">Go Back Home</h1>
							</div>
						</Link>
						<h1 className="text-center font-semibold text-2xl mt-10">
							Sorry, this note might've been deleted or doesn't exist
						</h1>
					</div>
				) : (
					<div className="p-4 rounded">
						<Link to="/">
							<div className="flex items-center text-lg">
								<FontAwesomeIcon icon={faArrowLeftLong} />
								<h1 className="ml-2">Go Back</h1>
							</div>
						</Link>
						<h1 className="text-3xl font-semibold">{noteData?.note_title}</h1>
						{noteData?.containsProfanity ? (
							<div className="bg-red-600 p-1 mt-2 inline-block rounded">
								<p className="text-white text-sm px-2">
									Content Contains Profanity
								</p>
							</div>
						) : null}
						<p className="text-sm">
							Posted on {formatDate(noteData?.createdAt)}
						</p>
						<div className="mt-6 text-base whitespace-pre-wrap">
							{noteData?.note_content}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
