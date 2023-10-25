import * as React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  TextField,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";
import { visuallyHidden } from "@mui/utils";
import { HeaderTelehuertos } from "../HeaderTelehuertos";

const headCells = [
  // { id: "idPost", label: "id" },
  { id: "Titulo", label: "Titulo" },
  { id: "Categoria", label: "Categoria" },
  { id: "Button", label: "" },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Recursos
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function List() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [rows, setDataFetch] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        const response = await fetch(
          `${window.env.REACT_APP_BASE_URL}/post/1`,
          {
            headers: {
              "X-API-KEY": "YXBpa2V5X21zcHNfdHJhbWl0ZXM=",
            },
          },
        );
        console.log("Response:", response);
        if (response.ok) {
          const dataJson = await response.json();
          console.log("Data:", dataJson);
          setDataFetch(dataJson); // Update the state with fetched data
          setIsLoading(false);
        } else {
          console.error("Error fetching item details:", response.statusText);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  React.useEffect(() => {
    if (selected.length > 0) {
      const initialSelected = [];
      setSelected(initialSelected);

      navigate(`/details/${selected[0]}`); // Replace '/details/' with your desired route

      // alert(`/details/${selected[0]}`);
    }
  }, [selected, navigate]);

  React.useEffect(() => {
    const initialSelected = [];
    setSelected(initialSelected);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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

  const handleClick = (event, id) => {
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
        selected.slice(selectedIndex + 1),
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const [searchTerm, setSearchTerm] = React.useState("");

  // Stable sort function
  function stableSort(array, compareFn) {
    // Create a copy of the array
    const sortedArray = [...array];

    // Sort the array using a stable sorting algorithm
    sortedArray.sort((a, b) => compareFn(a, b));

    return sortedArray;
  }

  // Get comparator function
  function getComparator(order, orderBy) {
    const compareFn = (a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return -1;
      }
      if (a[orderBy] > b[orderBy]) {
        return 1;
      }
      return 0;
    };

    // If the order is descending, reverse the comparator function
    if (order === "desc") {
      return (a, b) => compareFn(b, a);
    } else {
      return compareFn;
    }
  }

  // Visible rows state variable
  const [visibleRows, setVisibleRows] = React.useState([]);

  // UseMemo to calculate the visible rows
  React.useMemo(() => {
    const filteredRows = rows.filter((row) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        row.Titulo.toLowerCase().includes(searchTermLowerCase) ||
        row.Categoria.toLowerCase().includes(searchTermLowerCase)
        // || row.idPost.toString().toLowerCase().includes(searchTermLowerCase)
      );
    });

    // Stable sort the filtered rows
    const sortedRows = stableSort(filteredRows, getComparator(order, orderBy));

    // Slice the sorted rows to get the visible rows
    const visibleRows = sortedRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

    // Set the visible rows state variable
    setVisibleRows(visibleRows);
  }, [order, orderBy, page, rows, rowsPerPage, searchTerm]);

  function handleSearch(event) {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#e7f4e7",
          padding: "50px", // Add this line to fill in the white space with the background color
        }}
      >
        <Box
          sx={{
            width: "69%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            backgroundColor: "#f0f7f0",
          }}
        >
          {/* Rest of your component code */}
          <EnhancedTableToolbar numSelected={selected.length} />
          <TextField
            type="text"
            placeholder="Buscar"
            onKeyUp={handleSearch}
            color="success"
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.idPost);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      onClick={(event) => handleClick(event, row.idPost)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.idPost}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "rgb(0,141,0,2000.5)",
                        },
                      }}
                    >
                      <TableCell padding="checkbox"></TableCell>
                      {/* <TableCell align="left">{row.idPost}</TableCell> */}
                      <TableCell align="left">{row.Titulo}</TableCell>
                      <TableCell align="left">{row.Categoria}</TableCell>
                      <TableCell align="left">
                        <Button
                          style={{
                            backgroundColor: "#ffc107",
                            color: "#000000",
                            borderRadius: "5px",
                            padding: "5px",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                            "&:hover": {
                              backgroundColor: "#00b300",
                            },
                          }}
                        >
                          Ver Detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <FormControlLabel
            sx={{
              "&.active": {
                backgroundColor: "green",
              },
              color: dense ? "green" : "red",
            }}
            control={
              <Switch
                checked={dense}
                onChange={handleChangeDense}
                color="success"
              />
            }
            label="Lista condensada"
          />

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </>
  );
}
