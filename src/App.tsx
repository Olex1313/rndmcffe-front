import React, {useState} from 'react';
import {Profile} from "./Profile";
import {Subscriptions} from "./Subscriptions";
import {Meetings} from "./Meetings";
import {MainPage} from "./MainPage";
import {ContactsPage} from "./ContactsPage";
import {Principles} from "./Principles";
import {SignInPage} from "./SignInPage"
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
    useTheme, AppBar, Typography, Stack, Toolbar, Button, PaletteMode, CssBaseline, Link
} from "@mui/material";
import {Logout, Settings, Brightness4, Brightness7, Coffee} from "@mui/icons-material";
import {grey} from "@mui/material/colors";
import {RegisterPage} from "./RegisterPage";

type PageState =
    "profile"
    | "subscriptions"
    | "meetings"
    | "main-page"
    | "contacts"
    | "principles"
    | "signin"
    | "register"

const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

const getThemeDesign = (mode: PaletteMode) => ({
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

function App() {
    const [page, setPage] = useState<PageState>("main-page")
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    function renderState(state: PageState) {
        switch (state) {
            case "main-page":
                return <MainPage/>
            case "profile":
                return <Profile/>;
            case "subscriptions":
                return <Subscriptions/>;
            case "meetings":
                return <Meetings/>;
            case "contacts":
                return <ContactsPage/>
            case "principles":
                return <Principles/>
            case "signin":
                return <SignInPage onSuccess={() => setPage("profile")} onRegister={() => setPage("register")}/>
            case "register":
                return <RegisterPage callback={() => setPage("profile")}/>
        }
    }

    function AccountMenu() {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        };

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
                    <MenuItem onClick={() => setPage("profile")}>
                        <Avatar/> Профиль
                    </MenuItem>
                    <Divider/>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small"/>
                        </ListItemIcon>
                        Настройки приложения
                    </MenuItem>
                    <MenuItem onClick={() => setPage("signin")}>
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
                            onClick={() => setPage("main-page")}
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
                                    onClick={() => setPage("meetings")}>Встречи</Button>
                            <Button sx={{my: 2, color: 'white', display: 'block'}}
                                    onClick={() => setPage("subscriptions")}>Подписки</Button>
                            <Button sx={{my: 2, color: 'white', display: 'block'}}
                                    onClick={() => setPage("principles")}>Как ходить на встречи</Button>
                            <Button sx={{my: 2, color: 'white', display: 'block'}}
                                    onClick={() => setPage("contacts")}>Работать с нами</Button>
                        </Box>
                        {AccountMenu()}
                        <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness4/> : <Brightness7/>}
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container className="StatePageContainer">
                {renderState(page)}
            </Container>
            <Copyright sx={{mt: 8, mb: 4}}/>
            {/*<div className="PageFooter">*/}
            {/*    © {new Date().getFullYear()} <a href="https://github.com/Olex1313"> Copyright aalim-corp </a>*/}
            {/*</div>*/}
        </Stack>
    );
}
