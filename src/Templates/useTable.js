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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useDarkTheme from "../Theme/useDarkTheme";
import { fetchUsers, fetchPayments } from "../DAL/fetch";
import { formatDate } from "../Utils/Formatedate";
import {  useNavigate } from "react-router-dom";

export function useTable({ headCells, title }) {
  
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (title === "Users") {
          response = await fetchUsers(page + 1, rowsPerPage, searchTerm);
        } else if (title === "Payments") {
          response = await fetchPayments(page + 1, rowsPerPage, searchTerm);
        }

        if (response && response.data) {
          setData(response.data.data || response.data);
          setTotalRecords(response.data.total || response.data.length);
        }
      } catch (error) {
        console.error(`Failed to fetch ${title}:`, error);
      }
    };

    fetchData();
  }, [title, page, rowsPerPage, searchTerm]);

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

  const renderRow = (row) => {
    return headCells.map((headCell) => {
      if (headCell.id === "status") {
        return (
          <TableCell
            key={headCell.id}
            align="left"
            style={{
              color: row[headCell.id] === 0 ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            {row[headCell.id] === 0 ? "Pending" : "Accepted"}
          </TableCell>
        );
      }
      if (headCell.id === "action") {
        return (
          <TableCell key={headCell.id} align="left" style={{ cursor:'pointer' , textDecoration:'underline' }} onClick={()=>{navigate(`/payment/${row.id}`)}}>
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
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", maxHeight: "95vh" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {selected.length > 0 ? (
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon />
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
    </ThemeProvider>
  );

  return {
    tableUI,
  };
}
