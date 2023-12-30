// src/Header.tsx
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { ClearAll, Menu, RestartAlt } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setStep } from '../../features/app';

const HamburgerButton = styled(Button)`
  && {
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

const GradientAppBar = styled(AppBar)`
  background: linear-gradient(to right, #5068cb, #100c84);
`;

const Header: React.FC = () => {
    const { appName } = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const menuItems = [
        { text: 'Giriş Yap', link: '/giris-yap' },
        { text: 'Kayıt Ol', link: '/kayit-ol' },
        { text: 'Hakkımızda', link: '/hakkimizda' },
    ];

    const resetSteps = () => {
        dispatch(setStep({ week: 1, task: 1 }));
    }

    return (
        <>
            <GradientAppBar position="static">
                <Toolbar>
                    <HamburgerButton
                        onClick={toggleDrawer}>
                        <Menu className="text-white" />
                    </HamburgerButton>
                    <Link to="/" className="flex-grow">
                        <Typography variant="h6" component="div">
                            {appName}
                        </Typography>
                    </Link>
                    <div className="hidden md:flex space-x-4">
                        <Button onClick={resetSteps} style={{ textTransform: 'none' }} endIcon={<RestartAlt />} color="inherit">
                            Sıfırla
                        </Button>
                        {menuItems.map((item) => (
                            <Button onClick={() => navigation(item.link)} style={{ textTransform: 'none' }} key={item.text} color="inherit">
                                {item.text}
                            </Button>
                        ))}
                    </div>
                </Toolbar>
            </GradientAppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            key={item.text}
                            onClick={() => {
                                navigation(item.link);
                                toggleDrawer();
                            }}>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default Header;
