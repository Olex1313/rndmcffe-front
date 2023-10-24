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
                                <h4 className="card-title">Тем, кто ищет контакты для своей карьеры</h4>
                                <p className="card-text">
                                    Встречи с интересными людьми разных профессий
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
                                <h4 className="card-title">Тем, кто ищет контакты для своей карьеры</h4>
                                <p className="card-text">
                                    Встречи с интересными людьми разных профессий
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <h2 className="display-3">Частые вопросы</h2>
                <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                          Accordion Item #1
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                        <div className="accordion-body">
                          <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                      </div>
                    </div>
        
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button accordion-button-modif collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                          Accordion Item #2
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">
                          <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Accordion Item #3
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Stack>

    )
}