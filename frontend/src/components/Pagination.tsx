import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { PaginationProps } from "../interfaces";

export default function Pagination({
	totalNotes,
	pageNumber,
	numPages,
	numButtons
}: PaginationProps) {
	return (
		totalNotes > 9 && (
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
		)
	);
}
