import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { ContextProps, SessionContextData } from "../interfaces";

export const SessionContext = createContext<SessionContextData | null>(null);

export const SessionProvider = ({ children }: ContextProps) => {
	const [currUID, setCurrUID] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function getUser() {
			await axios
				.get(
					`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/current-session`,
					{
						withCredentials: true
					}
				)
				.then(response => {
					setCurrUID(response.data);
				})
				.catch(error => {
					console.log(error);
					setError(error);
				});
		}
		getUser();
	}, []);

	const value: SessionContextData = {
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
