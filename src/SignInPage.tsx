import React from 'react';
import {Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography} from "@mui/material";

const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        email: data.get("email"),
        password: data.get("password"),
    });
};

interface SignInCallbacks {
    onSuccess: () => void
    onRegister: () => void
}

export class SignInPage extends React.Component<SignInCallbacks> {
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
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
                            onClick={this.props.onSuccess}
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