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
import {DefaultService, User} from "../api";
import {Store} from "react-notifications-component";

const aalimProfile = {
    firstName: "Алексей",
    lastName: "Лимонов",
    occupation: "Server Reboot Engineer",
    city: "Москва",
    image: "me-img.png",
    telegramLogin: "@olexvp",
    about: "Устанавливаю арч через ансибл",
    meetingsCount: 42,
    coffeeCups: 10,
    rating: 4.9,
    interests: ["C++", "D&D", "Backend", "Распределенные системы"]
}

const ProfileComponent = (res: User, setUserData: { (value: React.SetStateAction<User | null>): void; (arg0: User): void; }) => {
    let userProfile = {
        firstName: (res.first_name),
        lastName: (res.last_name),
        occupation: aalimProfile.occupation,
        city: aalimProfile.city,
        image: res.avatar || aalimProfile.image,
        telegramLogin: (res.tg_login),
        about: aalimProfile.about,
        meetingsCount: aalimProfile.meetingsCount,
        coffeeCups: aalimProfile.coffeeCups,
        rating: aalimProfile.rating,
        interests: aalimProfile.interests
    }
    console.log("\"", aalimProfile.image, "\"", res.avatar, "\"", res.avatar || aalimProfile.image)
    
    const handleFileUpload = (event: { target: { files: FileList | null } }) => {
        if (event.target.files == null) {
            return
        }
        const file = event.target.files[0]
        const reader = new FileReader()

        
        reader.onloadend = function() {
            DefaultService.addPhoto(file).then(() => {
                DefaultService.getMyProfile().then(json => {
                    console.log('image uploaded successfully %s', file.type)
                    const userData = JSON.parse(json as unknown as string) as User
                    res.avatar = userData.avatar
                    console.log(userData.avatar)
                    setUserData(userData)
                })
            }).catch((reason) => {
                let message
                if (reason.body.includes("NSFW_DETECTED")) {
                    message = "Подобное фото нельзя использвоать, попробуйте другое или обратитесь в поддержку"
                } else {
                    message = "Не удалось загрузить фото" 
                }
                Store.addNotification({
                    title: "Ошибка",
                    type: "danger",
                    message: message,
                    container: "top-right"
                })
            })
        }
        reader.readAsDataURL(file)
    }

    return (<Grid spacing={2} className="ProfileGrid">
        <Paper>
            <Container>
                <Stack direction="row" spacing={3} className="ProfileContainer">
                    <Stack spacing={1}>
                        <Typography variant="h5">{userProfile.firstName} {userProfile.lastName}</Typography>
                        <CardMedia image={userProfile.image} className="ProfilePhoto"/>
                        <Button variant="contained" component="label">
                            Обновить Фото
                            <input hidden accept="image/*" multiple type="file" onChange={handleFileUpload}/>
                        </Button>
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

    useEffect(() => {
        DefaultService.getMyProfile().then(json => {
            const userData = JSON.parse(json as unknown as string) as User
            console.log('try to load', userData)
            setUserData(userData)
            setLoading(false)
        })
    }, [])

    return (
        isLoading ? <CircularProgress/> : ProfileComponent(userData as User, setUserData)
    )
}
