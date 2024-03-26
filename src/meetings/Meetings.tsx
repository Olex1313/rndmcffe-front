import React, {useEffect, useState} from "react";
import "../style.css";
import {
    CardMedia,
    CardContent,
    Typography,
    Box,
    Stack,
    Paper,
    CircularProgress,
    Grid
} from "@mui/material";
import {UserContact} from "../api/models/UserContact";
import {absoluteUrl} from "../host";
import {CurrentSubscriptionsNotice} from "../clubs/CurrentSubscriptionsNotice";
import {PaddedPaper} from "../common/PaddedPaper";


const MeetingComponent = (meeting: UserContact) => {
    return (
        <Grid item xs={6} md={6}>
            <PaddedPaper>
                <CardMedia sx={{maxHeight: "194px", maxWidth: "167px"}} component="img" image="me-img.png"/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{meeting.user_name}</Typography>
                    <Typography>Когда: {
                        new Date(meeting.time).toLocaleDateString("ru-RU")
                    }</Typography>
                    <Typography>Где: {meeting.occupation}</Typography>
                </CardContent>
            </PaddedPaper>
        </Grid>
    )
}

interface MeetingsWrapperProps {
    meetings: UserContact[]
}

const MeetingsWrapper = (props: MeetingsWrapperProps) => {
    const {meetings} = props
    if (meetings.length === 0) {
        return (
            <Grid item container direction="column" alignItems="center" justifyContent="center"
                  sx={{height: '100%', width: '100%'}}>
                <img src="waiting.png" width={250} height={250}/>
                <Typography variant="h4">Скоро здесь появятся встречи</Typography>
                <Typography variant="body1">Мы уведомим вас о найденной паре по email</Typography>
            </Grid>
        )
    } else {
        return (
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                {
                    meetings.map(m => MeetingComponent(m))
                }
            </Grid>
        )
    }
}

export const Meetings = () => {
    const [meetings, setMeetings] = useState<UserContact[]>([])
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        fetch(absoluteUrl("/users/me/contacts"), {credentials: "include"})
            .then(res => res.json() as Promise<UserContact[]>)
            .then(res => {
                setMeetings(res);
                setLoading(false)
            })
    }, [])


    return (
        <Box sx={{borderRadius: '25px', height: '100%'}}>
            <Stack direction="column" spacing={3} justifyContent="flex-start" sx={{height: '100%'}} p='15px' m='10px'>
                <CurrentSubscriptionsNotice/>
                <Paper sx={{height: '100%'}} elevation={3}>
                    <Box p='15px' m='10px'>
                        {isLoading ? <CircularProgress/> : <MeetingsWrapper meetings={meetings}/>}
                    </Box>
                </Paper>
            </Stack>
        </Box>
    )
}
