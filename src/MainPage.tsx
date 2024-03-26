import React from "react";
import {Image} from "react-bootstrap";
import "./style.css";
import {Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

interface RowCardProps {
    title: string
    text: string
    image?: string
}

const RowCard = (props: RowCardProps) => {
    const {title, text} = props
    return (
        <Grid item sx={{height: '100%', maxWidth: 345}} component={Card}>
                <CardMedia sx={{height: 160}} image="coffeemeeting.jpeg"/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
        </Grid>
    )
}

export const MainPage = () => {
    return (
        <Stack gap={0} direction="column">
            <h1>Random Coffee - Сервис сервис дружеских и профессиональных знакомств</h1>
            <div className="MainPageIntro">
                Каждую неделю искусственный интеллект подбирает тебе собеседника с похожими интересами и целями.
                Начни знакомиться с людьми здесь и сейчас
                Тебя ждет 52 полезных и интересных знакомства за год.
                Как это работает — объясняем наглядно.
            </div>
            <div className="MainPageToMeetings">
                Просто переходи по вкладкам сверху и начинай знакомиться
            </div>
            <Image src="coffeemeeting.jpeg"/>
            <Grid container style={{display: 'grid'}} alignItems="stretch" sx={{height: '100%'}}>
                <h2 className="display-2">Кому это нужно?</h2>
                <Stack direction="row" spacing={3} justifyContent="space-between">
                    <RowCard
                        title="Тем, кто ищет контакты для своей карьеры"
                        text="Встречи с интересными людьми разных профессий"
                    />

                    <RowCard title="Тем, кто ищет друзей"
                             text="Личная встреча - простой способ завести новое знакомство"/>

                    <RowCard title="Тем, кто хочет хорошо провести время"
                             text="Интересная беседа за чашечкой любимого напитка - отличный способ отдохнуть"/>
                </Stack>
            </Grid>
            <div className="pt-4">
                <div className="row justify-content-between">
                    <div className="col col-8 m-auto">
                        <h2 className="display-4 text-start">Как это работает?</h2>
                        <p>
                            Регистрируешься в чат-боте за 5 минут, загружаешь фото и указываешь интересы, а после наш
                            искуственный интеллект раз в неделю подбирает тебе собеседника.
                        </p>
                        <p>
                            Интеллектуальный алгоритм подбирает встречу на основе твоих предпочтений и интересов
                        </p>
                        <p>
                            Встречи могут быть как с произвольными люьдми, так и с участниками общего сообщества
                            (например студентами одного факултьтета или института).
                            Не нашли подходящее сообщество? Самое время создать свое!
                        </p>
                    </div>
                    <div className="col col-sm">
                        <Image src="vertical-coffe.jpeg" className="img-fluid"></Image>
                    </div>
                </div>
            </div>
            <Grid className="ColumnedBlock pt-4">
                <h2 className="display-2 text-end">Какие бывают сообщства?</h2>
                <Grid className="row justify-content-between">

                    <Stack direction="row" spacing={3} justifyContent="space-between">
                        <RowCard title="Карьерные" text="Клубы внутри вашей компании, чтобы познакомиться с коллегами"/>
                        <RowCard title="Студенческие" text="Сообщества внутри факультета и не только! Помогаем образовываться сообществам внтури вуза"/>
                        <RowCard title="Хоббийные" text="Любите настольные игры или может крафтовые бары? Мы поможем пообщаться с единомышленниками"/>
                    </Stack>
                </Grid>
            </Grid>

        </Stack>

    )
}