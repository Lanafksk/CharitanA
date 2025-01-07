import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Icon } from "@iconify/react";

const CustomPrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      left: "-40px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
      cursor: "pointer",
    }}
  >
  <Icon icon="solar:alt-arrow-left-line-duotone" width={24} style={{ marginRight: "10px" }} />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      right: "-40px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
      cursor: "pointer",
    }}
  >
  <Icon icon="solar:alt-arrow-right-line-duotone" width={24} style={{ marginRight: "10px" }} />
  </div>
);

const CarouselSection = ({images}) => {
  // const [loading, setLoading] = useState(true); // 로딩 상태 관리
  // const [loadedImages, setLoadedImages] = useState(0); // 로드된 이미지 개수
  const [loadedImages, setLoadedImages] = useState([]); // 로드된 이미지만 저장


  useEffect(() => {
    const loadImages = () => {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setLoadedImages((prev) => [...prev, src]); // 로드된 이미지만 추가
        };
      });
    };
    loadImages();
  }, [images]);

  // // 모든 이미지 로드 확인 후 로딩 해제
  // useEffect(() => {
  //   if (loadedImages === images.length) {
  //     setLoading(false);
  //   }
  // }, [loadedImages, images]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots) => (
      <div>
        {dots.map((dot, index) => (
          <div
            key={index}
            style={{
              cursor: "pointer",
            }}
          >
            {dot}
          </div>
        ))}
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          backgroundColor: i === 0 ? "pink" : "gray",
        }}
      ></div>
    ),
  };

  return (
    <div
      style={{
        margin: "0 auto",
        padding: "20px",
        Width: "100%",
        overflow: "hidden",
        marginBottom: "20px",
        position: "relative", // 화살표 위치 조정을 위한 position
      }}
    >
      {loadedImages.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress /> {/* MUI 로딩 표시 */}
        </div>
      ) : (
        <Slider {...settings}>
          {loadedImages.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                loading="lazy" // Lazy Loading 적용
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default CarouselSection;
