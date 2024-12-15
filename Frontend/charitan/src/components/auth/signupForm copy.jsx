import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Avatar,
  useTheme,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const SignupForm1 = () => {
  const theme = useTheme();

  // Country Selector sample code
  const [country, setCountry] = useState("Vietnam");
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  // Role Selector sample code
  const [role, setRole] = React.useState("Donor");
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleAvatarClick = () => {
    // adding picture funtions will be implemented here
    console.log("Avatar clicked!");
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        marginTop: 10, // 상단 여백
        padding: 4, // 내부 여백
        borderRadius: 3,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" flexDirection="column" mb={2}>
        <Typography fontWeight="bold" fontSize={30}>
          Create your account
        </Typography>
        <Typography fontSize={14} color="textSecondary" sx={{ mt: 1 }}>
          Join our community and start making a difference
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
          onChange={handleRoleChange}
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

      {/* Profile Image */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 3, // 8px * 3 = 24 px
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            backgroundColor: "#f4f4f4",
            cursor: "pointer", // 클릭 가능한 상태로 표시
          }}
        onClick={handleAvatarClick} // onClick 이벤트 핸들러 연결
        >
          <AddPhotoAlternateIcon fontSize="large" sx={{ color: "#ccc" }} />
        </Avatar>
      </Box>

      {/* Country Selector */}
      <FormControl fullWidth sx={{ marginBottom: 1 }}>
        <Select 
          value={country}  
          onChange={handleCountryChange}
          sx={{
            height: "40px", // 높이 조절
            padding: "5px", // 내부 패딩 조절
            textAlign: "left", // 텍스트 왼쪽 정렬
            borderRadius: "8px",
          }}
        >
          <MenuItem value="Vietnam">🇻🇳 Vietnam</MenuItem>
          <MenuItem value="South Korea">🇰🇷 South Korea</MenuItem>
          <MenuItem value="United States">🇺🇸 United States</MenuItem>
        </Select>
      </FormControl>

      {/* Name Fields */}
      <Grid
        container
        spacing={2}
        sx={{ marginBottom: 1}}
      >
        <Grid item xs={6}>
          <TextField label="First Name" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Last Name" fullWidth variant="outlined" />
        </Grid>
      </Grid>

      {/* Email Field */}
      <TextField
        label="Email Address"
        fullWidth
        variant="outlined"
        sx={{ marginBottom: (theme) => theme.spacing(4) }}
      />

      {/* Phone Number Field */}
      <TextField
        label="Phone Number"
        fullWidth
        variant="outlined"
        sx={{ marginBottom: (theme) => theme.spacing(4) }}
      />

      {/* Password Fields */}
      <TextField
        label="Password"
        type="password"
        fullWidth
        variant="outlined"
        sx={{ marginBottom: (theme) => theme.spacing(4) }}
      />
      <TextField
        label="Password Confirmation"
        type="password"
        fullWidth
        variant="outlined"
        sx={{ marginBottom: (theme) => theme.spacing(4) }}
      />

      {/* Address Field */}
      <TextField
        label="Address"
        fullWidth
        variant="outlined"
        sx={{ marginBottom: (theme) => theme.spacing(4) }}
      />

      {/* Terms and Conditions */}
      <FormControlLabel
        control={<Checkbox />}
        label={
          <Typography variant="body2">
            I agree to the{" "}
            <Link href="#" color="primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" color="primary">
              Privacy Policy
            </Link>
          </Typography>
        }
        sx={{ marginBottom: (theme) => theme.spacing(4) }}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          backgroundColor: theme.palette.colors.pink,
          "&:hover": { backgroundColor: "#e91e63" },
          marginBottom: (theme) => theme.spacing(4),
        }}
      >
        Create account
      </Button>

      {/* Sign in Link */}
      <Typography variant="body2" textAlign="center" color="textSecondary">
        Already have an account?{" "}
        <Link href="/signin" color="primary">
          Sign in.
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupForm1;
