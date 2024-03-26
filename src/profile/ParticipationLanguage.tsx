import React from "react";
import {User, UsersService} from "../api";
import {Stack, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {PaddedPaper} from "../common/PaddedPaper";
import {onError} from "../common/OnError";

interface ParticipationLanguageProps {
    language: User.meeting_language
}

export const ParticipationLanguage = (props: ParticipationLanguageProps) => {
    const [alignment, setAlignment] = React.useState(props.language);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: User.meeting_language.RU,
    ) => {
        UsersService.updateMyProfile({meeting_language: props.language})
            .then(() => setAlignment(newAlignment), onError)
    };

    const availableValues = Object
        .entries(User.meeting_language)
        .map(([value, label]) => <ToggleButton key={value}
                                               value={value}>{label}</ToggleButton>)

    return (
        <PaddedPaper>
            <Stack spacing={2}>
                <Typography variant="h6">Выберите язык общения</Typography>
                <Stack direction="row">
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Язык общения">
                        {availableValues}
                    </ToggleButtonGroup>
                </Stack>
            </Stack>
        </PaddedPaper>

    );
}