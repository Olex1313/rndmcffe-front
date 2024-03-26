import React, {useEffect, useState} from "react";
import {Box, Button, CircularProgress, Stack, Typography} from "@mui/material";
import {User, UsersService} from "../api";
import {UserPersonal} from "./UserPersonal";
import {PaddedPaper} from "../common/PaddedPaper";
import {ParticipationMode} from "./ParticipationMode";
import {ParticipationIntervalComponent} from "./ParticipationInterval";
import {ParticipationLanguage} from "./ParticipationLanguage";
import {InterestsDialogueComponent} from "./UserInterests";
import {useNavigate} from "react-router-dom";
import {CurrentSubscriptionsNotice} from "../clubs/CurrentSubscriptionsNotice";

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

interface ProfileComponentProps {
    res: User;
    setUserData: { (value: React.SetStateAction<User | null>): void; (arg0: User): void };
}

const ProfileComponent = (props: ProfileComponentProps) => {
    const {res} = props
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
    return (
        <Box sx={{borderRadius: '25px'}}>
            <Stack direction="column" spacing={3} justifyContent="flex-start">
                <CurrentSubscriptionsNotice/>
                <UserPersonal userId={res.id} name={`${res.last_name} ${res.first_name}`} avatar={res.avatar}
                              telegram={res.tg_login} about={res.about_me}/>
                <ParticipationMode participationMode={res.meeting_mode} city={userProfile.city}/>
                <ParticipationIntervalComponent start={res.meeting_time.start} end={res.meeting_time.end}/>
                <InterestsDialogueComponent initialInterests={res.interests}/>
                <ParticipationLanguage language={res.meeting_language}/>
            </Stack>
        </Box>
    )
}

export const Profile = () => {
    const [userData, setUserData] = useState<User | null>(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        UsersService.getMyProfile().then(json => {
            setUserData(json)
            setLoading(false)
        })
    }, [])

    return (
        isLoading ? <CircularProgress/> : <ProfileComponent res={userData as User} setUserData={setUserData}/>
    )
}
