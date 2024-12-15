import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  useTheme
} from "@mui/material";

const RecoveryPWForm = () => {
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
          Reset Password
        </Typography>
        <Typography fontSize={14} color="textSecondary" sx={{ mt: 1 }}>
          Enter your new password below to reset password.        
        </Typography>
      </Box>
      
      {/* input field */}
      <Box>
        {/* new password Field */}
        <TextField
          label="New password"
          type="password"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        {/* Password confirmation Field */}
                <TextField
                  label="Password confirmation"
                  type="password"
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
        Save
      </Button>
    </Box>
  );
};

export default RecoveryPWForm;
