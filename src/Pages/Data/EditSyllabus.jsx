import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Container, CircularProgress } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import useDarkTheme from "../../Theme/useDarkTheme";
import { ThemeProvider } from "@mui/material";
import { updateSyllabus } from "../../DAL/edit";
import { fileUrl } from "../../Config/Config";

const EditSyllabus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useDarkTheme();

  const [formData, setFormData] = useState({
    name: "",
    file: null,
    course_id: "",
    id: "",
  });
  const [isLoading, setIsLoading]=useState(false);

  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState(""); // State to store the file type

  useEffect(() => {
    if (location.state && location.state.syllabus) {
      const { name, file, course_id, id } = location.state.syllabus;

      setFormData({
        name: name || "",
        id: id,
        course_id: course_id || "",
      });

      if (file) {
        const fileURL = `${fileUrl}/${file}`;
        setFilePreview(fileURL);
        setFileType(file.split(".").pop().toLowerCase()); // Extract file type from file extension
      }
    }
  }, [location.state]);

  // Handle changes to the input fields
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
        setFileType(file.name.split(".").pop().toLowerCase()); // Extract file type from file name
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

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
setIsLoading(true)
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("course_id", formData.course_id);
    formDataToSend.append("_method", "PUT");
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    try {
      const response = await updateSyllabus(formDataToSend, formData.id);
      if (response.status) {
        setIsLoading(false)
        navigate(`/syllabus/${formData.course_id}`);
      } else {
        setIsLoading(false)
        console.error("Error updating syllabus:", response.message);
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Error updating syllabus:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
       {isLoading ? (
                <Container className="container" sx={{
                  height:"100vh",
                  width:"100%",
                  display:"flex",
                  alignItems:'center',
                  justifyContent:"center",
                  backgroundColor:'#03030393'
                }}>
             <CircularProgress size="100px" />
             </Container>
            ) : (
      <Container className="container" maxWidth="sm">
        <Typography
          className="form-name"
          variant="h4"
          component="h1"
          gutterBottom
        >
          Edit Syllabus
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
            accept="image/*, application/pdf"
            name="file"
            onChange={handleChange}
            className="file-input"
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
              ) : (
                <img
                  src={filePreview}
                  alt="File Preview"
                  style={{ width: "100%", height: "auto", marginTop: "8px" }}
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
            )}
    </ThemeProvider>
  );
};

export default EditSyllabus;
