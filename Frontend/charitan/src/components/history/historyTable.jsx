import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Box,
  IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomPagination from "./CustomPagination";

// Define column configurations for different user types
const COLUMN_CONFIGS = {
  donor: {
    secondColumn: "RECEIVER ID",
    searchPlaceholder: "Search by ProjectID, Receiver..."
  },
  charity: {
    secondColumn: "DONOR ID",
    searchPlaceholder: "Search by ProjectID, Donor..."
  }
};

const HistoryTable = ({ rows, userType }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");

  // Get the correct column configuration based on user type
  const columnConfig = COLUMN_CONFIGS[userType.toLowerCase()] || COLUMN_CONFIGS.donor;

  // Update filter logic to handle both donor and receiver/charity searches
  const filteredRows = rows.filter(
    (row) =>
      row.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // Use dynamic property name based on user type
      (userType.toLowerCase() === 'donor' 
        ? row.receiver?.toLowerCase().includes(searchTerm.toLowerCase())
        : row.donor?.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      row.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (page - 1) * rowsPerPage;
  const currentData = filteredRows.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const headerCellStyle = {
    fontWeight: "bold",
    paddingBottom: "30px",
  };

  const bodyCellStyle = {
    paddingY: "20px",
  };

  return (
    <Box sx={{ paddingY: "50px", paddingX: "150px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        <IconButton
          sx={{
            backgroundColor: "#fb1465",
            color: "#fff",
            borderRadius: "8px 0px 0px 8px",
            width: "48px",
            height: "48px",
            "&:hover": {
              backgroundColor: "#ff3358",
            },
          }}
        >
          <SearchIcon />
        </IconButton>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={columnConfig.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            height: "48px",
            "& .MuiOutlinedInput-root": {
              height: "100%",
              borderRadius: "0px 8px 8px 0px",
            },
            "& fieldset": {
              borderLeft: "none",
            },
            "& input": {
              padding: "12px 14px",
            },
          }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: "none", border: "none", backgroundColor: "#f5f5f5" }}>
        <Table sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow sx={{ borderBottom: "2px solid #000" }}>
              <TableCell sx={{ ...headerCellStyle, width: "15%" }}>DONATION ID</TableCell>
              <TableCell sx={{ ...headerCellStyle, width: "15%" }}>{columnConfig.secondColumn}</TableCell>
              <TableCell sx={{ ...headerCellStyle, width: "15%" }}>PROJECT ID</TableCell>
              <TableCell sx={{ ...headerCellStyle, width: "10%" }}>AMOUNT</TableCell>
              <TableCell sx={{ ...headerCellStyle, width: "15%" }}>DATE</TableCell>
              <TableCell sx={{ ...headerCellStyle, width: "10%" }}>STATUS</TableCell>
              <TableCell sx={{ ...headerCellStyle, width: "20%" }}>MESSAGE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "& td, & th": { border: 0 },
                }}
              >
                <TableCell sx={bodyCellStyle}>{row.id}</TableCell>
                <TableCell sx={bodyCellStyle}>
                  {userType.toLowerCase() === 'donor' ? row.receiver : row.donor}
                </TableCell>
                <TableCell sx={bodyCellStyle}>{row.project}</TableCell>
                <TableCell sx={bodyCellStyle}>{row.amount}</TableCell>
                <TableCell sx={bodyCellStyle}>{row.date}</TableCell>
                <TableCell sx={bodyCellStyle} style={{ color: row.status === "Success" ? "green" : "red" }}>
                  {row.status}
                </TableCell>
                <TableCell sx={bodyCellStyle}>{row.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        totalPages={Math.ceil(filteredRows.length / rowsPerPage)}
        currentPage={page}
        onPageChange={handlePageChange}
        sx={{ marginTop: "50px" }}
      />
    </Box>
  );
};

export default HistoryTable;