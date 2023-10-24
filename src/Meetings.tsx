import React from "react";
import "./style.css";
import {Card, CardMedia, CardContent, Typography, Box} from "@mui/material";
import Carousel from "react-material-ui-carousel";

interface Meeting {
    id: number
    date: Date
    place: string
    person: string
}

const meetings: Meeting[] = [
    {
        id: 1,
        date: new Date(),
        place: "Москва, МИЭМ",
        person: "Лимонов Алексей"
    },
    {
        id: 2,
        date: new Date(),
        place: "Москва",
        person: "Лимонов Алексей"
    },
    {
        id: 3,
        date: new Date(),
        place: "Москва, НИУ ВШЭ",
        person: "Лимонов Алексей"
    },
    {
        id: 4,
        date: new Date(),
        place: "Москва, НИУ ВШЭ",
        person: "Лимонов Алексей"
    },
]

const MeetingComponent = (meeting: Meeting) => {
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
            <Typography gutterBottom variant="h5" component="div">{meeting.person}</Typography>
            <Typography>Когда: {meeting.date.toDateString()}</Typography>
            <Typography>Где: {meeting.place}</Typography>
        </CardContent>
    </Card>
}

export const Meetings = () => {
    return (
        <div className="MeetingsCardContainer">
            {meetings.map(m => MeetingComponent(m))}
        </div>
    )
}
