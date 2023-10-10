import React, {useState} from 'react';
import {Container, Nav, Navbar, NavbarText} from "react-bootstrap";
import {Profile} from "./Profile";
import {Subscriptions} from "./Subscriptions";
import {Meetings} from "./Meetings";
import {MainPage} from "./MainPage";

type PageState = "profile" | "subscriptions" | "meetings" | "main-page"

function renderState(state: PageState) {
    switch (state) {
        case "main-page":
            return <MainPage/>
        case "profile":
            return <Profile/>;
        case "subscriptions":
            return <Subscriptions/>;
        case "meetings":
            return <Meetings/>;
    }
}

function App() {
    const [page, setPage] = useState<PageState>("main-page")

    return (
        <div style={{height: "100%", paddingBottom: "60px"}}>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home" onClick={() => setPage("main-page")}>Rndmcffe</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Nav>
                        <Nav.Link onClick={() => setPage("meetings")}>Встречи</Nav.Link>
                        <Nav.Link onClick={() => setPage("subscriptions")}>Подписки</Nav.Link>
                        <Nav.Link onClick={() => setPage("profile")}>Профиль</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <NavbarText>
                            ООО Лучший аутсорс
                        </NavbarText>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {renderState(page)}
            <div className="PageFooter">
                © {new Date().getFullYear()} Copyright aalim-corp
            </div>
        </div>
    );
}

export default App;
