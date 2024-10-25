import React, { useState } from 'react';
import { Button, TextField, FormControlLabel, Switch, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useDarkTheme from '../../Theme/useDarkTheme';
import { ThemeProvider } from '@mui/material';
import { createCourses } from '../../DAL/create';

const CreateCourse = () => {
  const navigate = useNavigate();
  const { theme } = useDarkTheme();

  const [formData, setFormData] = useState({
    title: '',
    thumbnail: null, 
    price: '',
    description: '',
    is_paid: false,
  });
  console.log("FORM DATA: ", formData)

  const [selectedImagePreview, setSelectedImagePreview] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (name === 'thumbnail') {
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
        [name]: type === 'checkbox' ? checked : value, 
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const confirmSubmit = window.confirm("Are you sure you want to submit the course?");
    
    if (confirmSubmit) {
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('thumbnail', formData.thumbnail); 
        formDataToSend.append('price', formData.price);     
        formDataToSend.append('description', formData.description);
        formDataToSend.append('is_paid', formData.is_paid ? 1 : 0);

        console.log('Form Data:', ...formDataToSend);
        try {
            const response = await createCourses(formDataToSend);
            if (response.status) { 
              alert("Course Submit Sucessfully!")
                navigate('/courses'); 
            } else {
                alert('Error creating course: ' + response.message);
                console.error('Error creating course:', response.message);
            }
        } catch (error) {
            alert('An error occurred while creating the course. Please try again.');
            console.error('Error creating course:', error);
        }
    } else {
        console.log("Course submission canceled by the user.");
    }
};


  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Add Course
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

          {/* Image Preview */}
          {selectedImagePreview && (
            <div>
              <Typography variant="subtitle1">New Thumbnail Preview:</Typography>
              <img
                src={selectedImagePreview}
                alt="New Thumbnail Preview"
                style={{ width: '20%', height: 'auto', marginBottom: '16px' }}
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            name="thumbnail"
            onChange={handleChange}
            style={{ margin: '20px 0' }}
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth
          >
            Submit
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default CreateCourse;
