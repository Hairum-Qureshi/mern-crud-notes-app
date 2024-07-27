import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StickyNote as StickyNoteInterface } from "../interfaces";

interface Props {
	stickyNote: StickyNoteInterface;
}

export default function StickyNote({ stickyNote }: Props) {
	return (
		<div
			className="border border-black min-w-60 w-auto min-h-60 h-auto max-h-72 max-w-72 m-3 rounded-md
        bg-yellow-300 p-2
    "
		>
			<div className="flex">
				<div className="w-6 h-6 rounded-full bg-yellow-500 border border-black"></div>
				<div className="w-6 h-6 rounded-full bg-pink-500 border border-black ml-2"></div>
				<div className="w-6 h-6 rounded-full bg-sky-500 border border-black ml-2"></div>
				<div className="w-6 h-6 rounded-full bg-lime-500 border border-black ml-2"></div>
				<div className="w-6 h-6 rounded-full bg-purple-500 border border-black ml-2"></div>
				<div className="w-6 h-6 rounded-full bg-slate-500 border border-black ml-2"></div>
				<div className="w-6 h-6 rounded-full bg-black border border-black ml-2"></div>
				<div className="ml-auto px-2 py-1 rounded bg-red-600 text-white text-base hover:cursor-pointer">
					<FontAwesomeIcon icon={faX} />
				</div>
			</div>
			<h1 className="font-semibold text-xl">Hello</h1>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus
				cupiditate eligendi dignissimos eveniet non ipsa voluptas, nulla
				quisquam officia nobis, reiciendis, pariatur expedita autem odit modi
				illum placeat velit voluptate asperiores. Illo odio, magni molliti!
			</p>
		</div>
	);
}
