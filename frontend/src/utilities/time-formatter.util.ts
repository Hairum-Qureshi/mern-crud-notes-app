export default function formatDate(utcDate: string): string {
	const date = new Date(utcDate);

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	};

	const formattedDate = date.toLocaleDateString("en-US", options);
	return formattedDate;
}
