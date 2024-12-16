import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  useTheme
} from "@mui/material";

const SigninForm = () => {
  const theme = useTheme();
  
  // Role Selector sample code
  const [role, setRole] = React.useState("Donor");
  const handleChange = (event) => {
    setRole(event.target.value);
  };

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
          Sign in to your account
        </Typography>
        <Typography fontSize={14} color="textSecondary" sx={{ mt: 1 }}>
          Welcome back! Please enter your details.
        </Typography>
      </Box>

      {/* Role Selector */}
      <Box sx={{ mb: 1, display: "flex", flexDirection: "row" }}>
        <Typography fontSize={16} sx={{ mt: 1 }}>
          Role: 
        </Typography>
        <select
          id="role"
          value={role}
          onChange={handleChange}
          style={{
            width: "27%",
            height: "40px",
            padding: "0 5px",
            fontSize: "16px",
            border: "0px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "white",
            textAlign: "left",
            fontFamily: theme.typography.fontFamily,
          }}
        >
          <option value="Donor">Donor</option>
          <option value="Charity">Charity</option>
        </select>
      </Box>
      
      {/* input field */}
      <Box>
        {/* Email Field */}
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        {/* Password Field */}
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          sx={{ mb: 3 }}
        />
      </Box>

      {/* Forgot Password */}
      <Box sx={{ textAlign: "right", mb: 2 }}>
        <Link href="/forget" variant="body2" color={theme.palette.colors.pink} fontFamily={theme.typography.fontFamily}>
          Forgot your password?
        </Link>
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
        Create account
      </Button>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" textAlign="center" color="textSecondary">
          Don't have an account?{" "}
          <Link href="/signup" color={theme.palette.colors.pink} fontWeight="bold">
            Sign up.
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SigninForm;
