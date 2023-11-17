import React from "react";
import {
    Autocomplete,
    Box,
    Button,
    Container,
    TextField,
    Typography
} from "@mui/material";
import {DefaultService} from "../api";

export const doRegister = (event: any, onSuccess: VoidFunction, onError: VoidFunction) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    DefaultService.userRegister({
        login: data.get("login") as string,
        password: data.get("password") as string,
        tg_login: data.get("tg_login") as string,
        city: data.get("city") as string,
        first_name: data.get("first_name") as string,
        last_name: data.get("last_name") as string,
        email: data.get("email") as string
    }).then(
        () => onSuccess(),
        () => onError()
    )
}

export class RegisterPage extends React.Component<{ onSuccess: VoidFunction, onError: VoidFunction }> {

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-evenly"
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <Box component="form"
                         onSubmit={(event) => doRegister(event, this.props.onSuccess, this.props.onError)}
                         sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="first_name"
                            label="Имя"
                            name="first_name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="last_name"
                            label="Фамилия"
                            name="last_name"
                            autoFocus
                        />
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
                            id="login"
                            label="Логин"
                            name="login"
                            autoComplete="login"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="telegramLogin"
                            label="Логин в Telegram"
                            name="tg_login"
                            // helperText="Начиная с @, например @olexvp"
                            autoComplete="login"
                            autoFocus
                        />
                        <Autocomplete
                            options={["Ижевск", "Самара"]}
                            renderInput={
                                (params) => <TextField {...params} name="city" id="city" label="Город"/>
                            }
                            noOptionsText="Такого города нет"
                            fullWidth
                            sx={{mt: 3, mb: 2}}
                            id="city"
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Зарегистрироваться
                        </Button>
                    </Box>
                </Box>
            </Container>
        )
    }
}