import React, { useState } from "react";
import { Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useDarkTheme from "../../Theme/useDarkTheme";
import { ThemeProvider } from "@mui/material";
import { createBanners } from "../../DAL/create";

const AddBanners = () => {
  const navigate = useNavigate();
  const { theme } = useDarkTheme();
  const [formData, setFormData] = useState({
    banner: null,
  });
  console.log("FORM DATA: ", formData);

  const [selectedImagePreview, setSelectedImagePreview] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (name === "banner") {
      if (files.length > 0) {
        const file = files[0];
        setFormData((prevData) => ({
          ...prevData,
          banner: file,
        }));
        setSelectedImagePreview(URL.createObjectURL(file));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          banner: null,
        }));
        setSelectedImagePreview(null);
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit the Banner?"
    );

    if (confirmSubmit) {
      const formDataToSend = new FormData();
      formDataToSend.append("banner", formData.banner);

      console.log("Form Data:", ...formDataToSend);
      try {
        const response = await createBanners(formDataToSend);
        if (response.status) {
          alert("Banner Submit Sucessfully!");
          navigate("/Banners");
        } else {
          alert("Error creating Banner: " + response.message.banner);
          console.error("Error creating Banner:", response.message);
        }
      } catch (error) {
        alert("An error occurred while creating the Banner. Please try again.");
        console.error("Error creating Banner:", error);
      }
    } else {
      console.log("Banner submission canceled by the user.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Add Banner
        </Typography>
        <form onSubmit={handleSubmit}>
          {selectedImagePreview && (
            <div>
              <Typography variant="subtitle1">New banner Preview:</Typography>
              <img
                src={selectedImagePreview}
                alt="New banner Preview"
                style={{ width: "100%", height: "auto", marginBottom: "16px" }}
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            name="banner"
            onChange={handleChange}
            style={{ margin: "20px 0" }}
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default AddBanners;
