import React from "react";
import {Image, Stack} from "react-bootstrap";

export const MainPage = () => {
    return (
        <Stack gap={0} direction="vertical">
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
            <Image src="coffeemeeting.jpeg">
            </Image>
        </Stack>

    )
}