import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {CardContent, Grid, Typography} from "@mui/material";
import {CardFooter} from "react-bootstrap";

interface Subscription {
    name: string;
    description: string;
    location: string;
    image: string;
    memberCount: number;
}

const subscriptions: Subscription[] = [
    {
        name: "МИЭМ",
        description: "Клуб студентов МИЭМ",
        location: "Москва, Таллинская 34",
        image: "miem-logo.jpeg",
        memberCount: 42
    },
    {
        name: "НИУ ВШЭ",
        description: "Клуб студентов НИУ ВШЭ",
        location: "Москва",
        image: "hse-logo.jpg",
        memberCount: 500
    },
    {
        name: "НИУ ВШЭ",
        description: "Клуб студентов НИУ ВШЭ",
        location: "Москва",
        image: "hse-logo.jpg",
        memberCount: 500
    },
    {
        name: "НИУ ВШЭ",
        description: "Клуб студентов НИУ ВШЭ",
        location: "Москва",
        image: "hse-logo.jpg",
        memberCount: 500
    },
    {
        name: "НИУ ВШЭ",
        description: "Клуб студентов НИУ ВШЭ",
        location: "Москва",
        image: "hse-logo.jpg",
        memberCount: 500
    },
    {
        name: "НИУ ВШЭ",
        description: "Клуб студентов НИУ ВШЭ",
        location: "Москва",
        image: "hse-logo.jpg",
        memberCount: 500
    },
    {
        name: "НИУ ВШЭ",
        description: "Клуб студентов НИУ ВШЭ",
        location: "Москва",
        image: "hse-logo.jpg",
        memberCount: 500
    },
    {
        name: "НИУ ВШЭ",
        description: "Клуб студентов НИУ ВШЭ",
        location: "Москва",
        image: "hse-logo.jpg",
        memberCount: 500
    }
]

const SubscriptionComponent = (subscription: Subscription) =>
    <Grid item xs={3}>
        <Card sx={{maxWidth: 345}}>
            <CardMedia sx={{height: 140}} image={subscription.image}/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {subscription.name}
                </Typography>
                <Typography variant="body2">
                    {subscription.description}
                </Typography>
            </CardContent>
            <CardContent>
                <CardFooter>
                    Участников: {subscription.memberCount}
                </CardFooter>
                <CardFooter>
                    {subscription.location}
                </CardFooter>
            </CardContent>
        </Card>
    </Grid>

export const Subscriptions = () => {
    return <Grid container justifyContent="center" spacing={3} rowSpacing={2}>
        {subscriptions.map(s => SubscriptionComponent(s))}
    </Grid>
}
