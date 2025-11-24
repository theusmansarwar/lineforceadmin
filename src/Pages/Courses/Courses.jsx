import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { CircularProgress, Container, ThemeProvider } from "@mui/material";
import useDarkTheme from "../../Theme/useDarkTheme";
import { fileUrl } from "../../Config/Config";
import { fetchCourses } from "../../DAL/fetch";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCourses } from "../../DAL/delete";
import { useNavigate } from "react-router-dom";
import { htmlDecode } from "../../Utils/FormateText";

const Courses = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {
    try {
      const response = await fetchCourses();
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleDelete = async (id) => {
    // Confirm before proceeding with deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (confirmDelete) {
      try {
        const response = await deleteCourses(id);
        if (response.status === true) {
          getCourses(); // Refresh the courses list after successful deletion
          alert("Course deleted successfully."); // Success alert
        } else {
          alert("Failed to delete course."); // Failure alert if deletion fails
        }
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("An error occurred while deleting the course."); // Error alert
      }
    } else {
      console.log("Course deletion canceled by the user.");
    }
  };

  const { theme } = useDarkTheme();

  return (
    <ThemeProvider theme={theme}>
      
      <div className="buttonsection">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/add-course")}
          sx={{
            fontSize: "0.6rem",
            "@media (max-width: 600px)": {
              padding: "5px 10px",
            },
          }}
        >
          + Add Course
        </Button>
      </div>

      <Grid container spacing={3}>
        {loading ? (
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
     
        ) : data.length > 0 ? (
          data.map((course) => (
            <Grid item xs={12} sm={6} md={3} key={course.id}>
              <Card className="h-100">
                <CardMedia
                  sx={{ height: 120 }}
                  image={`${fileUrl}/${course.thumbnail}`} // Ensure the image URL is correct
                  title={course.title}
                  onClick={() => {
                    navigate(`/syllabus/${course.id}`);
                  }}
                />

                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {htmlDecode(course.title).substring(0, 50) + "..."}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {htmlDecode(course.description).substring(0, 30) + "..."}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Price:</b> PKR {course.price}{" "}
                    {course.is_paid === 0 && "(Free)"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => {
                      navigate(`/course-edit`, { state: { course } });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    sx={{ color: "red" }}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </Button>
                  <Chip
                    label={course.is_paid === 0 ? "Free" : "Paid"}
                    sx={{
                      backgroundColor: course.is_paid === 0 ? "gray" : "green",
                      color: "white",
                    }}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" component="div">
            No courses available
          </Typography>
        )}
      </Grid>
    </ThemeProvider>
  );
};

export default Courses;
