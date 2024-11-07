import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import useDarkTheme from "../../Theme/useDarkTheme";
import { ThemeProvider } from "@mui/material";
import { updateCourses } from "../../DAL/edit";
import { fileUrl } from "../../Config/Config";

const CourseForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useDarkTheme();
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: null,
    price: "",
    description: "",
    is_paid: false,
    id: "",
  });

  const [selectedImagePreview, setSelectedImagePreview] = useState(null);

  useEffect(() => {
    if (location.state && location.state.course) {
      const { title, thumbnail, price, description, is_paid, id } =
        location.state.course;

      setFormData({
        title: title || "",
        price: price || "",
        description: description || "",
        is_paid: is_paid || false,
        id: id || "",
      });

      if (thumbnail) {
        setSelectedImagePreview(`${fileUrl}/${thumbnail}`);
      }
    }
  }, [location.state]);

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (name === "thumbnail") {
      if (files.length > 0) {
        const file = files[0];
        setFormData((prevData) => ({
          ...prevData,
          thumbnail: file,
        }));
        setSelectedImagePreview(URL.createObjectURL(file));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          thumbnail: null,
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
      "Are you sure you want to update the course?"
    );

    if (confirmSubmit) {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("is_paid", formData.is_paid ? "1" : "0");
      formDataToSend.append("_method", "PUT");

      if (formData.thumbnail) {
        formDataToSend.append("thumbnail", formData.thumbnail);
      }

      try {
        const response = await updateCourses(formDataToSend, formData.id);

        if (response.status) {
          alert("Course updated successfully.");
          navigate("/courses"); // Redirect on success
        } else {
          alert("Error updating course: " + response.message); // Show server error
          console.error("Error updating course:", response.message);
        }
      } catch (error) {
        alert("An error occurred while updating the course. Please try again."); // Network or unexpected error
        console.error("Error updating course:", error);
      }
    } else {
      console.log("Course update canceled by the user.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Course
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.is_paid}
                onChange={handleChange}
                name="is_paid"
                color="primary"
              />
            }
            label="Is Paid"
          />
          {selectedImagePreview && (
            <div>
              <Typography variant="subtitle1">Thumbnail Preview:</Typography>
              <img
                src={selectedImagePreview}
                alt="Thumbnail Preview"
                style={{ width: "20%", height: "auto", marginBottom: "16px" }}
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            name="thumbnail"
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

export default CourseForm;
