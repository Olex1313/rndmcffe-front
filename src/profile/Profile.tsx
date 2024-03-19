import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    CardContent,
    Chip,
    CircularProgress,
    Dialog,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    List,
    ListItem,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import {Col, Container, Row} from "react-bootstrap";
import CardMedia from "@mui/material/CardMedia";
import {User, UsersService} from "../api";
import {Store} from "react-notifications-component";
import {ParticipationLanguage, ParticipationMode} from "../api/models/User";

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
const useNewProfile = true

const interestsConst = [
    {selected: false, label: 'Кофе'},
    {selected: false, label: 'Программирование'},
    {selected: false, label: 'Проекты'},
    {selected: false, label: 'Краш-тест идей'},
    {selected: false, label: 'Аналитика'},
    {selected: false, label: 'Машинное обучение'},
]

const PaddedPaper: React.FC<{ children: React.ReactNode }> = (props) => {
    return (
        <Paper>
            <Box p='15px' m='10px'>
                {props.children}
            </Box>
        </Paper>
    )
}

interface ParticipationModeProps {
    city: string
    participationMode: ParticipationMode
}

const ParticipationModeComponent = (props: ParticipationModeProps) => {

    const [alignment, setAlignment] = React.useState(props.participationMode);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: ParticipationMode,
    ) => {
        setAlignment(newAlignment);
    };

    const availableValues = Object.values(ParticipationMode).map((value) =>
        <ToggleButton key={value} value={value} selected={alignment.toString() ===  value}>{value}</ToggleButton>)

    return (
        <PaddedPaper>
            <Typography variant="h6">Формат участия</Typography>
            <ToggleButtonGroup
                color="primary"
                defaultValue={alignment}
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Формат участия"
            >
                {availableValues}
            </ToggleButtonGroup>
            <Autocomplete
                options={["Ижевск", "Самара"]}
                renderInput={
                    (params) => <TextField {...params} name="city" id="city" label="Город"/>
                }
                noOptionsText="Такого города нет"
                defaultValue={props.city}
                fullWidth
                sx={{mt: 3, mb: 2}}
                id="city"
            />
        </PaddedPaper>
    )
}

const ParticipationLanguageButton = () => {
    const [alignment, setAlignment] = React.useState(ParticipationLanguage.RU);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: ParticipationLanguage,
    ) => {
        setAlignment(newAlignment);
    };

    const availableValues = Object.entries(ParticipationMode).map(([value, label]) => <ToggleButton
        value={value}>{label}</ToggleButton>)

    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Язык общения"
        >
            {availableValues}
        </ToggleButtonGroup>
    );
}

const ParticipationTimeComponent = () => {
    return (
        <div>
            <FormControl variant="standard">
                <Select>
                    <MenuItem>0:00</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard">
                <Select>
                    <MenuItem>0:00</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

interface InterestsDialogueProps {
    initialInterests: InterestData[]
    open: boolean
    onClose: (selectedInterests: InterestData[]) => void
}

interface InterestData {
    selected: boolean;
    label: string
}

const InterestsDialogueComponent = (props: InterestsDialogueProps) => {
    const {initialInterests, open, onClose} = props;
    const [chipData, setChipData] = React.useState<InterestData[]>([...initialInterests, ...interestsConst]);

    const onChipClick = (clicked: InterestData) => () => {
        setChipData((chips) => chips.map((chip) => {
            return chip.label === clicked.label ? {label: clicked.label, selected: !clicked.selected} : chip
        }));
    }
    const handleCloseWithSave = () => {
        onClose(chipData.filter(it => it.selected))
    }
    const handleCloseWithoutSave = () => {
        onClose(initialInterests)
    }

    return (
        <Dialog onClose={handleCloseWithoutSave} open={open}>
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
                    <Button variant="contained" onClick={handleCloseWithoutSave} size="small">Оставить как было</Button>
                    <Button variant="outlined" onClick={handleCloseWithSave} size="small">Сохранить выбор</Button>
                </Stack>
            </PaddedPaper>

        </Dialog>
    )
}

interface ProfileComponentProps {
    res: User;
    setUserData: { (value: React.SetStateAction<User | null>): void; (arg0: User): void };
}

const ProfileComponent = (props: ProfileComponentProps) => {
    const {res, setUserData} = props
    let userProfile = {
        firstName: res.first_name,
        lastName: res.last_name,
        occupation: aalimProfile.occupation,
        city: res.city,
        image: res.avatar || aalimProfile.image,
        telegramLogin: res.tg_login,
        about: aalimProfile.about,
        meetingsCount: aalimProfile.meetingsCount,
        coffeeCups: aalimProfile.coffeeCups,
        rating: aalimProfile.rating,
        interests: res.interests
    }

    const handleFileUpload = (event: { target: { files: FileList | null } }) => {
        if (event.target.files == null) {
            return
        }
        const file = event.target.files[0]
        const reader = new FileReader()


        reader.onloadend = function () {
            UsersService.addPhoto(file).then(() => {
                UsersService.getMyProfile().then(json => {
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

    const [dialogueOpen, setDialogueOpen] = React.useState(false);
    const [interestData, setInterestData] = React.useState<InterestData[]>(
        userProfile.interests.map((anInterest) => {
            return {label: anInterest, selected: true}
        })
    )

    const handleDialogueClose = (newInterests: InterestData[]) => {
        setDialogueOpen(false)
        setInterestData(newInterests)
    }

    let renderedProfile: JSX.Element
    if (useNewProfile) {
        renderedProfile = (
            <Box sx={{borderRadius: '25px'}}>
                <Stack direction="column" spacing={3} justifyContent="flex-start">
                    <PaddedPaper>
                        <Stack direction="row" sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                            <Typography variant="body1">Вы не подписаны ни на одно мероприятие</Typography>
                            <Button variant="contained">Подробнее</Button>
                        </Stack>
                    </PaddedPaper>
                    <PaddedPaper>
                        <Stack direction="row">
                            <Avatar src={userProfile.image} sx={{
                                borderRadius: '50%',
                                display: 'inline',
                                height: '96px',
                                width: '96px',
                                overflow: 'hidden'
                            }}/>
                            <Stack>
                                <Typography variant="h5">{userProfile.lastName} {userProfile.lastName}</Typography>
                                <Typography variant="h6">Telegram: {userProfile.telegramLogin}</Typography>
                            </Stack>
                        </Stack>
                        <Box width='100%'>
                            <TextField fullWidth={true} multiline rows={6} label="Расскажите о себе"
                                       variant="standard"/>
                        </Box>
                    </PaddedPaper>
                    <ParticipationModeComponent participationMode={ParticipationMode.Hybrid} city={userProfile.city}/>
                    <PaddedPaper>
                        <Typography variant="h6">Интервал участия</Typography>
                        <Typography variant="caption">Не менее 4 часов</Typography>
                        <Stack direction="row">
                            <ParticipationTimeComponent/>
                        </Stack>
                        <Typography variant="overline">Время указывается исходя из часового пояса Europe/Moscow
                            GMT+3</Typography>
                    </PaddedPaper>
                    <PaddedPaper>
                        <Stack spacing={2}>
                            <Typography variant="h6">Что интересно обсудить</Typography>
                            <Stack direction="row">
                                {interestData.map((anInterest) => <Chip label={anInterest.label}/>)}
                            </Stack>
                            <Button variant="contained" fullWidth={true} onClick={() => setDialogueOpen(true)}>Настроить
                                интересы</Button>
                            <InterestsDialogueComponent open={dialogueOpen} onClose={handleDialogueClose}
                                                        initialInterests={interestData}/>
                        </Stack>
                    </PaddedPaper>
                    <PaddedPaper>
                        <Stack spacing={2}>
                            <Typography variant="h6">Выберите язык общения</Typography>
                            <Stack direction="row">
                                <ParticipationLanguageButton/>
                            </Stack>
                        </Stack>
                    </PaddedPaper>
                </Stack>
            </Box>
        )
    } else {
        renderedProfile = (<Grid spacing={2} className="ProfileGrid">
            <Paper>
                <Container>
                    <Stack direction="row" spacing={3} className="ProfileContainer">
                        <Stack spacing={1}>
                            <Typography variant="h5">{userProfile.firstName} {userProfile.lastName}</Typography>
                            <CardMedia image={userProfile.image || aalimProfile.image} className="ProfilePhoto"/>
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
    return renderedProfile
}

export const Profile = () => {
    const [userData, setUserData] = useState<User | null>(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        UsersService.getMyProfile().then(json => {
            const userData = JSON.parse(json as unknown as string) as User
            console.log('try to load', userData)
            setUserData(userData)
            setLoading(false)
        })
    }, [])

    return (
        isLoading ? <CircularProgress/> : <ProfileComponent res={userData as User} setUserData={setUserData}/>
    )
}
