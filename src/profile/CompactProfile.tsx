import React from "react";
import {Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import {Logout, Person, Settings} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import useAuth from "../auth/AuthHook";


const CompactProfile = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const {isAuthenticated, setAuth} = useAuth()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        isAuthenticated ? setAnchorEl(event.currentTarget) : navigate('/login')
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                <Tooltip title="Профиль">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{width: 32, height: 32}}><Person/></Avatar>
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
                <MenuItem onClick={() => navigate("/profile")}>
                    <Avatar/> Профиль
                </MenuItem>
                <Divider/>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                    Настройки приложения
                </MenuItem>
                <MenuItem onClick={() => {
                    setAuth(false)
                    document.cookie = `SESSION_ID=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
                    navigate("/login")
                }}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Выйти
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default CompactProfile