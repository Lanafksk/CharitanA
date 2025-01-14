import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { TiArrowBackOutline } from 'react-icons/ti'; // Typicons icon
import { useNavigate } from 'react-router-dom';
import RecoveryPWForm from "../../components/auth/recoverypwForm";
import charityImage from '../../assets/charity.png'; 

const RecoveryPage = () => {
    const theme = useTheme(); // theme hook
    const navigate = useNavigate(); // useNavigate hook

    return (
        <Box
            sx={{
            position: "relative", // children components position set
            width: "100%",
            height: "100vh", // height for whole screen
            backgroundImage: `url(${charityImage})`, 
            backgroundSize: "cover", // fill container with image
            backgroundPosition: "center",
        }}
        >
            {/* button to go back */}
            <IconButton
                sx={{
                position: 'absolute',
                top: '50px',
                left: '70px',
                }}
                onClick={() => {
                    navigate('/');
                }}
            >
                <TiArrowBackOutline size={40} color={theme.palette.colors.white} /> 
            </IconButton>

            <Box
                sx={{
                position: 'absolute', // children components position set
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', // center align
                width: '90%',
                maxWidth: '400px',
            }}>
            <RecoveryPWForm />
            </Box>
        </Box>
    );
};

export default RecoveryPage;
