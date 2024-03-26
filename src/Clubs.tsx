import React, {useEffect, useState} from "react";
import CardMedia from "@mui/material/CardMedia";
import {Button, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {CardFooter} from "react-bootstrap";
import {UserClub} from "./api";
import {absoluteUrl} from "./host";
import {PaddedPaper} from "./common/PaddedPaper";

type ClubIdConsumer = (clubId: number) => void

const ClubComponent = (userClub: UserClub, onSubscribe: ClubIdConsumer, onUnsubscribe: ClubIdConsumer) => {
    return <Grid item xs={6} md={6}>
        <PaddedPaper>
            <CardMedia component="img" height="194" image="hse-logo.svg"/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {userClub.name}
                </Typography>
                <Typography variant="body2">
                    {userClub.description}
                </Typography>
            </CardContent>
            <CardContent>
                <CardFooter>
                    Участников: 42
                </CardFooter>
                <CardFooter>
                    {userClub.occupation}
                </CardFooter>
            </CardContent>
            <CardActions>
                <Button size="small"
                        onClick={userClub.is_subscribed ? () => onUnsubscribe(userClub.id) : () => onSubscribe(userClub.id)}>
                    {userClub.is_subscribed ? "Отписаться" : "Подписаться"}
                </Button>
            </CardActions>
        </PaddedPaper>
    </Grid>;
}

export const Subscriptions = () => {
    const [clubs, setClubs] = useState<UserClub[]>([])
    useEffect(() => {
        fetch(absoluteUrl("/users/me/clubs"), {credentials: "include"})
            .then(r => r.json() as Promise<UserClub[]>)
            .then(c => setClubs(c))
    }, [JSON.stringify(clubs)])

    const subscribeClub = (clubId: number) => {
        fetch(absoluteUrl(`/users/me/clubs/${clubId}`), {
            credentials: "include",
            method: "POST"
        }).then(res => {
            if (res.ok) {
                const updatedClubs = clubs.map(club => {
                    if (club.id === clubId) {
                        return {
                            ...club,
                            isSubscribed: true
                        }
                    }
                    return club
                })
                setClubs(updatedClubs)
            }
        });
    }

    const unsubscribeClub = (clubId: number) => {
        fetch(absoluteUrl(`/users/me/clubs/${clubId}`), {
            credentials: "include",
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                const updatedClubs = clubs.map(club => {
                    if (club.id === clubId) {
                        return {
                            ...club,
                            isSubscribed: false
                        }
                    }
                    return club
                })
                setClubs(updatedClubs)
            }
        });
    }

    return <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {clubs.length > 0 && clubs.map(s => ClubComponent(s, subscribeClub, unsubscribeClub))}
    </Grid>
}
