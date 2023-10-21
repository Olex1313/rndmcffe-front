import React from "react";
import {
    Button,
    Chip,
    ListItem,
    Paper,
    Typography,
    Container,
    CardContent,
    Grid,
    styled,
    Stack, List, CardActions, CardHeader, Divider, Box
} from "@mui/material";
import Card from "@mui/material/Card";
import {Col, Image, Row} from "react-bootstrap";
import CardMedia from "@mui/material/CardMedia";


interface ProfileModel {
    firstName: string
    lastName: string
    occupation: string
    city: string
    image: string
    telegramLogin: string
    about: string
    meetingsCount: number,
    coffeeCups: number,
    rating: number,
    interests: string[]
}

const aalimProfile = {
    firstName: "Алексей",
    lastName: "Лимонов",
    occupation: "Server Reboot Engineer",
    city: "Москва",
    image: "me-img.jpeg",
    telegramLogin: "@olexvp",
    about: "Устанавливаю арч через ансибл",
    meetingsCount: 42,
    coffeeCups: 10,
    rating: 4.9,
    interests: ["C++", "D&D", "Backend", "Распределенные системы"]
}

const ProfileComponent = (userProfile: ProfileModel) =>
    <Grid spacing={2} className="ProfileGrid">
        <Card className="card mb-4">
            <CardContent>
                <Stack direction="row" spacing={3}>
                    <Stack spacing={1}>
                        <CardContent>
                            <Typography variant="h5">{userProfile.firstName} {userProfile.lastName}</Typography>
                        </CardContent>
                        <CardMedia image={userProfile.image} className="ProfilePhoto"/>
                        <CardActions>
                            <Button size="small">Редактировать профиль</Button>
                        </CardActions>
                    </Stack>
                    <CardContent>
                        <Typography variant="h5">Статистика</Typography>
                        <Stack direction="row" divider={<Divider orientation="vertical" flexItem/>} spacing={2}>
                            <Row>
                                <Typography>Рейтинг</Typography>
                                <Typography>{userProfile.rating}</Typography>
                            </Row>
                            <Row>
                                <Typography>Чашек кофе</Typography>
                                <Typography>{userProfile.coffeeCups}</Typography>
                            </Row>
                            <Row>
                                <Typography>Всего встреч</Typography>
                                <Typography>{userProfile.meetingsCount}</Typography>
                            </Row>
                        </Stack>
                    </CardContent>
                    <CardContent>
                        <Typography variant="h5">Интересы</Typography>
                        <List>
                            {
                                userProfile.interests.map((tag) =>
                                    <ListItem key={tag}>
                                        <Chip label={tag}/>
                                    </ListItem>
                                )
                            }
                        </List>
                    </CardContent>
                </Stack>
            </CardContent>
        </Card>
        <Card className="card mb-4">
            <CardContent className="card-body">
                <Row className="row">
                    <Col class="col-sm-3">
                        <Typography>{userProfile.firstName} {userProfile.lastName}</Typography>
                    </Col>
                    <Col className="col-sm-9">
                        <Typography>{userProfile.city}</Typography>
                    </Col>
                </Row>
                <Row>
                    <Row className="row">
                        <Col>
                            <Typography>Telegram</Typography>
                        </Col>
                        <Col className="col-sm-9">
                            <Typography>{userProfile.telegramLogin}</Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Row className="row">
                            <Col className="col-sm-3">
                                <Typography className="mb-0">Phone</Typography>
                            </Col>
                            <Col className="col-sm-9">
                                <Typography className="text-muted mb-0">(097) 234-5678</Typography>
                            </Col>
                        </Row>
                        <Row className="row">
                            <Col className="col-sm-3">
                                <Typography className="mb-0">Mobile</Typography>
                            </Col>
                            <Col className="col-sm-9">
                                <Typography className="text-muted mb-0">(098) 765-4321</Typography>
                            </Col>
                        </Row>
                        <Row className="row">
                            <Col class="col-sm-3">
                                <Typography className="mb-0">Address</Typography>
                            </Col>
                            <Col className="col-sm-9">
                                <Typography className="text-muted mb-0">Bay Area, San Francisco, CA</Typography>
                            </Col>
                        </Row>
                    </Row>
                </Row>
            </CardContent>
        </Card>
    </Grid>

export const Profile = () => {
    return ProfileComponent(aalimProfile)
}
