import { createContext, useState } from "react";

const userContext = createContext();

export default function ContextProvider({ children }) {
    const [user, setUser] = useState({});

    const value = {
        user: user,
        setUser: setUser,
    };

    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    );
}

export { userContext };
