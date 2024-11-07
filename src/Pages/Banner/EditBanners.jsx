import React, { useState, useEffect } from "react";
import { Button, Typography, Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import useDarkTheme from "../../Theme/useDarkTheme";
import { ThemeProvider } from "@mui/material";
import { updateBanner } from "../../DAL/edit";
import { fileUrl } from "../../Config/Config";

const EditBanners = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useDarkTheme();

  const [formData, setFormData] = useState({
    banner: null,
    id: "",
  });

  const [selectedImagePreview, setSelectedImagePreview] = useState(null);

  useEffect(() => {
    if (location.state && location.state.Banner) {
      const { banner, id } = location.state.Banner;

      if (banner) {
        setSelectedImagePreview(`${fileUrl}/${banner}`);
        setFormData((prevData) => ({ ...prevData, id }));
      }
    }
  }, [location.state]);

  const handleChange = (event) => {
    const { name, files } = event.target;

    if (name === "banner" && files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        banner: file,
      }));
      setSelectedImagePreview(URL.createObjectURL(file));
    } else if (name === "banner") {
      setFormData((prevData) => ({
        ...prevData,
        banner: null,
      }));
      setSelectedImagePreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const confirmSubmit = window.confirm(
      "Are you sure you want to update the banner?"
    );

    if (confirmSubmit) {
      const formDataToSend = new FormData();
      formDataToSend.append("_method", "PUT");

      if (formData.banner) {
        formDataToSend.append("banner", formData.banner);
      }

      try {
        const response = await updateBanner(formDataToSend, formData.id);

        if (response.status) {
          alert("Banner updated successfully.");
          navigate("/banners");
        } else {
          alert(`Error updating banner: ${response.message.banner}`);
          console.error("Error updating banner:", response.message.banner);
        }
      } catch (error) {
        alert("An error occurred while updating the banner. Please try again.");
        console.error("Error updating banner:", error);
      }
    } else {
      console.log("Banner update canceled by the user.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Banner
        </Typography>
        <form onSubmit={handleSubmit}>
          {selectedImagePreview && (
            <div>
              <Typography variant="subtitle1">Banner Preview:</Typography>
              <img
                src={selectedImagePreview}
                alt="Banner Preview"
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
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default EditBanners;
