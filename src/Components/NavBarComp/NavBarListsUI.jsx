
import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import Menu from '@mui/icons-material/Menu';
import "./NavBarListsUI.css"
import { Link } from 'react-router-dom'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { useNavigate } from "react-router-dom";
import {supabase} from "../../Data/SupabaseData.jsx";
import RecentActorsRoundedIcon from '@mui/icons-material/RecentActorsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function NavBarListsUI() {

    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleToggleDrawer = () => {
        setOpen(!open);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
    };


    useEffect(() => {
        const updateWindowWidth = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', updateWindowWidth);

        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
    }, []);

    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) => {
                if (value.data?.user){
                    setUser(value.data.user)
                }else {
                    setUser({})
                }
            })
        }
        getUserData();
    });


    async function signOutUser(){
        const {error} = await supabase.auth.signOut();
        navigate("/")
    }

    return (
        <React.Fragment>
            {isMobile && (
                <IconButton variant="outlined" color="neutral" onClick={handleToggleDrawer} style={{ color: 'white' }}>
                    <Menu />
                </IconButton>
            )}
            {isMobile && (
                <Drawer open={open} onClose={handleCloseDrawer}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            ml: 'auto',
                            mt: 1,
                            mr: 1,
                        }}
                    >
                        <Typography
                            component="label"
                            htmlFor="close-icon"
                            fontSize="sm"
                            fontWeight="lg"
                            sx={{ cursor: 'pointer' }}
                        >
                            <h1 style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}>close</h1>
                        </Typography>
                        <ModalClose id="close-icon" sx={{ position: 'initial' }} />
                    </Box>
                    <List
                        size="lg"
                        component="nav"
                        sx={{
                            flex: 'none',
                            mt: 3,
                            '& > div': { justifyContent: 'flex-start' }, // Align text to the left
                        }}
                    >
                        {Object.keys(user).length !== 0 ? (
                            <>
                                <Link to={"/jobs"}>
                                    <ListItemButton onClick={handleCloseDrawer} style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif', justifyContent: 'flex-start', gap: "3px" }}>
                                        <RecentActorsRoundedIcon fontSize="medium" /> Jobs
                                    </ListItemButton>
                                </Link>

                                <Link to={"/profile"}>
                                    <ListItemButton onClick={handleCloseDrawer} style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif', justifyContent: 'flex-start', gap: "3px" }}>
                                        <AccountCircleRoundedIcon fontSize="medium" /> Profile
                                    </ListItemButton>
                                </Link>

                                <Link to={"/search"}>
                                    <ListItemButton onClick={handleCloseDrawer} style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif', justifyContent: 'flex-start', gap: "3px" }}>
                                        <SearchRoundedIcon fontSize="medium" /> Search
                                    </ListItemButton>
                                </Link>

                                <ListItemButton onClick={signOutUser} style={{color: "red", fontWeight: 700, fontFamily: 'Poppins, sans-serif', justifyContent: 'flex-start', gap: "3px" }}>
                                    Sign out
                                </ListItemButton>

                            </>
                        ) : (
                            <Link to={"/signin"}>
                                <ListItemButton onClick={handleCloseDrawer} style={{ fontWeight: 700, fontFamily: 'Poppins, sans-serif', justifyContent: 'flex-start', gap: "3px" }}>
                                    <ExitToAppRoundedIcon fontSize="medium" /> Signin
                                </ListItemButton>
                            </Link>
                        )}


                    </List>
                </Drawer>
            )}
            {!isMobile && (
                <ul className={"flex gap-5"}>

                    {Object.keys(user).length !== 0 ? (
                        <>
                            <Link to={"/jobs"}>
                                <li className={"navbar--links gap-1 flex items-center transition-colors duration-300 hover:text-purple-500"}>
                                    <RecentActorsRoundedIcon fontSize="medium" /> Jobs
                                </li>
                            </Link>

                            <Link to={"/profile"}>
                                <li className={"navbar--links gap-1 flex items-center transition-colors duration-300 hover:text-purple-500"}>
                                    <AccountCircleRoundedIcon fontSize="medium" /> Profile
                                </li>
                            </Link>


                            <Link to={"/search"}>
                                <li className={"navbar--links gap-1 flex items-center transition-colors duration-300 hover:text-purple-500"}>
                                    <SearchRoundedIcon fontSize="medium" /> Search
                                </li>
                            </Link>

                            <li className={"navbar--links gap-1 flex items-center transition-colors duration-300 text-red-500 hover:cursor-pointer"} onClick={signOutUser}>
                                Sign out
                            </li>
                        </>
                    ) : (
                        <Link to={"/signin"}>
                            <li className={"navbar--links gap-1 flex items-center transition-colors duration-300 hover:text-purple-500"}>
                                <ExitToAppRoundedIcon fontSize="medium" /> Signin
                            </li>
                        </Link>
                    )}
                </ul>
            )}
        </React.Fragment>
    );
}
