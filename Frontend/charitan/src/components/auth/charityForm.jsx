import React from "react";
import { Box, Typography, Grid, FormControl, Select, MenuItem} from "@mui/material";
import CustomTextfield from "./customTextfield";

const CharityForm = ({ formData, handleInputChange, handleAddressChange, errors }) => {
  return (
    <Box>
      {/* Name Fields */}
      <Grid container spacing={1} >
        <Grid item xs={7}>
          <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Charity name</Typography>
          <CustomTextfield
            value={formData.charityName}
            onChange={(e) => handleInputChange("charityName", e.target.value)}
            error={errors.charityName} // error props
          />
        </Grid>
        <Grid item xs={5}>
          <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Tax code </Typography>
          <CustomTextfield
            value={formData.taxCode}
            onChange={(e) => handleInputChange("taxCode", e.target.value)}
            error={errors.taxCode} // error props
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

      {/* paypal_email Field */}
      <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Paypal Email address </Typography>
      <CustomTextfield
            value={formData.paypal_email}
            type="paypal_email"
            onChange={(e) => handleInputChange("paypal_email", e.target.value)}
            error={errors.paypal_email} // error props
          />

      {/* Phone Number Field */}
      <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Phone number </Typography>
      <CustomTextfield
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            error={errors.phoneNumber} // error props
          />

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

      {/* type Selector */}
      <FormControl fullWidth sx={{ marginBottom: "12px" }}>
      <Typography fontSize={15} sx={{ textAlign: "left", fontWeight: "bold", pl: "4px", pb: "4px",}}> Company type </Typography>
        <Select
          value={formData.charityType}
          onChange={(e) => handleInputChange("charityType", e.target.value)}
          error={errors.charityType}
          sx={{
            height: "40px", 
            padding: "5px", 
            textAlign: "left", 
            borderRadius: "8px",
          }}
        >
          <MenuItem value="Individual">Individuals</MenuItem>
          <MenuItem value="Company">Corporation</MenuItem>
          <MenuItem value="Non-Profit">Non-profit organizations</MenuItem>
        </Select>
      </FormControl>

    
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

export default CharityForm;
