import React from "react";
import { Box, Typography, Button } from "@mui/material";

const DonationHeader = ({ title, company, category }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      {/* Project Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>

      {/* Company Name */}
      <Typography
        variant="h6"
        sx={{
          color: "#666",
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        {company}
      </Typography>

      {/* Category */}
      <Button
        variant="outlined"
        sx={{
          color: "#FB1465",
          borderColor: "#FB1465",
          borderRadius: "20px",
          padding: "5px 15px",
          fontSize: "14px",
          textTransform: "capitalize",
          backgroundColor: "#fff",
          pointerEvents: "none",
        }}
      >
        {category}
      </Button>
    </Box>
  );
};

export default DonationHeader;
