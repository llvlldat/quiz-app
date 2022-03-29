import { createContext, useState } from "react";

const userContext = createContext();

export default function ContextProvider({ children }) {
    const [user, setUser] = useState(() => {
        if (localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user"));
        }
        return {};
    });

    const value = {
        user: user,
        setUser: setUser,
    };

    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    );
}

export { userContext };
