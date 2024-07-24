import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { SessionProps, ContextData } from "../interfaces";

export const SessionContext = createContext<ContextData | null>(null);

export const SessionProvider = ({ children }: SessionProps) => {
	const [currUID, setCurrUID] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Implement the functions related to your context here. For example, since this is called 'AuthContext', its purpose is to handle authentication so here you'd have a bunch of functions handling authentication, getting the current logged in user's data, etc.

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