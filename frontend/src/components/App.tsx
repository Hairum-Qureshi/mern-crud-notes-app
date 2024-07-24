import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import Form from "./Form";
import Note from "./Note";
import { SessionProvider } from "../contexts/sessionContext";

export default function App() {
	return (
		<BrowserRouter>
			<SessionProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/new-note" element={<Form />} />
					<Route path="/note/:note_id" element={<Note />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</SessionProvider>
		</BrowserRouter>
	);
}
