import { useTheme } from "../contexts/themeContext";
import { tailspin } from "ldrs";
import { LoadingSpinnerProps } from "../interfaces";

tailspin.register();

export default function LoadingSpinner({ children }: LoadingSpinnerProps) {
	const loadingMessage = children as string;
	const { theme } = useTheme()!;

	return theme === "dark" ? (
		<>
			<l-tailspin size="40" stroke="5" speed="0.9" color="white"></l-tailspin>
			<h1 className="text-2xl text-white font-semibold ml-3">
				{loadingMessage}
			</h1>
		</>
	) : (
		<>
			<l-tailspin size="40" stroke="5" speed="0.9" color="black"></l-tailspin>
			<h1 className="text-2xl font-semibold ml-3">{loadingMessage}</h1>
		</>
	);
}
