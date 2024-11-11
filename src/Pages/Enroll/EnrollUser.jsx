import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Container, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import useDarkTheme from "../../Theme/useDarkTheme";// Assume these are API functions you created
import { fetchPaidCourses } from "../../DAL/fetch";
import { enrollUser } from "../../DAL/create";
import { useNavigate } from "react-router-dom";

const EnrollUser = () => {
    const navigate = useNavigate();
  const { theme } = useDarkTheme();
  const [email, setEmail] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [dropdownList, setDropdownList] = useState([]);

  // Fetch dropdown options from API
  useEffect(() => {
    const getDropdownList = async () => {
      try {
        const response = await fetchPaidCourses(); 
        setDropdownList(response.data); 
      } catch (error) {
        console.error("Error fetching dropdown list:", error);
      }
    };
    getDropdownList();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email,
      selectedItem
    };
    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("course_id", formData.selectedItem);
    try {
      const response = await enrollUser(formDataToSend);
      if (response.status===true) {
        console.log("User enrolled successfully!");
        alert(response.message)
        navigate('/dashboard')
      } else if(response.status===false) {
        if (response.message?.email) {
            alert(response.message.email[0]);
          } else if (response.message) {
            alert(response.message);
          } else {
          }

      } 
    } catch (error) {
        alert("Enrollment failed. Please try again.");
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
          Enroll User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            className="text-field"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="dropdown-label">Select Item</InputLabel>
            <Select
              labelId="dropdown-label"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              label="Select Item"
            >
              {dropdownList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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

export default EnrollUser;
