import React from "react";
import {Box, Grid, Stack, styled, Typography} from "@mui/material";
import {Cake, Engineering, Paid, Terminal} from "@mui/icons-material";

const Item = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export const ContactsPage = () => {
    return (
        <Stack spacing={2}>
            <Typography variant="h2">Rndmcffe - это уголок уюта посреди big-tech'а</Typography>
            <Typography variant="h3">Мы будем рады новым людям в нашей команде</Typography>
            <Box sx={{width: "100%"}}>
                <Grid container justifyContent="center" spacing={3} rowSpacing={2}>
                    <Grid xs={6} item>
                        <Item>
                            <Stack direction="row" spacing={1}>
                                <Cake sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} style={{fontSize: 60}}/>
                                <Typography variant="h4" gutterBottom>
                                    Мы - маленькая семья, у нас общие цели и ценности.
                                </Typography>
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid xs={6} item>
                        <Item>
                            <Stack direction="row" spacing={1}>
                                <Engineering sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} style={{fontSize: 60}}/>
                                <Typography variant="h4" gutterBottom>
                                    Мы не используем готовые решения, мы пишем свои!
                                </Typography>
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid xs={6} item>
                        <Item>
                            <Stack direction="row" spacing={1}>
                                <Paid sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} style={{fontSize: 60}}/>
                                <Typography variant="h4" gutterBottom>
                                    Мы предоставляем конкурентную заработную плату
                                </Typography>
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid xs={6} item>
                        <Item>
                            <Stack direction="row" spacing={1}>
                                <Terminal sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} style={{fontSize: 60}}/>
                                <Typography variant="h4" gutterBottom>
                                    Мы работаем без выходных, продуктивность превыше всего!
                                </Typography>
                            </Stack>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{width: "100%"}}>
                <Typography>
                Кто нам нужен? Мы ищем высококвалифицированные специалисты.
                Код мы пишем на Rust и React, но это не важно, ведь в наносервисной архитектуре язык не играет роли.
                Как выяснилось фронтенд может
                </Typography>
            </Box>
        </Stack>
    )
}
