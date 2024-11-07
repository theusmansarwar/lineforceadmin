import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button, ThemeProvider, TablePagination } from "@mui/material";
import useDarkTheme from "../../Theme/useDarkTheme";
import { fetchSyllabus } from "../../DAL/fetch";
import { useNavigate, useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteSyllabus } from "../../DAL/delete";
import { fileUrl } from "../../Config/Config";

const Syllabus = () => {
  const navigate = useNavigate();
  const { theme } = useDarkTheme();
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);

  const getSyllabus = async (currentPage, rowsPerPage) => {
    try {
      const response = await fetchSyllabus(id, currentPage + 1, rowsPerPage); // Ensure page starts from 1
      setData(response.data.data);
      setTotalRecords(response.data.total);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSyllabus(page, rowsPerPage);
  }, [id, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDelete = async (id) => {
    // Confirm before proceeding with deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Syllabus?"
    );

    if (confirmDelete) {
      try {
        const response = await deleteSyllabus(id);
        if (response.status === true) {
          getSyllabus(page, rowsPerPage); // Refresh the courses list after successful deletion
          alert("Syllabus deleted successfully."); // Success alert
        } else {
          alert("Failed to delete Syllabus."); // Failure alert if deletion fails
        }
      } catch (error) {
        console.error("Error deleting Syllabus:", error);
        alert("An error occurred while deleting the Syllabus."); // Error alert
      }
    } else {
      console.log("Syllabus deletion canceled by the user.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ padding: 2, width: "100%", marginBottom: "10px" }}>
        Loading...
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="buttonsection">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/add-syllabus/${id}`)}
          sx={{
            fontSize: "0.6rem",
            "@media (max-width: 600px)": { padding: "5px 10px" },
          }}
        >
          + Add Syllabus
        </Button>
      </div>
      <Box sx={{ width: "100%", marginBottom: "10px" }}>
        <List>
          {data.map((syllabus) => (
            <ListItem
              key={syllabus.id}
              sx={{
                bgcolor: "background.paper",
                boxShadow: "0 0px 8px #0d6dfdab",
                margin: "1%",
                borderRadius: "8px",
                width: "98%",
                "@media (max-width: 800px)": {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  margin: "3%",
                  width: "94%",
                },
              }}
            >
              <ListItemText
                primary={syllabus.name}
                secondary={`Created on: ${new Date(
                  syllabus.created_at
                ).toLocaleDateString()}`}
                sx={{
                  width: "85%",
                  fontSize: "1rem",
                  "@media (max-width: 800px)": {
                    fontSize: "0.8rem",
                    width: "100%",
                  },
                }}
              />
              <ListItemText
                sx={{
                  width: "15%",
                  textAlign: "center",
                  "@media (max-width: 800px)": {
                    fontSize: "0.8rem",
                    width: "100%",
                  },
                }}
              >
                <Button
                  size="small"
                  onClick={() =>
                    window.open(
                      `${fileUrl}/${syllabus.file}`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  sx={{
                    minWidth: "auto",
                    padding: "5px",
                    "@media (max-width: 800px)": { padding: "3px" },
                  }}
                >
                  <VisibilityIcon fontSize="small" />
                </Button>
                <Button
                  size="small"
                  sx={{
                    color: "green",
                    minWidth: "auto",
                    padding: "5px",
                    "@media (max-width: 800px)": {
                      padding: "3px",
                      paddingLeft: "20%",
                    },
                  }}
                  onClick={() =>
                    navigate(`/syllabus-edit`, { state: { syllabus } })
                  }
                >
                  <EditIcon fontSize="small" />
                </Button>
                <Button
                  size="small"
                  sx={{
                    color: "red",
                    minWidth: "auto",
                    padding: "5px",
                    "@media (max-width: 800px)": {
                      padding: "3px",
                      paddingLeft: "20%",
                    },
                  }}
                  onClick={() => handleDelete(syllabus.id)}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Syllabus;
