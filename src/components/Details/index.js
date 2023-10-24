import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Link,
  Card,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import DownloadFile from "./DownloadFile";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DownloadIcon from "@mui/icons-material/Download";
import { EmailRounded } from "@mui/icons-material";

export const Details = () => {
  const { id } = useParams();
  const [post, setItemDetails] = useState(null);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Headers for the API request
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("x-api-key", window.env.REACT_APP_X_API_KEY); // API endpoint URL for POST request

        const apiUrl = `${window.env.REACT_APP_BASE_URL}/post/detalle`; // Fetch item details based on the 'id' parameter using POST method and specified headers

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: myHeaders,
          body: `idPost=${id}`,
          redirect: "follow",
        });

        if (response.ok) {
          const data = await response.json();
          setItemDetails(data[0]);
          setIsLoading(true);

          const filesResponse = await fetch(
            `${window.env.REACT_APP_BASE_URL}/post/detalle/files`,
            {
              method: "POST",
              headers: myHeaders,
              body: `idPost=${id}`,
              redirect: "follow",
            },
          );

          if (filesResponse.ok) {
            const filesData = await filesResponse.json();
            setFiles(filesData); // Store files data in state
            setIsLoading2(true);
          } else {
            console.error("Error fetching files:", filesResponse.statusText);
          }
        } else {
          console.error("Error fetching item details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
      {isLoading ? (
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
          <Box display="flex" justifyContent="space-between">
            <Card
              sx={{
                flex: 1,
                padding: 3,
                justifySelf: "start",
                elevation: 10,
              }}
            >
              <Typography variant="h4" gutterBottom>
                {post?.Titulo}
              </Typography>

              <Typography variant="body1" gutterBottom>
                {post?.descripcion}
              </Typography>

              {post?.youtube && (
                <Box>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${
                      post?.youtube.split("=")[1]
                    }`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </Box>
              )}

              <Typography variant="h4">Additional Information</Typography>

              <Typography variant="body2">{post?.info_adicional}</Typography>

              {/* <Typography variant="body2">
                <a href={`mailto:${post?.correo}`}>{post?.correo}</a>
              </Typography> */}
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.2rem",
                  padding: "1rem",
                  borderRadius: "1rem",
                  cursor: "pointer",
                }}
              >
                <EmailRounded sx={{ marginRight: ".5rem" }} />
                {post.correo}
              </Typography>
            </Card>

            <Card
              sx={{
                flex: 1,
                padding: 3,
                justifySelf: "end",
                elevation: 10,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Download Files
              </Typography>

              {isLoading2 ? (
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
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "green",
                            },
                          }}
                          onClick={() => window.open(file.FileLink, "_blank")}
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
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};
