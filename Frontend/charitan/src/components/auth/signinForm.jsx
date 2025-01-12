import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  useTheme
} from "@mui/material";
import RoleSelector from "./roleSelector";
import { useState, useEffect } from "react";
import forge from "node-forge";
import { useNavigate } from 'react-router-dom';
import { useAPI } from "../../utils/auth/APIContext";

const SigninForm = () => {
  const theme = useTheme();
  const [role, setRole] = React.useState("Donor");
  const { saveToken } = useAPI();
  const navigate = useNavigate();
  const [error, setErrors] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: role,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      userType: role,
    }));
  }, [role]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // erase error
    if (value.trim() !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: false,
      }));
    }
  };

    const encryptData = (data) => {
    const publicKeyPem = process.env.REACT_APP_RSA_PUBLIC_KEY;
    if (!publicKeyPem) {
      throw new Error('Public key not found in environment variables');
    }
    
    // PEM format
    const formattedPublicKey = publicKeyPem
      .replace(/\\n/g, '\n') 
      .replace(/\\$/gm, '') 
      .trim();
    
    const publicKey = forge.pki.publicKeyFromPem(formattedPublicKey);
    
    const encrypted = publicKey.encrypt(data, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    });
    return forge.util.encode64(encrypted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrors("Please enter both email and password");
      return;
    }

    try {
      const encryptedPassword = encryptData(formData.password);
      const encryptedEmail = encryptData(formData.email);
      const dataToSend = {
        email: encryptedEmail,
        password: encryptedPassword,
        userType: formData.userType,
      };

      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/admin-server/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      if (data.status === "success") {
        const jwe = data.JWE; // Extract JWE
        const role = formData.userType;

        console.log("JWE Token:", jwe); 
        console.log("User Role:", role);

        saveToken(jwe, role); // Context save
        alert("Sign-in successful!");

        if (role === "Donor"){
          navigate("/donor-home")
        } else if (role === "Charity") {
          navigate("/charity-profile")
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setErrors(error.message);
      console.error("Error:", error.message);
    }
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
      
      <RoleSelector selectedRole={role} onSelectRole={setRole} />
      
      {/* input field */}
      <Box>
        {/* Email Field */}
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        {/* Password Field */}
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
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
        onClick={handleSubmit}
        sx={{
          backgroundColor: theme.palette.colors.pink,
          "&:hover": { backgroundColor: "#f06292" },
          mb: 2,
        }}
      >
        Sign in
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
