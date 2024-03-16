import React, {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {Button, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {CardFooter} from "react-bootstrap";
import {UserClub} from "./api";
import {absoluteUrl} from "./host";

type ClubIdConsumer = (clubId: number) => void
const ClubComponent = (userClub: UserClub, onSubscribe: ClubIdConsumer, onUnsubscribe: ClubIdConsumer) => {
    return <Grid item xs={3}>
        <Card sx={{maxWidth: 345}}>
            <CardMedia sx={{height: 140}} image={userClub.image_url}/>
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
        </Card>
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

    return <Grid container justifyContent="center" spacing={3} rowSpacing={2}>
        {clubs.length > 0 && clubs.map(s => ClubComponent(s, subscribeClub, unsubscribeClub))}
    </Grid>
}
