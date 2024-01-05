// src/Header.tsx
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { AppBar, Toolbar, Typography, Button, Menu, Drawer, List, ListItem, ListItemText, MenuItem } from '@mui/material';
import { ClearAll, Menu as MenuIcon, RestartAlt } from '@mui/icons-material';
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
  padding:6px;
  background: linear-gradient(to right, #5068cb, #100c84);
`;

const Header: React.FC = () => {
    const { appName, appDescription } = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const menuItems = [
        { text: 'Performans 1', link: "/performans/task-1" },
        { text: 'Performans 2', link: "/performans/task-2" },
        { text: 'Performans 3', link: "/performans/task-3" },
        { text: 'Giriş Yap', link: '/giris-yap' },
        { text: 'Kayıt Ol', link: '/kayit-ol' },
        { text: 'Biz Kimiz', link: '/hakkimizda' },
    ];

    const resetSteps = () => {
        dispatch(setStep({ week: 1, task: 1 }));
    }

    return (
        <>
            <GradientAppBar position="sticky">
                <Toolbar>
                    <HamburgerButton
                        onClick={toggleDrawer}>
                        <MenuIcon className="text-white" />
                    </HamburgerButton>
                    <Link to="/" className="flex-grow">
                        <div className='flex gap-2 items-center justify-start max-md:flex-col max-md:items-start max-md:gap-0'>
                            <Typography variant="h6" component="div">
                                {appName}
                            </Typography>
                            <small className='max-md:text-sm'>
                                <span className='max-md:hidden'>/</span> {appDescription}
                            </small>

                        </div>
                    </Link>
                    <div className="hidden md:flex space-x-4">

                        <Button
                            style={{ textTransform: 'none' }}
                            color="inherit"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            Performans Taskları
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}>
                            {menuItems.filter(item => item.text.toLocaleLowerCase().includes('performans')).map((item) => (
                                <MenuItem style={{ textTransform: 'none', }} onClick={() => {
                                    setAnchorEl(null)
                                    navigation(item.link)
                                }} key={item.text}>
                                    {item.text}
                                </MenuItem>
                            ))}
                        </Menu>

                        <Button onClick={resetSteps} style={{ textTransform: 'none' }} endIcon={<RestartAlt />} color="inherit">
                            Sıfırla
                        </Button>

                    </div>
                </Toolbar>
            </GradientAppBar>

            <Drawer PaperProps={{ sx: { width: "80%" } }} anchor="left" open={drawerOpen} onClose={toggleDrawer}>
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
