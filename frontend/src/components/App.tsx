import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import Note from "./Note";
import { SessionProvider } from "../contexts/sessionContext";
import NotesViewer from "./NotesViewer";
import Disclaimer from "../components/Disclaimer";
import Navbar from "./Navbar";
import StickyNotesDisplay from "./StickyNotesDisplay";
import { ThemeProvider } from "../contexts/themeContext";
import SplitPanel from "./SplitPanel";

// TODO - consider removing navbar on 404 page

export default function App() {
	return (
		<BrowserRouter>
			<ThemeProvider>
				<SessionProvider>
					<div className="flex items-center bg-slate-900 text-white">
						<Navbar />
					</div>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/contact" element={<SplitPanel />} />
						<Route path="/important" element={<Disclaimer />} />
						<Route path="/sticky-notes" element={<StickyNotesDisplay />} />
						<Route path="/new-note" element={<SplitPanel />} />
						<Route path="/note/:note_id" element={<Note />} />
						<Route path="/note/:note_id/edit" element={<SplitPanel />} />
						<Route path="/notes/all" element={<NotesViewer />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</SessionProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
}
