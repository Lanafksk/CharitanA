import React from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import NavigationBar from "../../components/navigationBar";
import { useLocation } from "react-router-dom";
import PageBanner from "../../components/pageBanner";
import AboutMemberCard from "../../components/aboutMemberCard";

import Nam from "../../assets/teammates/Nam.jpg";
import Lana from "../../assets/teammates/Lana.png";
import Kenny from "../../assets/teammates/Kenny.jpeg";
import MinhTran from "../../assets/teammates/MinhTran.png";

import Vally from "../../assets/teammates/Vally.png";
import Vinh from "../../assets/teammates/Vinh.jpg";
// empty Bao
import Luan from "../../assets/teammates/Luan.jpg";
import Hoang from "../../assets/teammates/Hoang.png";



// 인물 데이터 배열
const teamDataA = [
    { id: 1, name: "Nam Pham Thanh", team: "Team A", image: Nam },
    { id: 2, name: "Sanghwa Jung", team: "Team A", image: Lana },
    { id: 3, name: "Khanh Nguyen Gia", team: "Team A", image: Kenny },
    { id: 4, name: "Minh Tran Ngoc", team: "Team A", image: MinhTran },
];

const teamDataB = [
    { id: 1, name: "Anh Nguyen Duc", team: "Team B", image: Vally },
    { id: 2, name: "Vinh Le Thanh", team: "Team B", image: Vinh },
    { id: 3, name: "Bao Luong Gia", team: "Team B", image: "/assets/teammates/studentB.jpg" },
    { id: 4, name: "Luan Vinh Dang", team: "Team B", image: Luan },
    { id: 5, name: "Dat Tran Xuan Hoang", team: "Team B", image: Hoang },
];


const AboutUsPage = () => {
    const location = useLocation();

    

    return (
        <Box>
            <NavigationBar currentPage={location.pathname} />
            <PageBanner text="About Us" />
            <Box sx={{ textAlign: "center", py: 5, px: 2 }}>
                <Typography fontSize={40} fontWeight="bold" >
                    Our Mission
                </Typography>

                {/* line */}
                <Divider
                    sx={{
                        width: "400px",
                        margin: "0 auto 20px auto",
                        borderBottomWidth: "3px",
                        borderColor: "#fb1465", // 강조선 색상
                    }}
                />

                {/* 설명 텍스트 */}
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        maxWidth: "800px",
                        margin: "0 auto",
                        lineHeight: 1.8,
                    }}
                >
                    There are many ways you can help support our work. You can make a financial contribution, volunteer your time, or donate goods or services. Every little bit helps and we are grateful for your support! We have Funded{" "}
                    <strong style={{ color: "#fb1465" }}>500k</strong> Dollars Over and we have{" "}
                    <strong style={{ color: "#fb1465" }}>30 Years</strong> of experience.
                </Typography>
            </Box>
            <Box sx={{ px: 2, mt: "30px" , mb: "60px" }}>
            {/* 인물 카드 그리드 */}
                <Grid container justifyContent="center">
                    {teamDataA.map((person) => (
                        <Grid item xs={6} sm={2} key={person.id}>
                            <AboutMemberCard
                                image={person.image}
                                name={person.name}
                                team={person.team}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{ px: 2, mt: "30px", mb: "100px" }}>
            {/* 인물 카드 그리드 */}
                <Grid container justifyContent="center">
                    {teamDataB.map((person) => (
                        <Grid item xs={6} sm={2} key={person.id}>
                            <AboutMemberCard
                                image={person.image}
                                name={person.name}
                                team={person.team}
                            />
                        </Grid>
                    ))}
                    
                </Grid>
            </Box>
        </Box>
    );
};

export default AboutUsPage;
