import React, { useState } from "react";
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

  const handleImageClick = (imageLink) => {
    setSelectedImage(`${window.env.REACT_APP_BASE_URL}/${imageLink}`);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
            <Box key={index} sx={{ maxWidth: 200, width: "50%" }}>
              <img
                src={`${window.env.REACT_APP_BASE_URL}/${image.ImageLink}`}
                alt={image.Foto}
                className="thumbnail-image"
                onClick={() => handleImageClick(image.ImageLink)}
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
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            position: "relative",
            outline: "none",
            maxWidth: "75vw",
            maxHeight: "75vh",
            overflow: "auto",
          }}
        >
          <Button
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "black",
              fontSize: "24px",
            }}
          >
            X
          </Button>
          <img
            src={selectedImage}
            alt="Full Size"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default ImageSlider;
