import React, {useEffect, useState} from "react";
import {
    Button,
    CardActions,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    List,
    ListItem,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import {Col, Container, Row} from "react-bootstrap";
import CardMedia from "@mui/material/CardMedia";
import {DefaultService, User} from "./api";

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

const ProfileComponent = (res: User) => {
    console.log(res)
    let userProfile = {
        firstName: (res.first_name),
        lastName: (res.last_name),
        occupation: aalimProfile.occupation,
        city: aalimProfile.city,
        image: aalimProfile.image,
        telegramLogin: (res.tg_login),
        about: aalimProfile.about,
        meetingsCount: aalimProfile.meetingsCount,
        coffeeCups: aalimProfile.coffeeCups,
        rating: aalimProfile.rating,
        interests: aalimProfile.interests
    }
    return (<Grid spacing={2} className="ProfileGrid">
        <Paper>
            <Container>
                <Stack direction="row" spacing={3} className="ProfileContainer">
                    <Stack spacing={1}>
                        <Typography variant="h5">{userProfile.firstName} {userProfile.lastName}</Typography>
                        <CardMedia image={userProfile.image} className="ProfilePhoto"/>
                        <CardActions>
                            <Button size="small">Редактировать профиль</Button>
                        </CardActions>
                    </Stack>
                    <Stack>
                        <CardContent>
                            <Typography variant="h5">О Себе</Typography>
                            <Typography>{userProfile.about}</Typography>
                        </CardContent>
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
                    </Stack>
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
            </Container>
        </Paper>
        <Card className="card mb-4">
            <CardContent className="card-body">
                <Row className="row">
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
                </Row>
            </CardContent>
        </Card>
    </Grid>)
}

export const Profile = () => {
    const [userData, setUserData] = useState<User | null>(null)
    const [isLoading, setLoading] = useState(true)

    const fetchProfile = () => {
        DefaultService.getMyProfile().then(json => {
            const userData = JSON.parse(json as unknown as string) as User
            setUserData(userData)
            setLoading(false)
        })
    }


    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        isLoading ? <CircularProgress/> : ProfileComponent(userData as User)
    )
}
