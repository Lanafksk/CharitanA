import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/PersonOutline"; // User Icon
import BusinessIcon from "@mui/icons-material/Business"; // Building Icon

const RoleSelector = ({ selectedRole, onSelectRole }) => {

  return (
    <Box sx={{mb:1}}>

      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Box gap="1px" alignItems={"center"} display="flex" flexDirection="column" onClick={() => onSelectRole("Donor")}
            sx={{
              height: "80%",
              justifyContent: "center",
              padding: "16px",
              borderRadius: 3,
              cursor: "pointer",
              boxShadow: selectedRole === "Donor" ? 4 : 1, // dynamic shadow
              border: `2px solid ${selectedRole === "Donor" ? "#e91e63" : "transparent"}`,
              "&:hover": {
                borderColor: "#e91e63",
              },
            }}>
            <PersonIcon sx={{ fontSize: 50, color: "#e91e63", display: "block", }} />
            <Typography
                fontWeight="bold"
                fontSize="20px"
                color={selectedRole === "Donor" ? "#e91e63" : "black"}
              >
                Donor
              </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box gap="1px" alignItems={"center"} display="flex" flexDirection="column" onClick={() => onSelectRole("Charity")}
          sx={{
            height: "80%",
            justifyContent: "center",
            padding: "16px",
            borderRadius: 3,
            cursor: "pointer",
            boxShadow: selectedRole === "Charity" ? 4 : 1, // dynamic shadow
            border: `2px solid ${selectedRole === "Charity" ? "#e91e63" : "transparent"}`,
            "&:hover": {
              borderColor: "#e91e63",
            },
          }}>
          <BusinessIcon sx={{ fontSize: 50, color: "#e91e63", display: "black" }} />
          <Typography
              fontWeight="bold"
              fontSize="20px"
              color={selectedRole === "Charity" ? "#e91e63" : "black"}
            >
              Charity
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoleSelector;
