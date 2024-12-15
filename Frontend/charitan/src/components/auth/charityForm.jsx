import React from "react";
import { Box, Typography, Grid, FormControl, Select, MenuItem} from "@mui/material";
import CustomTextfield from "./customTextfield";

const CharityForm = ({ formData, handleInputChange }) => {
  return (
    <Box>
      {/* Name Fields */}
      <Grid container spacing={1} >
        <Grid item xs={7}>
          <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Charity name</Typography>
          <CustomTextfield
            value={formData.charityName}
            onChange={(e) => handleInputChange("charityName", e.target.value)}
          />
        </Grid>
        <Grid item xs={5}>
          <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Tax code </Typography>
          <CustomTextfield
            value={formData.taxCode}
            onChange={(e) => handleInputChange("taxCode", e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Email Field */}
      <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Email address </Typography>
      <CustomTextfield
            value={formData.email}
            type="email"
            onChange={(e) => handleInputChange("email", e.target.value)}
          />

      {/* Phone Number Field */}
      <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Phone number </Typography>
      <CustomTextfield
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          />

      {/* Address Field */}
      <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Address </Typography>
      <CustomTextfield
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />

      {/* type Selector */}
      <FormControl fullWidth sx={{ marginBottom: "12px" }}>
      <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Company type </Typography>
        <Select
          value={formData.charityType}
          onChange={(e) => handleInputChange("charityType", e.target.value)}
          sx={{
            height: "40px", 
            padding: "5px", 
            textAlign: "left", 
            borderRadius: "8px",
          }}
        >
          <MenuItem value="Individuals">Individuals</MenuItem>
          <MenuItem value="Corporation">Corporation</MenuItem>
          <MenuItem value="Non-profit organizations">Non-profit organizations</MenuItem>
        </Select>
      </FormControl>

    
      {/* Password Field */}
      <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Password </Typography>
      <CustomTextfield
            value={formData.password}
            type="password"
            onChange={(e) => handleInputChange("password", e.target.value)}
          />

      {/* Password confirmation Field */}
      <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Password Confirmation </Typography>
      <CustomTextfield
            value={formData.passwordConfirm}
            type="password"
            onChange={(e) => handleInputChange("passwordConfirm", e.target.value)}
          />
    </Box>
  );
};

export default CharityForm;
