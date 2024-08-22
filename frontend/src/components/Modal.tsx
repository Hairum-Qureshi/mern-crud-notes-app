import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useNotes from "../hooks/useNotes";
import useStickyNotes from "../hooks/useStickyNotes";
import { ModalProps } from "../interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// TODO - add hover effects on the buttons

export default function Modal({
	children,
	modalType,
	heading,
	toggleModal,
	noteID,
	modalFor,
	handleStickyNoteDeletion
}: ModalProps) {
	const message = children as string;

	const { deleteNote } = useNotes();
	const { deleteStickyNote } = useStickyNotes();
	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: async (note_id: string | number) => {
			return deleteStickyNote(note_id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["sticky-notes"]
			});
		}
	});

	function stickyNoteDeletion(note_id: string | number) {
		deleteMutation.mutate(note_id);
		deleteStickyNote(note_id);
	}

	return (
		<div
			className={`m-auto lg:w-1/2 w-11/12 border-box text-white bg-slate-800 p-2 absolute left-0 right-0 top-32 rounded-md dark:bg-sky-950 dark:border dark:border-sky-400 z-10 ${
				modalType !== "confirmation" && "pb-5"
			}`}
		>
			<div
				className="w-full text-right text-xl hover:cursor-pointer"
				onClick={toggleModal}
			>
				<FontAwesomeIcon icon={faX} className="mr-2" />
			</div>
			<div className="m-2">
				<h1 className="text-2xl font-semibold mb-2">{heading}</h1>
				<p className="text-lg">{message}</p>
			</div>
			{modalType === "confirmation" && (
				<div className="w-full flex">
					<div className="ml-auto p-3">
						<button
							className="p-1 border-2 text-black bg-slate-200 border-slate-500 rounded-md w-28 mr-2"
							onClick={toggleModal}
						>
							Cancel
						</button>
						<button
							className="p-1 border-2 bg-red-700 border-red-600 rounded-md w-28"
							onClick={() => {
								if (modalFor == "note") {
									deleteNote(noteID as string);
								} else {
									handleStickyNoteDeletion!(
										(noteID as string) || (noteID as number)
									);
									stickyNoteDeletion((noteID as string) || (noteID as number));
								}

								toggleModal();
							}}
						>
							Delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
