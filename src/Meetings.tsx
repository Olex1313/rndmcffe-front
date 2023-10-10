import React from "react";
import "./style.css";
import {Card, Carousel, ListGroup} from "react-bootstrap";

interface Meeting {
    date: Date;
    place: string;
    person: string
}

const meetings: Meeting[] = [
    {
        date: new Date(),
        place: "Москва, МИЭМ",
        person: "Лимонов Алексей"
    },
    {
        date: new Date(),
        place: "Москва, Китай-Город",
        person: "Лимонов Алексей"
    },
    {
        date: new Date(),
        place: "Москва, НИУ ВШЭ",
        person: "Лимонов Алексей"
    },
    {
        date: new Date(),
        place: "Москва, НИУ ВШЭ",
        person: "Лимонов Алексей"
    },
]

const MeetingComponent = (meeting: Meeting) => {
    return <Card className="MeetingCard">
        <Card.Body className="MeetingPhotoCardBody">
            <Carousel interval={null} className="MeetingPhotoCarousel">
                <Carousel.Item>
                    <img src="me-img.jpeg"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="me-neg-img.jpeg"/>
                </Carousel.Item>
            </Carousel>
        </Card.Body>
        <ListGroup>
            <ListGroup.Item>Где: {meeting.place}</ListGroup.Item>
            <ListGroup.Item>Когда: {meeting.date.toDateString()}</ListGroup.Item>
            <ListGroup.Item>С кем: {meeting.person}</ListGroup.Item>
        </ListGroup>
    </Card>
}

export const Meetings = () => {
    return (
        <div className="MeetingsCardContainer">
            {meetings.map(m => MeetingComponent(m))}
        </div>
    )
}
