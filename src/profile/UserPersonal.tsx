import React, {useState} from "react";
import {User, UsersService} from "../api";
import {Avatar, Box, Button, Stack, TextField, Typography} from "@mui/material";
import {PaddedPaper} from "../common/PaddedPaper";
import {Store} from "react-notifications-component";

interface UserPersonalProps {

    userId: number
    name: string
    telegram: string
    about?: string

    avatar: string
}

export const UserPersonal = (props: UserPersonalProps) => {
    const [about, setAbout] = useState<string>(props.about || "")
    const [userAvatar, setUserAvatar] = useState(props.avatar || "me-img.png")
    const onSubmit = (aValue: string) => {
        UsersService.updateMyProfile({
            about_me: aValue
        }).then((aUser) => setAbout(aUser.about_me))
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
                    setUserAvatar(userData.avatar)
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

    return (<PaddedPaper>
        <Stack direction="row">
            <Stack>
                <Avatar src={userAvatar} sx={{
                    borderRadius: '50%',
                    display: 'inline',
                    height: '96px',
                    width: '96px',
                    overflow: 'hidden'
                }}
                />
                <Button variant="contained" component="label">
                    Обновить Фото
                    <input hidden accept="image/*" multiple type="file" onChange={handleFileUpload}/>
                </Button>
            </Stack>

            <Stack>
                <Typography variant="h5">{props.name}</Typography>
                <Typography variant="h6">Telegram: {props.telegram}</Typography>
            </Stack>
        </Stack>
        <Box width='100%'>
            <TextField fullWidth={true} multiline rows={6} label="Расскажите о себе"
                       defaultValue={about}
                       onBlur={val => onSubmit(val.target.value)}
                       variant="standard"/>
        </Box>
    </PaddedPaper>)
}