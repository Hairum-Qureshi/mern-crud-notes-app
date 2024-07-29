import { createContext, useContext, useState } from "react";
import { ContextProps, ThemeContextData } from "../interfaces";

const ThemeContext = createContext<ThemeContextData | null>(null);

export function useTheme() {
	return useContext(ThemeContext);
}

export function ThemeProvider({ children }: ContextProps) {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(
		localStorage.getItem("theme") === "dark" || false
	);

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);

		console.log(isDarkMode);

		if (isDarkMode) {
			localStorage.setItem("theme", "light");
		} else {
			localStorage.setItem("theme", "dark");
		}
	};

	const theme = isDarkMode ? "dark" : "light";

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
