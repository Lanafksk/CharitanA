import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Icon } from "@iconify/react";
import charityImage from "../../assets/charity.png";
import projectImage from "../../assets/project.jpg";



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

  const imagess = [charityImage, projectImage];

  useEffect(() => {
    const loadImages = () => {
      imagess.forEach((src) => {
        if (!loadedImages.includes(src)) {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            setLoadedImages((prev) => {
              if (!prev.includes(src)) {
                return [...prev, src];
              }
              return prev;
            });
          };
        }
      });
    };
    loadImages();
  }, [imagess, loadedImages]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (_, next) => setCurrentSlide(next), // update slides
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px", // put inside of carousel
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
          backgroundColor: i === currentSlide ? "#FB1465" : "#FFF", 
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
        height: "400px", 
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
            height: "400px", // keep height while loading
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
                height: "400px", 
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
                  objectFit: "cover", // fit the image size
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
