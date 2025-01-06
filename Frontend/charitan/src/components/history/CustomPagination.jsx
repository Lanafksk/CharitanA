import React, { useState } from "react";
import { Pagination } from "@mui/material";

const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return ( 
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      sx={{
        display: "flex",
        justifyContent: "center",
        "& .MuiPaginationItem-root": {
          border: "1px solid #000",
          borderRadius: "10%", 
          width: "25px", 
          height: "30px",
          margin: "0 5px", 
          fontWeight: "bold",
          color: "#000",
          margin: "20px"
        },
        "& .Mui-selected": {
          backgroundColor: "#fb1465", // selected button color
          color: "#fff", // selected button text color
          border: "none", // remove selected button border
        },
        "& .MuiPaginationItem-previousNext": {
          border: "none", // error border remove
        },
      }}
    />
  );
};

export default CustomPagination;
