import React, {useState} from 'react';
import {Container, Nav, Navbar, NavbarText} from "react-bootstrap";
import {Profile} from "./Profile";
import {Subscriptions} from "./Subscriptions";
import {Meetings} from "./Meetings";

type PageState = "profile" | "subscriptions" | "meetings"

function renderState(state: PageState) {
    switch (state) {
        case "profile":
            return <Profile/>;
        case "subscriptions":
            return <Subscriptions/>;
        case "meetings":
            return <Meetings/>;
    }
}

function App() {
    const [page, setPage] = useState<PageState>("meetings")

    return (
        <div style={{height: "100%"}}>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Rndmcffe</Navbar.Brand>
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
            <div className="PageContainer">
                {renderState(page)}
            </div>
        </div>
    );
}

export default App;
