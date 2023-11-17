import {PaletteMode} from "@mui/material";
import {grey} from "@mui/material/colors";
import React from "react";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

export const getThemeDesign = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light')
            ? {
                // palette values for light mode
                background: {
                    primary: '#fff'
                },
                text: {
                    primary: grey[900],
                    secondary: grey[800],
                },
            } :
            {
                // palette values for dark mode
                background: {
                    primary: '#222222',
                    paper: grey[700],
                },
                text: {
                    primary: '#cbcbcb',
                    secondary: grey[500],
                },
            }
    }
})
