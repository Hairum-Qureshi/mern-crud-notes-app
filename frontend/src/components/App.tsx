import "../css/index.css";

// Long Notes:
// Titles cannot have profanity, but body text can have filtered profanity

// Sticky Notes:
// No profanity whatsoever

export default function App() {
	return (
		<div className="w-full h-screen p-5">
			<div>
				<div className="flex items-center">
					<h1 className="text-3xl font-semibold">
						Anonymous Notes - Speak Your Mind
					</h1>
					<div className="ml-auto">
						<button className="bg-black text-white p-2 rounded text-base mr-2">
							Disclaimers
						</button>
						<button className="bg-sky-900 text-white p-2 rounded text-base 2">
							Change Theme
						</button>
					</div>
				</div>
				<div>
					<button className="bg-sky-700 text-white p-2 rounded text-base mt-2">
						Create a Sticky Note
					</button>
				</div>
				<div>
					<button className="bg-slate-700 text-white p-2 rounded text-base mt-2">
						Create a Big Note
					</button>
				</div>
			</div>
		</div>
	);
}
