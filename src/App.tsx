import React from 'react';
import {Profile} from "./profile/Profile";
import {Subscriptions} from "./Clubs";
import {Meetings} from "./Meetings";
import {MainPage} from "./MainPage";
import {
    Box, createTheme,
    Container,
    IconButton,
    ThemeProvider,
    useTheme, AppBar, Typography, Stack, Toolbar, Button, CssBaseline, Link
} from "@mui/material";
import {Brightness4, Brightness7, Coffee} from "@mui/icons-material";
import {Route, Routes, useNavigate} from "react-router-dom";
import {ColorModeContext, getThemeDesign} from './Theme';
import {OpenAPI} from "./api";
import {PrivateRoute} from "./auth/PrivateRoute";
import LoginPage from './login/LoginPage';
import RegisterPage from './login/RegisterPage';
import CompactProfile from "./profile/CompactProfile";

export default function ToggleColorMode() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(() => createTheme(getThemeDesign(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="background.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/Olex1313">
                aalim-corp
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

OpenAPI.BASE = "http://localhost:8080"
OpenAPI.WITH_CREDENTIALS = true

function App() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const navigation = useNavigate()

    return (
        <Stack className="MainContainer">
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Coffee sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            onClick={() => navigation("/")}
                        >
                            Rndmcffe
                        </Typography>

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <Button sx={{my: 2, color: 'white', display: 'block'}}
                                    onClick={() => navigation("/meetings")}>Встречи</Button>
                            <Button sx={{my: 2, color: 'white', display: 'block'}}
                                    onClick={() => navigation("/clubs")}>Подписки</Button>
                        </Box>

                        <CompactProfile/>
                        <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness4/> : <Brightness7/>}
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container className="StatePageContainer">
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/meetings" element={<Meetings/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/clubs" element={<Subscriptions/>}/>
                    </Route>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                </Routes>
            </Container>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Stack>
    );
}
