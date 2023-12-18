import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Link,
  Card,
  Button,
  Box,
  CircularProgress,
  image,
} from "@mui/material";
import DownloadFile from "./DownloadFile";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DownloadIcon from "@mui/icons-material/Download";
import { EmailRounded } from "@mui/icons-material";
import PlayCircleFilledWhiteRounded from "@mui/icons-material/PlayCircleFilledWhiteRounded";
import ImageSlider from "../ImageSlider";

export const Details = () => {
  const { id } = useParams();
  const [post, setItemDetails] = useState(null);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [images, setImages] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Headers for the API request
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("x-api-key", window.env.REACT_APP_X_API_KEY);
        //add cors header
        //myHeaders.append("Access-Control-Allow-Origin", "*");

        const apiUrl = `${window.env.REACT_APP_BASE_URL}/telehuertos/api/post/detalle`;
        const apiImagesUrl = `${window.env.REACT_APP_BASE_URL}/telehuertos/api/post/detalle/images`;

        // Function to perform the fetch operation
        const fetchAndProcess = async (url) => {
          const response = await fetch(url, {
            method: "POST",
            headers: myHeaders,
            body: `idPost=${id}`,
            redirect: "follow",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json();
        };

        // Fetch item details
        const data = await fetchAndProcess(apiUrl);
        setItemDetails(data[0]);

        // Fetch files
        const filesData = await fetchAndProcess(
          `${window.env.REACT_APP_BASE_URL}/telehuertos/api/post/detalle/files`
        );
        setFiles(filesData);

        // Fetch images
        const imagesData = await fetchAndProcess(apiImagesUrl);
        setImages(imagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
        setIsLoading2(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Box
      sx={{
        backgroundColor: "#e7f4e7",
        padding: 2,
        elevation: 10,
      }}
    >
      {!isLoading ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Button
              color="success" // Change color to green
              startIcon={<ArrowBackIosIcon />}
              onClick={() => {
                navigate("/");
              }}
              sx={{
                marginBottom: 1,
                fontSize: "1.2rem", // Increase font size
                padding: "1rem", // Increase padding
                borderRadius: "1rem", // Increase border radius
              }}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{
              "@media (max-width: 576px)": {
                flexDirection: "column",
              },
            }}
          >
            <Card
              sx={{
                flex: 1,
                padding: 3,
                justifySelf: "start",
                elevation: 10,
                "@media (max-width: 576px)": {
                  flexWrap: "wrap",
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{ textAlign: "justify" }}
                gutterBottom
              >
                {post?.Titulo}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textAlign: "justify",
                  "& ul, & ol": {
                    paddingLeft: 0,
                    listStylePosition: "inside",
                  },
                  "& li": {
                    paddingLeft: 0,
                  },
                }}
                gutterBottom
              >
                <div dangerouslySetInnerHTML={{ __html: post?.descripcion }} />
              </Typography>

              <Typography variant="h4" sx={{ textAlign: "justify" }}>
                Información Adicional
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textAlign: "justify",
                  "& ul, & ol": {
                    paddingLeft: 0,
                    listStylePosition: "inside",
                  },
                  "& li": {
                    paddingLeft: 0,
                  },
                }}
                gutterBottom
              >
                <div
                  dangerouslySetInnerHTML={{ __html: post?.info_adicional }}
                />
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.2rem",
                  padding: "1rem",
                  borderRadius: "1rem",
                  cursor: "pointer",
                  textAlign: "justify",
                }}
              >
                <EmailRounded sx={{ marginRight: ".5rem" }} />
                {post?.correo}
              </Typography>
            </Card>
            <Card
              sx={{
                flex: 1,
                padding: 3,
                justifySelf: "end",
                justifyContent: "start",
                textAlign: "left",
                elevation: 10,
                "@media (max-width: 576px)": {
                  flexWrap: "wrap",
                },
              }}
            >
              {post?.youtube && (
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "1rem",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 0,
                      paddingBottom: { xs: "100%", sm: "56.25%" }, // 16:9 aspect ratio
                    }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${
                        post?.youtube.split("=")[1]
                      }`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    ></iframe>
                  </Box>
                </Box>
              )}
              <div style={{ marginBottom: "20px" }}></div>
              <Typography
                variant="h4"
                sx={{ textAlign: "justify" }}
                gutterBottom
              >
                Archivos Adjuntos
              </Typography>

              {!isLoading2 ? (
                Array.isArray(files) && files.length >= 1 ? (
                  <>
                    {files.map((file, index) => (
                      <Box
                        sx={{ display: "flex", justifyContent: "left" }}
                        key={index}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "1.2rem",
                            padding: "1rem",
                            borderRadius: "1rem",
                            textAlign: "left",
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "#e7f4e7",
                              color: "black", // Change the letter color to white on hover
                            },
                          }}
                          onClick={() =>
                            window.open(
                              `${window.env.REACT_APP_BASE_URL}/${file.FileLink}`,
                              "_blank",
                              "about:blank"
                            )
                          }
                        >
                          <DownloadIcon sx={{ marginRight: ".5rem" }} />
                          {file.NombreArchivo}
                        </Typography>
                      </Box>
                    ))}
                  </>
                ) : (
                  <Typography variant="h6" textAlign="center">
                    No se encontró ningún registro.
                  </Typography>
                )
              ) : (
                <>
                  <CircularProgress />
                </>
              )}
            </Card>
          </Box>
          <div style={{ marginBottom: "20px" }}></div>
          <Card>
            <ImageSlider images={images} />
          </Card>
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};
