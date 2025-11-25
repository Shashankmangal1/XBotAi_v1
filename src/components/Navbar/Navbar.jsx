import { Typography, Stack, IconButton, useMediaQuery } from '@mui/material';
import { Link, useOutletContext } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../../theme/ThemeContext';
import { useContext } from 'react';

export default function Navbar() {

    const { handleMobileMenu } = useOutletContext();
    const isMobile = useMediaQuery('(max-width:800px)');
    const { setMode, mode } = useContext(ThemeContext);

    return (
        <Stack
            component={'header'}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            px={{ xs: 2, md: 4 }}
            py={{ xs: 1.5, md: 2 }}
        >
            {/* LEFT SIDE */}
            <Stack direction={'row'} spacing={2} alignItems={'center'}>

                {/* Mobile Sidebar Toggle */}
                {isMobile && (
                    <MenuIcon
                        onClick={() => handleMobileMenu(prev => !prev)}
                        style={{ cursor: 'pointer' }}
                    />
                )}

                {/* LOGO / TITLE */}
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Typography
                        variant="h6"
                        fontWeight={600}
                        color="text.primary"
                    >
                        Bot AI
                    </Typography>
                </Link>
            </Stack>

            {/* RIGHT SIDE */}
            <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography fontSize={11} textTransform="capitalize">
                    {mode}
                </Typography>

                <IconButton
                    onClick={() =>
                        setMode(prev => prev === 'light' ? 'dark' : 'light')
                    }
                    size="small"
                >
                    {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
            </Stack>
        </Stack>
    );
}
