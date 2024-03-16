import React from 'react';
import {Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography} from "@mui/material";
import useAuth from "../auth/AuthHook";
import {useLocation, useNavigate} from "react-router-dom";
import {Store} from "react-notifications-component";
import { absoluteUrl } from '../host';

const handleSubmit = async (event: any, onSuccess: VoidFunction, onError: VoidFunction) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    fetch(absoluteUrl("/login"), {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                "login": data.get("email") as string,
                "password": data.get("password") as string
            })
        }
    ).then((res) => {
            res.ok ? onSuccess() : onError()
        }, err => {
            console.log(err)
            onError()
        }
    )
};
const LoginPage = () => {
    const {setAuth} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Авторизация
                </Typography>
                <Box component="form" onSubmit={
                    (event) => handleSubmit(
                        event,
                        () => {
                            setAuth(true)
                            navigate(from, {replace: true})
                        },
                        () => {
                            Store.addNotification({
                                title: "Ошибка",
                                type: "danger",
                                message: "Неправильный логин или пароль",
                                container: "top-right"
                            })
                        },
                    )
                } noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Логин или почта"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Запомнить меня"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Войти
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 1, mb: 2}}
                        onClick={() => navigate("/register")}
                    >
                        Зарегистрироваться
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default LoginPage