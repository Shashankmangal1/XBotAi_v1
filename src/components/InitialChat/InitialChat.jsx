import { Box, Typography, Stack, Grid } from '@mui/material';
import icon from '../../assets/bot.png';
import Card from './Card';

export default function InitialChat({ generateResponse }) {

    const initialData = [
        {
            heading: 'Hi, what is the weather',
            subtext: 'Get immediate AI generated response'
        },
        {
            heading: 'Hi, what is my location',
            subtext: 'Get immediate AI generated response'
        },
        {
            heading: 'Hi, what is the temperature',
            subtext: 'Get immediate AI generated response'
        },
        {
            heading: 'Hi, how are you',
            subtext: 'Get immediate AI generated response'
        },
    ];

    return (
        <Stack
            flex={1}
            justifyContent="flex-start"
            alignItems="center"
            px={{ xs: 2, md: 3 }}
            py={4}
            width="100%"
            maxWidth="900px"
            mx="auto"
        >

            {/* Heading + Icon */}
            <Stack alignItems="center" spacing={2} mt={{ xs: 2, md: 6 }} mb={{ xs: 3, md: 4 }}>
                <Typography
                    variant="h2"
                    textAlign="center"
                    fontSize={{ xs: '1.8rem', md: '2.5rem' }}
                    fontWeight={700}
                >
                    How Can I Help You Today?
                </Typography>

                <Box
                    component="img"
                    src={icon}
                    height={{ xs: 50, md: 70 }}
                    width={{ xs: 50, md: 70 }}
                    boxShadow={4}
                    borderRadius="50%"
                />
            </Stack>

            {/* Suggestion Cards Grid */}
            <Grid container spacing={{ xs: 1.5, md: 3 }} width="100%">
                {initialData.map(item => (
                    <Grid item key={item.heading} xs={12} md={6}>
                        <Card
                            heading={item.heading}
                            subtext={item.subtext}
                            handleClick={generateResponse}
                        />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
