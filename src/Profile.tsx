import React, {useEffect, useState} from "react";
import {
    Button,
    Chip,
    ListItem,
    Typography,
    CardContent,
    Grid,
    Stack, List, CardActions, Divider, Paper, CircularProgress
} from "@mui/material";
import Card from "@mui/material/Card";
import {Col, Container, Row} from "react-bootstrap";
import CardMedia from "@mui/material/CardMedia";
import {DefaultService} from "./api";
import {Error} from "@mui/icons-material";


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

const fetchProfile = async (): Promise<ProfileModel> => await DefaultService.getMyProfile().then(
    res => {
        return {
            firstName: res.first_name,
            lastName: res.last_name,
            occupation: aalimProfile.occupation,
            city: aalimProfile.city,
            image: aalimProfile.image,
            telegramLogin: res.tg_login,
            about: aalimProfile.about,
            meetingsCount: aalimProfile.meetingsCount,
            coffeeCups: aalimProfile.coffeeCups,
            rating: aalimProfile.rating,
            interests: aalimProfile.interests
        }
    },
    err => {
        console.log("Что-то пошло не так, вот вам тыква...")
        return aalimProfile
    }
)

const ProfileComponent = (userProfile: ProfileModel) =>
    <Grid spacing={2} className="ProfileGrid">
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
    </Grid>

export const Profile = () => {
    const [userData, setUserData] = useState<ProfileModel | null>(null)
    const [state, setState] = useState('')
    useEffect(() => {
        setState('loading')
        fetchProfile().then(profile => {
            setState('success')
            setUserData(profile)
        }).catch(err => {
            setState('error')
            console.log("ERROR")
            console.log(err)
        })
    }, [])
    switch (state) {
        case 'loading':
            return <CircularProgress/>
        case 'error':
            return <Error/>
        case 'success':
            return ProfileComponent(userData!!)
    }
    return ProfileComponent(aalimProfile)
}
