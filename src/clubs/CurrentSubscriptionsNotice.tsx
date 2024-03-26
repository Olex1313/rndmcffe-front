import {PaddedPaper} from "../common/PaddedPaper";
import {Button, Stack, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UsersService} from "../api";
import {onError} from "../common/OnError";
import {Loop} from "@mui/icons-material";


interface SubscriptionTextProps {
    clubNames: string[];
    navigateCallback: VoidFunction
}

const SubscriptionsText = (props: SubscriptionTextProps) => {
    const text = props.clubNames.length === 0 ?
        <Typography variant="body1"> Вы не подписаны ни на одно мероприятие </Typography>
        : <Typography variant="body1"> Вы подписаны на <b> {`${props.clubNames.join(", ")}`} </b> </Typography>
    return (
        <>
            {text}
            <Button variant="contained" onClick={props.navigateCallback}>Подробнее</Button>
        </>
    )
}
export const CurrentSubscriptionsNotice = () => {
    const [userSubs, setUserSubs] = useState<string[]>([])
    const [isLoading, setLoading] = useState(true)
    const navigation = useNavigate()

    useEffect(() => {
        UsersService.getUserClubs()
            .then(clubs => {
                const names = clubs.filter(club => club.is_subscribed).map(club => club.name)
                setUserSubs(names)
                setLoading(false)
            }, onError)
    }, [])

    return (
        <PaddedPaper>
            <Stack direction="row" sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                {
                    isLoading ? <Loop/> : SubscriptionsText({
                        clubNames: userSubs,
                        navigateCallback: () => navigation("/clubs")
                    })
                }
            </Stack>
        </PaddedPaper>
    )
}