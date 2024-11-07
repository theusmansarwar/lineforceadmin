import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material";
import useDarkTheme from "../../Theme/useDarkTheme";
import { fileUrl } from "../../Config/Config";
import { fetchBanners } from "../../DAL/fetch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBanner } from "../../DAL/delete";
import { useNavigate } from "react-router-dom";

const Banners = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBanner = async () => {
    try {
      const response = await fetchBanners();
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Banners:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Banner?"
    );

    if (confirmDelete) {
      try {
        const response = await deleteBanner(id);
        if (response.status === true) {
          getBanner();
          alert("Banner deleted successfully.");
        } else {
          alert("Failed to delete Banner.");
        }
      } catch (error) {
        console.error("Error deleting Banner:", error);
        alert("An error occurred while deleting the Banner.");
      }
    } else {
      console.log("Banner deletion canceled by the user.");
    }
  };

  const { theme } = useDarkTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className="buttonsection">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/add-banner")}
          sx={{
            fontSize: "0.6rem",
            "@media (max-width: 600px)": {
              padding: "5px 10px",
            },
          }}
        >
          + Add Banner
        </Button>
      </div>

      <Grid container spacing={3}>
        {loading ? (
          <Typography variant="h6" component="div" padding={"20px"}>
            Loading Banner...
          </Typography>
        ) : data.length > 0 ? (
          data.map((Banner) => (
            <Grid item xs={12} sm={6} md={3} key={Banner.id}>
              <Card className="h-100">
                <CardMedia
                  sx={{ height: 120 }}
                  image={`${fileUrl}/${Banner.banner}`}
                  onClick={() => {
                    navigate(`/banner/${Banner.id}`);
                  }}
                />
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => {
                      navigate(`/banner-edit`, { state: { Banner } });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    sx={{ color: "red" }}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(Banner.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" component="div">
            No Banners available
          </Typography>
        )}
      </Grid>
    </ThemeProvider>
  );
};

export default Banners;
