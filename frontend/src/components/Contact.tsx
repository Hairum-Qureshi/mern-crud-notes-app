import { useEffect } from "react";

export default function Contact() {
	useEffect(() => {
		document.title = "Contact";
	}, []);

	return <div>Contact</div>;
}
