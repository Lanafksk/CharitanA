import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { TiArrowBackOutline } from "react-icons/ti"; // Typicons icon
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/auth/signupForm";
import charityImage from "../assets/charity.png";

const SigninPage = () => {
    const theme = useTheme(); // theme hook
    const navigate = useNavigate(); // useNavigate hook

    return (
        <Box
        sx={{
            position: "relative",
            minHeight: "100vh", 
            backgroundImage: `url(${charityImage})`,
            backgroundSize: "cover", // 화면 전체를 채우되 비율 유지
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat", // 배경 이미지 반복 방지
            //display: "flex", // 자식 요소 정렬
            //flexDirection: "column", // 상단 버튼과 폼을 세로 정렬
            //justifyContent: "space-between", // 위와 아래 콘텐츠 간 거리 확보
        }}
        >
            {/* 상단의 뒤로가기 버튼 */}
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

            {/* 중앙의 Signup Form */}
            <Box
                sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1, // 자식 요소가 남은 공간 차지
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
