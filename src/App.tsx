import React, {useState} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Profile} from "./Profile";
import {Subscriptions} from "./Subscriptions";
import {Meetings} from "./Meetings";
import {MainPage} from "./MainPage";
import {Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import {Logout, Settings} from "@mui/icons-material";

type PageState = "profile" | "subscriptions" | "meetings" | "main-page"

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
    }
}

function App() {
    const [page, setPage] = useState<PageState>("main-page")

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
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Настройки профиля">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
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
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => setPage("profile")}>
                        <Avatar /> Профиль
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Настройки приложения
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Выйти
                    </MenuItem>
                </Menu>
            </React.Fragment>
        );
    }

    return (
        <div className="MainContainer">
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home" onClick={() => setPage("main-page")}>Rndmcffe</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Nav>
                        <Nav.Link onClick={() => setPage("meetings")}>Встречи</Nav.Link>
                        <Nav.Link onClick={() => setPage("subscriptions")}>Подписки</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Item>{AccountMenu()}</Nav.Item>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="StatePageContainer">
                {renderState(page)}
            </Container>
            <div className="PageFooter">
                © {new Date().getFullYear()} <a href="https://github.com/Olex1313"> Copyright aalim-corp </a>
            </div>
        </div>
    );
}

export default App;
