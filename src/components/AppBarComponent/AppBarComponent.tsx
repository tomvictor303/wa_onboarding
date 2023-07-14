import * as React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import logo from '../../assets/images/logo.png';
import { APP_CONSTANTS } from '../../config/config';

const { APP_TITLE } = APP_CONSTANTS;

const menus: Array<any> = [
    {
        title: 'Dashboard',
        path: '/dashboard',
    },
    {
        title: 'Importers',
        path: '/importers/list',
    },
    {
        title: 'Connections',
        path: '/connections',
    },
    {
        title: 'Onboarding',
        path: '/admin_onboarding/list',
    },
    {
        title: 'Logout',
        path: '/logout',
    },
];

export default function PrimarySearchAppBar({}) {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen: boolean = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event: any) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile Mobile-menu';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            className=""
        >
            {menus.map((menu_item: any, index: number) =>
                <li key={index} className="nav-link mobile-menu-width">
                    <NavLink to={menu_item['path']}>{menu_item['title']}</NavLink>
                </li>
            )}
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1, background: '#FFFFFF' }}>
            <AppBar position="static" sx={{ boxShadow: 'none', background: '#FFFFFF' }}>
                <Container maxWidth="lg">
                    <Toolbar className="navbar">
                        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'block', sm: 'block' } }}>
                            <NavLink to="https://weeklyaccounting.com">
                                <img
                                    src={logo}
                                    alt={APP_TITLE}
                                    className="AppLogo"
                                />
                            </NavLink>
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />
                        <Box
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                            style={{ height: '76px', alignItems: 'center' }}
                        >
                            {menus.map((menu_item: any, index: number) =>
                                <li key={index} className="nav-link">
                                    <NavLink to={menu_item['path']}>{menu_item['title']}</NavLink>
                                </li>
                            )}
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                sx={{ color: 'info' }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {renderMobileMenu}
        </Box>
    );
}
