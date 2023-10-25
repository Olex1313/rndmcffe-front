import React from "react";
import {
    Autocomplete,
    Box,
    Button,
    Container,
    TextField,
    Typography
} from "@mui/material";

interface VoidCallback {
    callback: () => void
}

export class RegisterPage extends React.Component<VoidCallback> {

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
                        Регистрация
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Электронная почта"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="telegramLogin"
                            label="Логин в Telegram"
                            name="telegramLogin"
                            autoComplete="login"
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
                        <Autocomplete
                            options={["Ижевск", "Самара"]}
                            renderInput={(params) => <TextField {...params} label="Город"/>}
                            noOptionsText="Такого города нет"
                            fullWidth
                            sx={{mt: 3, mb: 2}}
                            id="city"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={this.props.callback}
                        >
                            Зарегистрироваться
                        </Button>
                    </Box>
                </Box>
            </Container>
        )
    }
}