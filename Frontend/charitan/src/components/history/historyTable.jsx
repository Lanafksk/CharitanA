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
import SearchIcon from "@mui/icons-material/Search"; // Material-UI Search Icon
import CustomPagination from "./CustomPagination";

const HistoryTable = ({rows}) => {

  const [page, setPage] = useState(1); 
  const rowsPerPage = 5; 
  const [searchTerm, setSearchTerm] = useState("");

  // Filter rows based on search term
  const filteredRows = rows.filter(
    (row) =>
      row.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        placeholder="Search the ProjectID, Username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          height: "48px", 
          "& .MuiOutlinedInput-root": {
            height: "100%", 
            borderRadius: "0px 8px 8px 0px", 
          },
          "& fieldset": {
            borderLeft: "none", // remove border left
          },
          "& input": {
            padding: "12px 14px", // padding for input text
          },
        }}
      />
    </Box>
      <TableContainer component={Paper} sx={{ boxShadow: "none", border: "none", backgroundColor: "#f5f5f5" }}>
        <Table sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow sx={{ borderBottom: "2px solid #000" }}>
            <TableCell sx={{ ...headerCellStyle, width: "15%" }}>DONATION ID</TableCell>
            <TableCell sx={{ ...headerCellStyle, width: "15%" }}>RECEIVER ID</TableCell>
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
                  "& td, & th": { border: 0 }, // no border line
                }}
              >
                <TableCell sx={bodyCellStyle}>{row.id}</TableCell>
                <TableCell sx={bodyCellStyle}>{row.receiver}</TableCell>
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
        sx={{marginTop:"50px"}}
      />
    </Box>
  );
};

export default HistoryTable;
