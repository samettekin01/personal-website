import { createContext, useContext, useEffect, useState } from "react";
import { theme } from "../../data/theme";

const ThemeContext = createContext()

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
    const [color, setColor] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? JSON.parse(savedTheme) : theme[3];
    }
    );

    const handleTheme = (e) => {
        setColor(theme[e])  
    }

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(color))
    })
    return (
        <ThemeContext.Provider value={{ color, handleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
