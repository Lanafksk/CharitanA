import React from "react";
import { Box, Typography } from "@mui/material";
import charityImage from "../assets/charity.png";

const PageBanner = ({ text }) => {
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "35vh", // fixed height
                backgroundImage: `url(${charityImage})`, 
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.4)", // transparent black
                    zIndex: 1, // under text
                }}
            />

            {text && (
                <Typography
                    variant="h3"
                    sx={{
                        padding: "10px 20px",
                        borderRadius: "5px",
                        zIndex: 2, // over background
                        fontWeight: "bold",
                        color: "white",

                    }}
                >
                    {text}
                </Typography>
            )}
        </Box>
    );
};

export default PageBanner;
