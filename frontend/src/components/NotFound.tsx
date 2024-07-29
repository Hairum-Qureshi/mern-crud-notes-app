import { useTheme } from "../contexts/themeContext";

export default function NotFound() {
	const { theme } = useTheme()!;

	return (
		<div className={`${theme === "dark" ? "dark" : ""}`}>
			<div className="flex flex-row lg:h-[calc(100vh-3.5rem)] h-[calc(100vh-2.5rem)] dark:bg-slate-800 dark:text-slate-50 text-3xl font-semibold justify-center items-center">
				404 - Page Not Found!
			</div>
		</div>
	);
}
