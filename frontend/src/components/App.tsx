import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import Form from "./Form";
import Note from "./Note";
import { SessionProvider } from "../contexts/sessionContext";
import NotesViewer from "./NotesViewer";
import Disclaimer from "../components/Disclaimer";
import Contact from "./Contact";

export default function App() {
	return (
		<BrowserRouter>
			<SessionProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/disclaimers" element={<Disclaimer />} />
					<Route path="/new-note" element={<Form />} />
					<Route path="/note/:note_id" element={<Note />} />
					<Route path="/note/:note_id/edit" element={<Form />} />
					<Route path="/notes/all" element={<NotesViewer />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</SessionProvider>
		</BrowserRouter>
	);
}
