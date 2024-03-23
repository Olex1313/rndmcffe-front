import {FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography} from "@mui/material";
import React from "react";
import {PaddedPaper} from "../common/PaddedPaper";
import {UsersService} from "../api";
import {onError} from "../common/OnError";

const range = (start: number, stop: number, step = 1) =>
    Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)

interface ParticipationIntervalProps {
    start: number
    end: number
}

export const ParticipationIntervalComponent = (props: ParticipationIntervalProps) => {
    const [start, setStart] = React.useState<number>(props.start)
    const [end, setEnd] = React.useState<number>(props.end)

    const handleStartChange = (event: SelectChangeEvent) => {
        UsersService.updateMyProfile({
            meeting_time: {
                start: start,
                end: end
            }
        }).then(() => {
            setEnd(event.target.value as unknown as number + 2)
            setStart(event.target.value as unknown as number)
        }, onError)
    }

    const handleEndChange = (event: SelectChangeEvent) => {
        UsersService.updateMyProfile({
            meeting_time: {
                start: start,
                end: end
            }
        }).then(() => {
            setEnd(event.target.value as unknown as number)
            setStart(event.target.value as unknown as number - 2)
        }, onError)
    }

    return (
        <PaddedPaper>
            <Typography variant="h6">Интервал участия</Typography>
            <Typography variant="caption">Не менее 2 часов</Typography>
            <Stack direction="row" spacing={1}>
                <FormControl variant="standard">
                    <Select value={'' + start} onChange={handleStartChange} size="medium">
                        <MenuItem value={''} hidden/>
                        {range(12, 18).map((it) => <MenuItem key={it} value={it}>{it}:00</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl variant="standard">
                    <Select value={'' + end} onChange={handleEndChange} size="medium">
                        <MenuItem value={''} hidden/>
                        {range(14, 20).map((it) => <MenuItem key={it} value={it}>{it}:00</MenuItem>)}
                    </Select>
                </FormControl>
            </Stack>
            <Typography variant="overline">Время указывается исходя из часового пояса Europe/Moscow
                GMT+3</Typography>
        </PaddedPaper>
    )
}