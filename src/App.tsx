import React, {useEffect, useState} from 'react';
import {Profile} from "./Profile";
import {Subscriptions} from "./Subscriptions";
import {Meetings} from "./Meetings";
import {MainPage} from "./MainPage";
import {
    Avatar,
    Box, createTheme,
    Container,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    ThemeProvider,
    Tooltip,
    useTheme, AppBar, Typography, Stack, Toolbar, Button, CssBaseline, Link
} from "@mui/material";
import {Logout, Settings, Brightness4, Brightness7, Coffee} from "@mui/icons-material";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {ColorModeContext, getThemeDesign} from './Theme';
import {LoginPage} from "./login/LoginPage";
import {RegisterPage} from "./login/RegisterPage";
import {DefaultService, OpenAPI} from "./api";
import {Store} from 'react-notifications-component';

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

const PrivateWrapper = ({isLoggedIn, redirectTo = "/login", children}: {
    children: JSX.Element,
    isLoggedIn: boolean,
    redirectTo: string
}) => {
    useEffect(() => {
        fetch('http://localhost:8080/users/me', {
                method: "GET",
                credentials: "include"
            }
        ).then(res => res.ok ? isLoggedIn = true : isLoggedIn = false)
    }, [])

    if (isLoggedIn) {
        return children
    }
    try {
        Store.addNotification({
            title: "Мы вас не узнали",
            type: "warning",
            message: "Пожалуйста авторизуйтесь",
            container: "top-right",
            dismiss: {
                duration: 500,
                pauseOnHover: true
            }
        })
    } catch (e) {
        console.log(e)
    }
    return <Navigate to={redirectTo} replace/>
}

OpenAPI.BASE = "http://localhost:8080"
OpenAPI.WITH_CREDENTIALS = true

function App() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const navigation = useNavigate()

    const [loggedIn, setLoggedIn] = useState(false)

    const onAuthSuccess = () => {
        setLoggedIn(true)
        navigation("/profile")
    }

    const onRegisterSuccess = () => {
        onAuthSuccess()
    }

    const onAuthErr = () => {
        Store.addNotification({
            title: "Ошибка",
            type: "danger",
            message: "Неправильный логин или пароль",
            container: "top-right"
        })
    }

    const onRegisterErr = () => {
        Store.addNotification({
            title: "Ошибка",
            type: "danger",
            message: "Что-то пошло не так :(",
            container: "top-right"
        })
    }

    function AccountMenu() {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        };
        const onLogoutClick = async () => {
            // doLogout()
            await DefaultService.userLogout().then(
                () => console.log("logout succeeded"),
                () => console.log("failed to logout")
            )
            setLoggedIn(false)
            document.cookie = `SESSION_ID=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
            navigation("/login")
        }

        const handleClose = () => {
            setAnchorEl(null);
        };

        return (
            <React.Fragment>
                <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                    <Tooltip title="Настройки профиля">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ml: 2}}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{width: 32, height: 32}}>M</Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                    <MenuItem onClick={() => navigation("/profile")}>
                        <Avatar/> Профиль
                    </MenuItem>
                    <Divider/>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small"/>
                        </ListItemIcon>
                        Настройки приложения
                    </MenuItem>
                    <MenuItem onClick={onLogoutClick}>
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Выйти
                    </MenuItem>
                </Menu>
            </React.Fragment>
        );
    }

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
                                    onClick={() => navigation("/subscribtions")}>Подписки</Button>
                        </Box>
                        {AccountMenu()}
                        <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness4/> : <Brightness7/>}
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container className="StatePageContainer">
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/meetings"
                           element={<PrivateWrapper isLoggedIn={loggedIn}
                                                    redirectTo="/login"><Meetings/></PrivateWrapper>}/>
                    <Route path="/profile" element={<PrivateWrapper isLoggedIn={loggedIn} redirectTo="/login"><Profile/></PrivateWrapper>}/>
                    <Route path="/subscribtions"
                           element={<PrivateWrapper isLoggedIn={loggedIn}
                                                    redirectTo="/login"><Subscriptions/></PrivateWrapper>}/>
                    <Route path="/register"
                           element={<RegisterPage onSuccess={onRegisterSuccess} onError={onRegisterErr}/>}/>
                    <Route path="/login" element={<LoginPage onRegister={() => navigation("/register")}
                                                             onSuccess={onAuthSuccess} onErr={onAuthErr}/>}/>
                </Routes>
            </Container>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Stack>
    );
}
