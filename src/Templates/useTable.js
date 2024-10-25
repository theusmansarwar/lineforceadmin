import React, { useState, useMemo } from 'react';
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
    TableSortLabel,
    Toolbar,
    Typography,
    Checkbox,
    IconButton,
    Tooltip,
    TextField,
    ThemeProvider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import useDarkTheme from '../Theme/useDarkTheme';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function useTable({ rows, headCells, title }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    const handleRequestSort = ( property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = ( id) => {
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

    const handleChangePage = ( newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const filteredRows = useMemo(() => {
        return rows.filter((row) =>
            row.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, rows]);

    const visibleRows = useMemo(
        () =>
            [...filteredRows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, filteredRows]
    );

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const { theme } = useDarkTheme();
    
    const tableUI = (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%'}}>
                <Paper sx={{ width: '100%',maxHeight: '95vh' }}>
                    <Toolbar
                        sx={{
                            pl: { sm: 2 },
                            pr: { xs: 1, sm: 1 },
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {selected.length > 0 ? (
                                <Tooltip title="Delete">
                                    <IconButton>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Typography
                                    sx={{ flex: '1 1 100%' }}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    {title}
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip title="Filter list">
                                <IconButton>
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
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

                    <TableContainer    sx={{
                            '&::-webkit-scrollbar': {
                                display: 'none', // For Chrome, Safari, and Opera
                            },
                            '&::-moz-scrollbar': {
                                display: 'none', // For Firefox
                            },
                            maxHeight: '77vh',
    
                           
                        }}>
                        <Table  stickyHeader sx={{ minWidth: 750, scrollbarWidth:'none'  }} aria-labelledby="sticky table" >
                            <TableHead sx={{backgroundColor: "#004ab8" }}>
                                <TableRow sx={{backgroundColor: "#004ab8" }}>
                                    <TableCell padding="checkbox" >
                                        <Checkbox
                                            color="primary"
                                            indeterminate={selected.length > 0 && selected.length < rows.length}
                                            checked={rows.length > 0 && selected.length === rows.length}
                                            onChange={handleSelectAllClick}
                                        />
                                    </TableCell>
                                    {headCells.map((headCell) => (
                                        <TableCell 
                                            key={headCell.id}
                                            align={headCell.numeric ? 'right' : 'left'}
                                        //  padding="none"
                                            sortDirection={orderBy === headCell.id ? order : false}
                                        >
                                            <TableSortLabel
                                                active={orderBy === headCell.id}
                                                direction={orderBy === headCell.id ? order : 'asc'}
                                                onClick={(event) => handleRequestSort(event, headCell.id)}
                                            >
                                                {headCell.label}
                                                {orderBy === headCell.id ? (
                                                    <Box component="span" sx={visuallyHidden}>
                                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                    </Box>
                                                ) : null}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                    <TableCell align="right">Actions</TableCell> {/* Actions Column */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            
                                            selected={isItemSelected}
                                           
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            {/* Dynamically generate table cells based on headCells */}
                                            {headCells.map((headCell) => (
                                                <TableCell  key={headCell.id} align={headCell.numeric ? 'right' : 'left'}   >
                                                    {row[headCell.id]} {/* Access the corresponding row data by key */}
                                                </TableCell>
                                            ))}
                                            <TableCell align="right">
                                                <IconButton aria-label="edit">
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
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
