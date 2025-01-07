import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Icon } from "@iconify/react";

const CustomPrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      cursor: "pointer",
      padding: "5px",
    }}
  >
    <Icon icon="solar:alt-arrow-left-line-duotone" color="white" width={24} />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      cursor: "pointer",
      padding: "5px",
    }}
  >
    <Icon icon="solar:alt-arrow-right-line-duotone" color="white" width={24} />
  </div>
);

const CarouselSection = ({ images }) => {
  const [loadedImages, setLoadedImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadImages = () => {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setLoadedImages((prev) => [...prev, src]);
        };
      });
    };
    loadImages();
  }, [images]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (_, next) => setCurrentSlide(next), // 슬라이드 변경 시 현재 슬라이드 업데이트
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px", // 캐러셀 내부 하단
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          zIndex: 2,
        }}
      >
        {dots}
      </div>
    ),
    customPaging: (i) => (
      <Box
        sx={{
          width: "10px",
          height: "10px",
          backgroundColor: i === currentSlide ? "#FB1465" : "#FFF", // 현재 슬라이드와 비교
          borderRadius: "50%",
          mx: 0.5,
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#FB1465",
          },
        }}
      />
    ),
  };

  return (
    <Box
      sx={{
        margin: "0 auto",
        width: "100%",
        height: "400px", // 고정 높이
        overflow: "hidden",
        mb: 2,
        position: "relative",
      }}
    >
      {loadedImages.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px", // 로딩 중에도 높이를 동일하게 유지
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Slider {...settings}>
          {loadedImages.map((src, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                height: "400px", // 슬라이드도 고정 높이
                position: "relative",
              }}
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // 이미지를 크기에 맞게 잘리거나 확대
                }}
              />
            </Box>
          ))}
        </Slider>
      )}
    </Box>
  );
  
};

export default CarouselSection;
