import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import Slider from "react-slick";
import "./ImageSlider.css";

const ArrowButton = ({ direction, onClick }) => (
  <Button className={`slick-arrow ${direction}`} onClick={onClick}>
    <span className="arrow">{direction === "next" ? "▶" : "◀"}</span>
  </Button>
);

function ImageSlider({ images }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (imageLink, index) => {
    setSelectedImage(`${window.env.REACT_APP_BASE_URL}/${imageLink}`);
    setCurrentIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleNextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(
      `${window.env.REACT_APP_BASE_URL}/${images[nextIndex].ImageLink}`
    );
    setCurrentIndex(nextIndex);
  };

  const handlePrevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(
      `${window.env.REACT_APP_BASE_URL}/${images[prevIndex].ImageLink}`
    );
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleNextImage();
      } else if (event.key === "ArrowLeft") {
        handlePrevImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: images?.length > 0 ? Math.min(images.length, 4) : 1,
    slidesToScroll: 1,
    vertical: false,
    nextArrow: <ArrowButton direction="next" />,
    prevArrow: <ArrowButton direction="prev" />,
  };

  return (
    <Box
      className="image-slider-container"
      sx={{ maxWidth: "100%", width: "100%" }}
    >
      <div style={{ paddingBottom: "20px" }}></div>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Galería
      </Typography>
      <div style={{ paddingBottom: "20px" }}></div>
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((image, index) => (
            <Box key={index}>
              <img
                src={`${window.env.REACT_APP_BASE_URL}/${image.ImageLink}`}
                alt={image.Foto}
                className="thumbnail-image"
                onClick={() => handleImageClick(image.ImageLink, index)}
                loading="lazy"
              />
            </Box>
          ))}
        </Slider>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Sin imágenes
        </Typography>
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
        }}
      >
        <Box
          sx={{
            position: "relative",
            outline: "none",
            maxWidth: "75%",
            maxHeight: "100%",
            // maxHeight: "75%",
            // overflow: "auto", // Retain overflow for scrolling
            // backgroundColor: "white", // Add a background color for better visibility
            // padding: "10px", // Add padding for spacing
            // borderRadius: "10px", // Optional: to add rounded corners
          }}
        >
          <Button
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "#008d00",
              fontSize: "24px",
            }}
          >
            X
          </Button>
          <img
            src={selectedImage}
            alt="Full Size"
            style={{
              display: "block", // Ensure the image is a block element
              maxWidth: "100%", // Limit width to 100% of parent
              maxHeight: "100%", // Limit height to 100% of parent
              objectFit: "contain", // Keep aspect ratio
              margin: "auto", // Center image within the container
            }}
          />

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={handlePrevImage}
              disabled={images.length <= 1}
              sx={{
                backgroundColor: "transparent",
                border: "solid #008d00 1px",
                cursor: "pointer",
                fontSize: "32px",
                color: "#008d00",
                outline: "#008d00",
                position: "absolute",
                left: 0,
              }}
            >
              ◀
            </Button>
            <Button
              onClick={handleNextImage}
              disabled={images.length <= 1}
              sx={{
                backgroundColor: "transparent",
                border: "solid #008d00 1px",
                cursor: "pointer",
                fontSize: "32px",
                color: "#008d00",
                outline: "#008d00",
                position: "absolute",
                right: 0,
              }}
            >
              ▶
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default ImageSlider;
