import { useEffect, useState } from "react";
import useNotes from "../hooks/useNotes";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import useSessionContext from "../contexts/sessionContext";
import { useTheme } from "../contexts/themeContext";
import formatDate from "../utilities/time-formatter.util";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";

export default function Note() {
	const { getNoteData, noteData, loadingStatus } = useNotes();
	const { currUID } = useSessionContext()!;
	const [showModal, setShowModal] = useState(false);

	const note_id = window.location.href.split("/").pop();
	useEffect(() => {
		if (note_id) {
			getNoteData(note_id);
		}
	}, [note_id]);

	useEffect(() => {
		if (noteData) {
			document.title = noteData.note_title;
		}
	}, [noteData]);

	function toggleModal() {
		setShowModal(false);
	}

	const { theme } = useTheme()!;

	return (
		<div className={`${theme === "dark" ? "dark" : ""}`}>
			{noteData && showModal && (
				<Modal
					modalType="confirmation"
					heading="Hang on!"
					toggleModal={toggleModal}
					noteID={noteData?._id}
					modalFor="note"
				>
					Are you sure you would like to delete your note titled "
					{noteData?.note_title}"? This action cannot be undone!
				</Modal>
			)}
			<div className="flex items-center flex-col w-full min-h-[calc(100vh+3.5rem)] max-h-auto bg-[#f7f8fc] pb-10 dark:bg-slate-800 dark:text-white">
				<div className="w-full lg:w-7/12 mt-7">
					{loadingStatus ? (
						<div className="flex flex-row mt-48 justify-center items-center">
							<div className="flex items-center">
								<LoadingSpinner>LOADING NOTE DATA...</LoadingSpinner>
							</div>
						</div>
					) : (
						<>
							{!noteData ? (
								<div>
									{/* <Link to="/">
									<div className="flex items-center text-lg">
										<FontAwesomeIcon icon={faArrowLeftLong} />
										<h1 className="ml-2">Go Back Home</h1>
									</div>
								</Link> */}
									<h1 className="text-center font-semibold text-2xl mt-10">
										Sorry, this note might've been deleted or doesn't exist
									</h1>
								</div>
							) : (
								<div className="p-4 rounded">
									{/* <Link to="/">
									<div className="flex items-center text-lg">
										<FontAwesomeIcon icon={faArrowLeftLong} />
										<h1 className="ml-2">Go Back Home</h1>
									</div>
								</Link> */}
									<h1 className="text-3xl font-semibold">
										{noteData?.note_title}
									</h1>
									{noteData?.containsProfanity ? (
										<div className="bg-red-600 p-1 mt-2 inline-block rounded">
											<p className="text-white text-sm px-2">
												Content Contains Profanity
											</p>
										</div>
									) : null}
									<div className="mt-2 flex items-center">
										<p className="text-sm">
											Posted on {formatDate(noteData?.createdAt)}
											<br />
											{noteData?.updatedAt !== noteData?.createdAt && (
												<p className="text-sm text-blue-700 dark:text-sky-400">
													Updated on {formatDate(noteData?.updatedAt)}
												</p>
											)}
										</p>

										{currUID === noteData?.curr_uid && (
											<div className="ml-auto">
												<Link to={`/note/${noteData._id}/edit`}>
													<FontAwesomeIcon
														icon={faPenToSquare}
														className="bg-orange-400 dark:bg-orange-500 dark:text-black p-1 text-lg rounded hover:cursor-pointer"
													/>
												</Link>
												<FontAwesomeIcon
													icon={faTrash}
													className="ml-2 bg-red-500 p-1 text-lg text-slate-100 rounded hover:cursor-pointer"
													onClick={() => setShowModal(true)}
												/>
											</div>
										)}
									</div>
									<div className="mt-6 text-base whitespace-pre-wrap">
										{noteData?.note_content}
									</div>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
