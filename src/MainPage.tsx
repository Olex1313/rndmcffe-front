import React from "react";
import {Image, Row, Stack} from "react-bootstrap";
import "./style.css";

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
            <div className="ColumnedBlock pt-4">
                <h2 className="display-2">Кому это нужно?</h2>
                <div className="row justify-content-between">
                    
                    <div className="col card-modif">
                        <div className="card">
                            <Image src="coffeemeeting.jpeg" className="card-img-top"></Image>
                            <div className="card-body">
                                <h4 className="card-title">Тем, кто ищет контакты для своей карьеры</h4>
                                <p className="card-text">
                                    Встречи с интересными людьми разных профессий
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col card-modif">
                        <div className="card">
                            <Image src="coffeemeeting.jpeg" className="card-img-top"></Image>
                            <div className="card-body">
                                <h4 className="card-title">Тем, кто ищет друзей</h4>
                                <p className="card-text">
                                    Личная встреча - простой способ завести новое знакомство

                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col card-modif">
                        <div className="card">
                            <Image src="coffeemeeting.jpeg" className="card-img-top"></Image>
                            <div className="card-body">
                                <h4 className="card-title">Тем, кто хочет хорошо провести время</h4>
                                <p className="card-text">
                                    Интересная беседа за чашечкой любимого напитка - отличный способ отдохнуть
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                <div className="row justify-content-between">
                    <div className="col col-8 m-auto">
                        <h2 className="display-4 text-start">Как это работает?</h2>        
                        <p>
                            Регистрируешься в чат-боте за 5 минут, загружаешь фото и указываешь интересы, а после  наш искуственный интеллект раз в неделю подбирает тебе собеседника.
                        </p>
                        <p>
                            Интеллектуальный алгоритм подбирает встречу на основе твоих предпочтений и интересов
                        </p>
                        <p>
                            Встречи могут быть как с произвольными люьдми, так и с участниками общего сообщества (например студентами одного факултьтета или института).
                            Не нашли подходящее сообщество? Самое время создать свое!
                        </p>
                    </div>
                    <div className="col col-sm">
                        <Image src="vertical-coffe.jpeg" className="img-fluid"></Image>
                    </div>
                </div>
            </div>
            <div className="ColumnedBlock pt-4">
                <h2 className="display-2 text-end">Какие бывают сообщства?</h2>
                <div className="row justify-content-between">
                    
                    <div className="col card-modif">
                        <div className="card">
                            <Image src="coffeemeeting.jpeg" className="card-img-top"></Image>
                            <div className="card-body">
                                <h4 className="card-title">Карьерные</h4>
                                <p className="card-text">
                                    Клубы внутри вашей компании, чтобы познакомиться с коллегами
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col card-modif">
                        <div className="card">
                            <Image src="coffeemeeting.jpeg" className="card-img-top"></Image>
                            <div className="card-body">
                                <h4 className="card-title">Студенческие</h4>
                                <p className="card-text">
                                    Сообщества внутри факультета и не только! Помогаем образовываться сообществам внтури вуза
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col card-modif">
                        <div className="card">
                            <Image src="coffeemeeting.jpeg" className="card-img-top"></Image>
                            <div className="card-body">
                                <h4 className="card-title">Хоббийные</h4>
                                <p className="card-text">
                                    Любите настольные игры или может крафтовые бары? Мы поможем пообщаться с единомышленниками
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Stack>

    )
}