import React from "react";
import { Box, Typography, Grid} from "@mui/material";
import CustomTextfield from "./customTextfield";

const DonorForm = ({ formData, handleInputChange, handleAddressChange, errors }) => {
  return (
    <Box>
      {/* Name Fields */}
      <Grid container spacing={1} >
        <Grid item xs={6}>
          <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Frist name </Typography>
          <CustomTextfield
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            error={errors.firstName} // error props 
          />
        </Grid>
        <Grid item xs={6}>
          <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Last name </Typography>
          <CustomTextfield
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            error={errors.lastName} // error props 
          />
        </Grid>
      </Grid>

      {/* Email Field */}
      <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Email address </Typography>
      <CustomTextfield
            value={formData.email}
            type="email"
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email} // error props
          />

      {/* Phone Number Field */}
      <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Phone number </Typography>
      <CustomTextfield
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            error={errors.phoneNumber} // error props
          />

      {/* Address Field */}
      <Grid container spacing={1} >
        <Grid item xs={7}>
          <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> City </Typography>
          <CustomTextfield
            value={formData.address.city}
            onChange={(e) => handleAddressChange("city", e.target.value)}
            error={errors.address?.city} // error props 
          />
        </Grid>
        <Grid item xs={5}>
          <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> State </Typography>
          <CustomTextfield
            value={formData.address.state}
            onChange={(e) => handleAddressChange("state", e.target.value)}
            error={errors.address?.state} // error props 
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} >
        <Grid item xs={7}>
          <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Street </Typography>
          <CustomTextfield
            value={formData.address.street}
            onChange={(e) => handleAddressChange("street", e.target.value)}
            error={errors.address?.street}
          />
        </Grid>
        <Grid item xs={5}>
          <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Postcode </Typography>
          <CustomTextfield
            value={formData.address.postal_code}
            onChange={(e) => handleAddressChange("postal_code", e.target.value)}
            error={errors.address?.postal_code} // error props 
          />
        </Grid>
      </Grid>

      {/* Password Field */}
      <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Password </Typography>
      <CustomTextfield
            value={formData.password}
            type="password"
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={errors.password} // error props
          />

      {/* Password confirmation Field */}
      <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Password Confirmation </Typography>
      <CustomTextfield
            value={formData.passwordConfirm}
            type="password"
            onChange={(e) => handleInputChange("passwordConfirm", e.target.value)}
            error={errors.passwordConfirm} // error props
            helperText={errors.passwordConfirm} // error message
          />
    </Box>
  );
};

export default DonorForm;
