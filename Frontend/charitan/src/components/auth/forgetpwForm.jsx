import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme
} from "@mui/material";

const ForgetPWForm = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        marginTop: "10%",
        marginBottom: "10%",
        padding: 6,
        borderRadius: 3,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      {/* Title */}
      <Box display="flex" alignItems="center" flexDirection="column" mb={4}>
        <Typography fontWeight="bold" fontSize={25}>
          Forget password?
        </Typography>
        <Typography fontSize={14} color="textSecondary" sx={{ mt: 1 }}>
          Enter your email below to receive the password reset instructions.        
        </Typography>
      </Box>
      
      {/* input field */}
      <Box>
        {/* Email Field */}
        <TextField
          label="Email address"
          type="email"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
      </Box>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          backgroundColor: theme.palette.colors.pink,
          "&:hover": { backgroundColor: "#f06292" },
          mb: 2,
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ForgetPWForm;
