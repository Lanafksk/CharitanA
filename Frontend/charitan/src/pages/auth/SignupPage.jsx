import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { TiArrowBackOutline } from "react-icons/ti"; // Typicons icon
import { useNavigate } from "react-router-dom";
import SignupForm from "../../components/auth/signupForm";
import charityImage from "../../assets/charity.png";

const SigninPage = () => {
    const theme = useTheme(); // theme hook
    const navigate = useNavigate(); // useNavigate hook

    return (
        <Box
        sx={{
            position: "relative",
            minHeight: "100vh", 
            backgroundImage: `url(${charityImage})`,
            backgroundSize: "cover", // fill screen but keep ratio
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat", // restrict background image repeatation
        }}
        >
            {/* backbutton */}
            <IconButton
                sx={{
                position: "absolute",
                top: '50px',
                left: '70px',
                }}
                onClick={() => {
                    navigate("/");
                }}
            >
                <TiArrowBackOutline size={40} color={theme.palette.colors.white} />
            </IconButton>

            {/* Signup Form */}
            <Box
                sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1, // child component takes space of parent
                }}
            >
                <Box
                    sx={{
                        width: "90%",
                        maxWidth: "400px",
                        marginBottom: "5%",
                    }}
                >
                    <SignupForm />
                </Box>
            </Box>
        </Box>
    );
    };

    export default SigninPage;
