import React from "react";

export const theme = {
    inverted: true,
    menuIsOpen: false,
};

export const ThemeContext = React.createContext(
    theme.inverted,
);