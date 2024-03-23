import React from "react";
import {Button, Chip, Dialog, DialogTitle, Grid, MenuItem, Stack, Typography} from "@mui/material";
import {PaddedPaper} from "../common/PaddedPaper";
import {UsersService} from "../api";
import {onError} from "../common/OnError";

const interestsConst = ['Coffee', 'ProductManagement', 'Programming', 'MachineLearning', 'GameDev', 'Sport', 'Music']

type UserInterest = 'Coffee' | 'ProductManagement' | 'Programming' | 'MachineLearning' | 'GameDev' | 'Sport' | 'Music'

interface InterestsDialogueProps {
    initialInterests: UserInterest[]

}

export interface InterestData {
    selected: boolean;
    label: UserInterest
}

const mergeInterests = (userInterests: UserInterest[]) => {
    return interestsConst.map((key) => {
        return {
            label: key as UserInterest,
            selected: userInterests.findIndex((it) => it === key) !== -1
        }
    })
}

// TODO use memo for callbacks
export const InterestsDialogueComponent = (props: InterestsDialogueProps) => {
    const [chipData, setChipData] = React.useState<InterestData[]>(() => mergeInterests(props.initialInterests));

    const [dialogueOpen, setDialogueOpen] = React.useState(false);
    const [interestData, setInterestData] = React.useState<InterestData[]>(() => mergeInterests(props.initialInterests))

    const onChipClick = (clicked: InterestData) => () => {
        setChipData((chips) => chips.map((chip) => {
            return chip.label === clicked.label ? {label: clicked.label, selected: !clicked.selected} : chip
        }));
    }

    const handleCloseWithSave = () => {
        const newInterests = chipData.filter(it => it.selected)
        setDialogueOpen(false)
        UsersService.updateMyProfile({interests: newInterests.map(it => it.label)})
            .then(() => setInterestData(newInterests), onError)
    }

    const handleOnClick = () => {
        setDialogueOpen(true)
        setChipData(mergeInterests(interestData.filter(it => it.selected).map(it => it.label)))
    }

    return (
        <PaddedPaper>
            <Stack spacing={2}>
                <Typography variant="h6">Что интересно обсудить</Typography>
                <Stack direction="row">
                    {interestData
                        .filter((it) => it.selected)
                        .map((anInterest) => <Chip key={anInterest.label}
                                                   label={anInterest.label}/>)}
                </Stack>
                <Button variant="contained" fullWidth={true} onClick={handleOnClick}>Настроить
                    интересы</Button>
                <Dialog onClose={() => {
                    setDialogueOpen(false)
                }} open={dialogueOpen}>
                    <PaddedPaper>
                        <DialogTitle>Настроить интересы</DialogTitle>
                        <Grid>
                            {chipData.map((data) => {
                                return (
                                    <MenuItem key={data.label}>
                                        <Chip
                                            label={data.label}
                                            variant={data.selected ? 'filled' : 'outlined'}
                                            color={data.selected ? 'success' : 'primary'}
                                            onClick={onChipClick(data)}
                                        />
                                    </MenuItem>
                                );
                            })}
                        </Grid>
                        <Stack direction="row" spacing={2} padding="15px">
                            <Button variant="contained" onClick={() => {
                                setDialogueOpen(false)
                            }} size="small">Оставить как
                                было</Button>
                            <Button variant="outlined" onClick={handleCloseWithSave} size="small">Сохранить
                                выбор</Button>
                        </Stack>
                    </PaddedPaper>

                </Dialog>
            </Stack>
        </PaddedPaper>

    )
}