import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
  TextField,
  ThemeProvider,
  Container,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useDarkTheme from "../Theme/useDarkTheme";
import { fetchUsers, fetchPayments } from "../DAL/fetch";
import { formatDate } from "../Utils/Formatedate";
import { useNavigate } from "react-router-dom";
import { deletePayments, deleteUsers } from "../DAL/delete";

export function useTable({ headCells, title }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
    const [isLoading, setIsLoading]=useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState("");
useEffect(() => {
  const delayDebounce = setTimeout(() => {
    setDebouncedSearch(searchTerm); // update debounced value
  }, 500); // 500ms debounce

  return () => clearTimeout(delayDebounce);
}, [searchTerm]);

 const fetchData = async () => {
  setIsLoading(true);
      try {
        let response;
        if (title === "Users") {
          response = await fetchUsers(page + 1, rowsPerPage, debouncedSearch);
          setIsLoading(false);
        } else if (title === "Payments") {
          response = await fetchPayments(page + 1, rowsPerPage, debouncedSearch);
          setIsLoading(false);
        }

        if (response && response.data) {
          setData(response.data.data || response.data);
          setTotalRecords(response.data.total || response.data.length);
        }
      } catch (error) {
        setIsLoading(false);
        console.error(`Failed to fetch ${title}:`, error);
      }
    };
  useEffect(() => {
   

    fetchData();
  }, [title, page, rowsPerPage, debouncedSearch]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const { theme } = useDarkTheme();
const handleDelete = async () => {
  if (selected.length === 0) return;

  try {
    let response;

    if (title === "Users") {
      response = await deleteUsers({ ids: selected });
    } else if (title === "Payments") {
      response = await deletePayments(selected);
    }
if(response.status){

  fetchData();
}

    
    setSelected([]);

  } catch (error) {
    console.error(`Failed to delete ${title}:`, error);
  }
};

  const renderRow = (row) => {
    return headCells.map((headCell) => {
      if (headCell.id === "status") {
        let statusText = "";
        let color = "";

        switch (row[headCell.id]) {
          case 0:
            statusText = "New";
            color = "blue";
            break;
          case 1:
            statusText = "Accepted";
            color = "green";
            break;
          case 2:
            statusText = "Pending";
            color = "orange";
            break;
          case 3:
            statusText = "Rejected";
            color = "red";
            break;
          default:
            statusText = "Unknown";
            color = "gray";
        }

        return (
          <TableCell
            key={headCell.id}
            align="left"
            style={{
              color: color,
              fontWeight: "bold",
            }}
          >
            {statusText}
          </TableCell>
        );
      }

      if (headCell.id === "action") {
        return (
          <TableCell
            key={headCell.id}
            align="left"
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate(`/payment/${row.id}`)}
          >
            View
          </TableCell>
        );
      }

      return (
        <TableCell key={headCell.id} align={headCell.numeric ? "right" : "left"}>
          {headCell.id === "created_at"
            ? formatDate(row[headCell.id])
            : row[headCell.id] || row[headCell.id.split(".")[0]]?.[headCell.id.split(".")[1]] || ""}
        </TableCell>
      );
    });
  };

  const tableUI = (
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
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", maxHeight: "95vh" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {selected.length > 0 ? (
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon onClick={()=>{handleDelete()}} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Typography variant="h6" id="tableTitle" component="div">
                  {title}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="Search by name"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ marginLeft: 2 }}
              />
            </Box>
          </Toolbar>

          <TableContainer sx={{ maxHeight: "77vh", scrollbarWidth: "none" }}>
            <Table stickyHeader aria-labelledby="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selected.length > 0 && selected.length < data.length
                      }
                      checked={
                        data.length > 0 && selected.length === data.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? "right" : "left"}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        padding="checkbox"
                        onClick={() => handleClick(row.id)}
                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      {renderRow(row)}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalRecords}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
            )}
    </ThemeProvider>
  );

  return {
    tableUI,
  };
}
