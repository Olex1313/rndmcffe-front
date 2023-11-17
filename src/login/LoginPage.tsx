import React from 'react';
import {Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography} from "@mui/material";

const handleSubmit = async (event: any, onSuccess: VoidFunction, onError: VoidFunction) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    fetch("http://localhost:8080/login", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                "login": data.get("email") as string,
                "password": data.get("password") as string
            })
        }
    ).then((res) => {
            res.ok ? onSuccess() : console.log("ERROR")
        }, err => {
            console.log(err)
            onError()
        }
    )
};

interface SignInCallbacks {
    onSuccess: () => void
    onRegister: () => void
}

export class LoginPage extends React.Component<SignInCallbacks> {
    render() {
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
                            this.props.onSuccess,
                            () => console.log("ERROR")
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
                        <Grid container>
                            <Grid item xs>
                                <Link variant="body2">
                                    Забыли Пароль?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link onClick={this.props.onRegister} variant="body2">
                                    {"Зарегистрироваться"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        )
    }
}