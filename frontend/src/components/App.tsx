import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
