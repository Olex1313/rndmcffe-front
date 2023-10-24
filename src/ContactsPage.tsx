import React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Chip, Divider,
    Grid, List, ListItem,
    Stack,
    styled,
    Typography
} from "@mui/material";
import {Cake, Engineering, ExpandMore, Paid, Terminal} from "@mui/icons-material";

const Item = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


interface VacancyDescription {
    name: string
    skills: string[]
    description: string
}

const VacancyAccordion = (vac: VacancyDescription) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls="panel2a-content"
                id="panel2a-header">
                <Typography>{vac.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack
                    direction={{xs: "column", sm: "row"}}
                    divider={<Divider orientation="vertical" flexItem/>}
                    justifyContent="flex-end">
                    <Box>
                        <Typography>
                            {vac.description}
                        </Typography>
                    </Box>
                    <List>
                        {
                            vac.skills.map((tag) =>
                                <ListItem key={tag}>
                                    <Chip label={tag}/>
                                </ListItem>
                            )
                        }
                    </List>
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}

const vacancies: VacancyDescription[] = [
    {
        name: "Button Painter Engineer",
        description: `Мы работаем над созданием таких блоков, как «Врачи» «Курсы», «Приложения»,
                            причастны к развитию пользовательского контента (UGC) в карточке товаров
                            поисковой
                            выдачи,
                            а также личного кабинета отзывов.
                            Ещё мы занимаемся развитием публичного профиля и партнёрского обогащённого
                            ответа.`,
        skills: ["JS", "HTML", "CSS", "React", "Курсы от Skillbox"]
    },
    {
        name: "Json Packaging Engineer",
        description: `Мы работаем над созданием таких блоков, как «Врачи» «Курсы», «Приложения»,
                            причастны к развитию пользовательского контента (UGC) в карточке товаров
                            поисковой
                            выдачи,
                            а также личного кабинета отзывов.
                            Ещё мы занимаемся развитием публичного профиля и партнёрского обогащённого
                            ответа.`,
        skills: ["Go", "Rust", "SQL", "gRPC", "Algorithms and Data structures"]
    },
    {
        name: "Server Reboot Engineer",
        description: `Мы работаем над созданием таких блоков, как «Врачи» «Курсы», «Приложения»,
                            причастны к развитию пользовательского контента (UGC) в карточке товаров
                            поисковой
                            выдачи,
                            а также личного кабинета отзывов.
                            Ещё мы занимаемся развитием публичного профиля и партнёрского обогащённого
                            ответа.`,
        skills: ["Linux", "Bash", "Go", "ELK Stack", "Ненависть к проприетарному ПО"]
    },
]
export const ContactsPage = () => {
    return (
        <Stack spacing={2}>
            <Typography variant="h4">Rndmcffe - это уголок уюта посреди big-tech'а</Typography>
            <Typography variant="h5">Мы будем рады новым людям в нашей команде</Typography>
            <Box sx={{width: "100%"}}>
                <Grid container justifyContent="center" spacing={3} rowSpacing={2}>
                    <Grid xs={6} item>
                        <Item>
                            <Stack direction="row" spacing={1}>
                                <Cake sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} style={{fontSize: 60}}/>
                                <Typography variant="h5" gutterBottom>
                                    Мы - маленькая семья, у нас общие цели и ценности.
                                </Typography>
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid xs={6} item>
                        <Item>
                            <Stack direction="row" spacing={1}>
                                <Engineering sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} style={{fontSize: 60}}/>
                                <Typography variant="h5" gutterBottom>
                                    Мы не используем готовые решения, мы пишем свои!
                                </Typography>
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid xs={6} item>
                        <Item>
                            <Stack direction="row" spacing={1}>
                                <Paid sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} style={{fontSize: 60}}/>
                                <Typography variant="h5" gutterBottom>
                                    Мы предоставляем конкурентную заработную плату
                                </Typography>
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid xs={6} item>
                        <Item>
                            <Stack direction="row" spacing={1}>
                                <Terminal sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} style={{fontSize: 60}}/>
                                <Typography variant="h5" gutterBottom>
                                    Мы работаем без выходных, продуктивность превыше всего!
                                </Typography>
                            </Stack>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{width: "100%"}}>
                <Stack spacing={2}>
                    <Typography variant="h6">
                        Кто нам нужен? Мы ищем высококвалифицированные специалисты.
                        Код мы пишем на Rust и React, но это не важно, ведь в наносервисной архитектуре язык не играет
                        роли.
                    </Typography>
                    <Typography variant="h6">
                        Как выяснилось фронтенд можно выучить за неделю, поэтому если вы считаете себя крутым инженером,
                        не смотрите на стек - приходите к нам
                    </Typography>
                    {vacancies.map((v) => VacancyAccordion(v))}
                </Stack>
            </Box>
        </Stack>
    )
}
