import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const AboutMemberCard = ({ image, name, team }) => {
    return (
        <Box
            sx={{
                textAlign: "center",
                margin: "0 auto",
            }}
        >
            {/* image */}
            <Avatar
                src={image}
                alt={name}
                sx={{
                    width: 150,
                    height: 150,
                    margin: "0 auto",
                }}
            />

            {/* 이름 */}
            <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
                {name}
            </Typography>

            {/* 팀 이름 */}
            <Typography fontSize="18px" color="text.secondary">
                {team}
            </Typography>
        </Box>
    );
};

export default AboutMemberCard;
