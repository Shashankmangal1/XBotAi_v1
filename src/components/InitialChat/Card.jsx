import { Box, Typography, Stack, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function Card({ heading, subtext, handleClick }) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={{ xs: 1.6, md: 3 }}
            bgcolor="primary.light"
            borderRadius={2}
            boxShadow="0 4px 14px rgba(0,0,0,0.08)"
            spacing={1}
            sx={{
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                '&:hover': {
                    bgcolor: 'primary.bglight',
                    transform: 'translateY(-2px)'
                },
                '&:hover .arrow-btn': {
                    opacity: 1,
                    transform: 'translateX(0px)'
                }
            }}
            onClick={() => handleClick(heading)}
        >
            {/* TEXT */}
            <Box flex={1}>
                <Typography
                    variant="heading"
                    fontWeight={700}
                    fontSize={{ xs: 14, md: 18 }}
                    color="text.primary"
                    sx={{ lineHeight: 1.3 }}
                >
                    {heading}
                </Typography>

                <Typography
                    color="text.secondary"
                    fontSize={{ xs: 11, md: 14 }}
                    sx={{ mt: 0.5 }}
                >
                    {subtext}
                </Typography>
            </Box>

            {/* ARROW ICON */}
            <IconButton
                size="small"
                className="arrow-btn"
                sx={{
                    opacity: 0,
                    transform: 'translateX(8px)',
                    bgcolor: 'primary.bglight',
                    transition: 'all 0.3s ease'
                }}
            >
                <ArrowUpwardIcon fontSize="inherit" />
            </IconButton>
        </Stack>
    );
}
