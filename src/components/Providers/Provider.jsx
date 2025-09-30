import { createContext, useContext, useState } from "react";
import { theme } from "../../data/theme";

const ThemeContext = createContext()

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
    const [color, setColor] = useState(theme[3]);

    const handleTheme = (e) => {
        setColor(theme[e])
    }
    return (
        <ThemeContext.Provider value={{ color, handleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
