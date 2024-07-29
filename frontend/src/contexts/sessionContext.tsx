import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { ContextProps, ContextData } from "../interfaces";

export const SessionContext = createContext<ContextData | null>(null);

export const SessionProvider = ({ children }: ContextProps) => {
	const [currUID, setCurrUID] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Implement the functions related to your context here. For example, since this is called 'AuthContext', its purpose is to handle authentication so here you'd have a bunch of functions handling authentication, getting the current logged in user's data, etc.

	useEffect(() => {
		async function getUser() {
			await axios
				.get("http://localhost:4000/api/user/current-session", {
					withCredentials: true
				})
				.then(response => {
					setCurrUID(response.data);
				})
				.catch(error => {
					console.log(error);
					// console.log(error.response.data.error);
				});
		}
		getUser();
	}, []);

	const value: ContextData = {
		currUID,
		error
	};

	return (
		<SessionContext.Provider value={value}>{children}</SessionContext.Provider>
	);
};

const useSessionContext = () => {
	return useContext(SessionContext);
};

export default useSessionContext;
