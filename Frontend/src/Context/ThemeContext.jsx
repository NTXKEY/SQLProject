import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { themeContext } from "./Contexts";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      window.matchMedia("(prefers-color-scheme: dark)")
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <themeContext.Provider value={{ theme, handleToggle }}>
        {children}
      </themeContext.Provider>
    </>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
