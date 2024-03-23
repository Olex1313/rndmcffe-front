import React from "react";
import {User, UsersService} from "../api";
import {Autocomplete, TextField, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {PaddedPaper} from "../common/PaddedPaper";
import {onError} from "../common/OnError";

interface ParticipationModeProps {
    city: string
    participationMode: User.meeting_mode
}

export const ParticipationMode = (props: ParticipationModeProps) => {

    const [alignment, setAlignment] = React.useState(props.participationMode);

    const handleParticipationModeChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: User.meeting_mode,
    ) => {
        UsersService.updateMyProfile({
            meeting_mode: newAlignment
        }).then(() => setAlignment(newAlignment), onError)
    };

    const availableValues = Object.values(User.meeting_mode).map((value) =>
        <ToggleButton key={value} value={value} selected={alignment.toString() === value}>{value}</ToggleButton>)

    const [curCity, setCity] = React.useState(props.city)

    const handleCityChange = (
        event: any,
        newCity: string | null
    ) => {
        if (newCity != null) {
            UsersService.updateMyProfile({
                city: newCity
            }).then(() => setCity(newCity), onError)
        }
    }

    return (
        <PaddedPaper>
            <Typography variant="h6">Формат участия</Typography>
            <ToggleButtonGroup
                color="primary"
                defaultValue={alignment}
                value={alignment}
                exclusive
                onChange={handleParticipationModeChange}
                aria-label="Формат участия"
            >
                {availableValues}
            </ToggleButtonGroup>
            <Autocomplete
                options={["Ижевск", "Самара"]}
                renderInput={
                    (params) => <TextField {...params} label="Город"/>
                }
                onChange={handleCityChange}
                noOptionsText="Такого города нет"
                value={curCity}
                fullWidth
                sx={{mt: 3, mb: 2}}
                id="city"
            />
        </PaddedPaper>
    )
}