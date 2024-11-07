import React, { useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useDarkTheme from "../../Theme/useDarkTheme";
import { ThemeProvider } from "@mui/material";
import { createSyllabus } from "../../DAL/create";

const CreateSyllabus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useDarkTheme();

  const [formData, setFormData] = useState({
    name: "",
    file: null,
  });

  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState(""); // To store the file type

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "file") {
      if (files.length > 0) {
        const file = files[0];
        setFormData((prevData) => ({
          ...prevData,
          file: file,
        }));

        const fileUrl = URL.createObjectURL(file);
        setFilePreview(fileUrl);
        setFileType(file.name.split(".").pop().toLowerCase()); // Extract file type
      } else {
        setFormData((prevData) => ({
          ...prevData,
          file: null,
        }));
        setFilePreview(null); // Reset preview if no file is selected
        setFileType("");
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("file", formData.file);
    formDataToSend.append("course_id", id);

    try {
      const response = await createSyllabus(formDataToSend);
      if (response.status) {
        navigate(`/syllabus/${id}`);
      } else {
        console.error("Error creating Syllabus:", response.message);
      }
    } catch (error) {
      console.error("Error creating Syllabus:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="container" maxWidth="sm">
        <Typography
          className="form-name"
          variant="h4"
          component="h1"
          gutterBottom
        >
          Add Syllabus
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            className="text-field"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <input
            type="file"
            accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            name="file"
            onChange={handleChange}
            className="file-input"
            required
            fullWidth
            style={{ margin: "20px 0" }}
          />
          {filePreview && (
            <div style={{ marginBottom: "16px" }}>
              <Typography variant="subtitle1">File Preview:</Typography>
              {fileType === "pdf" ? (
                <iframe
                  src={filePreview}
                  title="File Preview"
                  style={{ width: "100%", height: "400px", marginTop: "8px" }}
                />
              ) : fileType === "doc" || fileType === "docx" ? (
                <Typography variant="body1" style={{ marginTop: "8px" }}>
                  {formData.file?.name}
                </Typography>
              ) : (
                <img
                  src={filePreview}
                  alt="File Preview"
                  style={{ width: "20%", height: "auto", marginTop: "8px" }}
                />
              )}
            </div>
          )}
          <Button
            className="submit-button"
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default CreateSyllabus;
