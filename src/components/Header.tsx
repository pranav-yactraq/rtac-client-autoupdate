import { Box } from "@mui/material";
import yactraqLogo from '../assets/yactraq_logo.svg';


import { useState } from "react";

import AccountIconMenu from "./AccountIconMenu";
import { useAuth } from "../hooks/Auth";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const { isLoggedIn, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        logout();
        navigate("/")
    };
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 2,
                backgroundColor: 'transparent', // Transparent header background
                width: '100%', // Full width
            }}
        >

            <Box
                component="img"
                src={yactraqLogo}
                alt="Logo"
                sx={{
                    height: '40px',
                }}
            />
            {isLoggedIn && <AccountIconMenu anchorEl={anchorEl} open={open} handleClick={handleClick} handleClose={handleClose}/>}

            
        </Box>
    )
}

export default Header;