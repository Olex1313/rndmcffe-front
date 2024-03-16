import React, {useEffect, useState} from "react";
import "./style.css";
import {Card, CardMedia, CardContent, Typography, Box} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { UserContact } from "./api/models/UserContact";
import { absoluteUrl } from "./host";


const MeetingComponent = (meeting: UserContact) => {
    return <Card className="MeetingCard">
        <CardContent className="MeetingPhotoCardBody">
            <Carousel className="MeetingPhotoCarousel" autoPlay={false}>
                <Box>
                    <CardMedia
                        sx={{maxWidth: 345, height: 180, borderRadius: "15px"}}
                        image="me-img.jpeg"
                        title="profile"
                    />
                </Box>
                <Box>
                    <CardMedia
                        sx={{maxWidth: 345, height: 180, borderRadius: "15px"}}
                        image="me-neg-img.jpeg"
                        title="profile"
                    />
                </Box>
            </Carousel>
        </CardContent>

        <CardContent>
            <Typography gutterBottom variant="h5" component="div">{meeting.user_name}</Typography>
            <Typography>Когда: {
                new Date(meeting.time).toLocaleDateString("ru-RU")
            }</Typography>
            <Typography>Где: {meeting.occupation}</Typography>
        </CardContent>
    </Card>
}

export const Meetings = () => {
    const [meetings, setMeetings] = useState<UserContact[]>([])
    useEffect(() => {
        fetch(absoluteUrl("/users/me/contacts"), {credentials: "include"})
            .then(res => res.json() as Promise<UserContact[]>)
            .then(res => setMeetings(res))
    }, [])
    return (
        <div className="MeetingsCardContainer">
            {meetings.length > 0 && meetings.map(m => MeetingComponent(m))}
        </div>
    )
}
