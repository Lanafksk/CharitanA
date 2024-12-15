import React from "react";
import { Box, Typography, Grid} from "@mui/material";
import CustomTextfield from "./customTextfield";

const DonorForm = ({ formData, handleInputChange }) => {
  return (
    <Box>
      {/* Name Fields */}
      <Grid container spacing={1} >
        <Grid item xs={6}>
          <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Frist name </Typography>
          <CustomTextfield
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Last name </Typography>
          <CustomTextfield
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
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

export default DonorForm;
