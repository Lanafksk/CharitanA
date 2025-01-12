import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Link,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  Avatar,
  useTheme,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DonorForm from "./donorForm";
import CharityForm from "./charityForm";
import RoleSelector from "./roleSelector"
import ImageUploader from "../imageUploader";
import forge from "node-forge";
import { useNavigate } from 'react-router-dom';


const SignupForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const rsaPublicKey = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu/tB9+zU3RxhdeiLXgZF
  pql7GpOLzDcbXneQubo5B02iuRIuO2m0bmCYzG2sdqu5bOOG4jieegDr6X75nC26
  Sb/wVwH5xP1/EJayL6va1se/Zh+aiYWhWRW82j6meLvxodZoIcV2TGhQoZEHBVQ/
  Ta4i1dJr/rtdoha2f8H/YUF+wToTMCaNcqDEbNYQnhj55fLZ0+y+a9o8MQHXP4VB
  FcSqyKTKAO+r3vlnxyXezhZtP1jt9Mp5Lg60qHjEpxfnridchQSJUxSBMw87BOC3
  hBcrQjEA12pRnkGQCO4tZXyrC0kaRS2edBLj+B4qnmO1u3rzEvMSsJY0jL13ftdS
  TQIDAQAB
    -----END PUBLIC KEY-----`

  const [isChecked, setIsChecked] = useState(false); // checkbox
  const [errors, setErrors] = useState({}); // error state
  const [formData, setFormData] = useState({
    type: "Donor",
    country: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      postal_code: "",
    },
    country: "",
    password: "",
    passwordConfirm: "",
    charityName: "",
    taxCode: "",
    charityType: "",
    img: "",
    paypal_email:"",
  });

   // role select function
   const handleRoleSelect = (role) => {
    setFormData({
      ...formData,
      type: role,
      country: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: {
        street: "",
        city: "",
        state: "",
        postal_code: "",
      },
      country: "",
      password: "",
      passwordConfirm: "",
      charityName: "",
      taxCode: "",
      charityType: "",
      img: "",
      paypal_email:"",
    });
  };

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

  const handleAddressChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [field]: value,
      },
    }));
  
    if (value.trim() !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: {
          ...prevErrors.address,
          [field]: false,
        },
      }));
    }
  };

  const encryptData = (data) => {
    const publicKey = forge.pki.publicKeyFromPem(rsaPublicKey);
    const encrypted = publicKey.encrypt(data, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    });
    return forge.util.encode64(encrypted);
  };

  const validateForm = () => {
    const newErrors = {};

    // if the field is empty, set error to true
    // if the type is not seperated, special fields for another type will be set to true
    // as it is not able to be filled
    if (formData.type === "Donor") {
      if (!formData.country.trim()) newErrors.country = true;
      if (!formData.firstName.trim()) newErrors.firstName = true;
      if (!formData.lastName.trim()) newErrors.lastName = true;
      if (!formData.email.trim()) newErrors.email = true;
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = true;
      if (!formData.address.street.trim()) newErrors.address = { ...newErrors.address, street: true };
      if (!formData.address.city.trim()) newErrors.address = { ...newErrors.address, city: true };
      if (!formData.address.state.trim()) newErrors.address = { ...newErrors.address, state: true };
      if (!formData.address.postal_code.trim()) newErrors.address = { ...newErrors.address, postal_code: true };
      if (!formData.country.trim()) newErrors.country = true;
      if (!formData.password.trim()) newErrors.password = true;
      if (!formData.passwordConfirm.trim()) newErrors.passwordConfirm = true;
    } else if (formData.type === "Charity") {
      if (!formData.country.trim()) newErrors.country = true;
      if (!formData.charityName.trim()) newErrors.charityName = true;
      if (!formData.taxCode.trim()) newErrors.taxCode = true;
      if (!formData.email.trim()) newErrors.email = true;
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = true;
      if (!formData.address.street.trim()) newErrors.address = { ...newErrors.address, street: true };
      if (!formData.address.city.trim()) newErrors.address = { ...newErrors.address, city: true };
      if (!formData.address.state.trim()) newErrors.address = { ...newErrors.address, state: true };
      if (!formData.address.postal_code.trim()) newErrors.address = { ...newErrors.address, postal_code: true };
      if (!formData.country.trim()) newErrors.country = true;
      if (!formData.paypal_email.trim()) newErrors.paypal_email = true;
      if (!formData.charityType.trim()) newErrors.charityType = true;
      if (!formData.password.trim()) newErrors.password = true;
      if (!formData.passwordConfirm.trim()) newErrors.passwordConfirm = true;
    }
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "Check the password again !!!";
    }

    // set errors
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // no error return true
  };

  const handleSubmit = async (e) => {
    let filteredData;

    // form validate check 
    if (!validateForm()) {
      alert("All the fields are required. Please check the form carefully.");
      return;
    }

    // filter data based on the role
    if (formData.type === "Donor") {
      filteredData = {
        userType: formData.type,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: encryptData(formData.email),
        phone: formData.phoneNumber,
        address: {
          street: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
          postal_code: formData.address.postal_code,
        },        
        country: formData.country,
        password: encryptData(formData.password),
        img: formData.img || null
      };
    } else { // charity
      filteredData = {
        userType: formData.type,
        name: formData.charityName,
        tax_code: formData.taxCode,
        email: encryptData(formData.email),
        phone: formData.phoneNumber,
        address: {
          street: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
          zip: formData.address.postal_code,
        },        
        country: formData.country,
        type: formData.charityType,
        paypal_email: formData.paypal_email,
        password: encryptData(formData.password),
        img: formData.img || null
      };
    }

    try {
      const response = await fetch("http://172.30.1.26:5001/admin-server/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json"
        },
        body: JSON.stringify(filteredData),
        
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign up failed");
      }

      const data = await response.json();

      if (data.status === "success") {
        // const jwe = data.JWE; // Extract JWE
        // console.log(data)
        alert("Sign-up successful!");
        navigate("/signin")
      } else {
        console.error("Detailed error response:", data); 
        throw new Error("Invalid credentials");
      }

      } catch (error) {
      setErrors(error.message);
      console.error("Error:", error.message);
    }

    console.log("Submitted Data:", filteredData);
    alert(`Submitted Data: ${JSON.stringify(filteredData, null, 2)}`);
  };

  // Add script loader for Cloudinary
  useEffect(() => {
    const loadCloudinaryScript = () => {
      const script = document.createElement('script');
      script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
      script.async = true;
      document.body.appendChild(script);
    };

    loadCloudinaryScript();
  }, []);

  // Add image handler
  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      img: imageUrl
    }));
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        marginTop: 10,
        padding: 4,
        borderRadius: 3,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <Box display="flex" alignItems="center" flexDirection="column" mb={2}>
        <Typography fontWeight="bold" fontSize={30}>
          Create your account
        </Typography>
        <Typography fontSize={14} color="textSecondary" sx={{ mt: 1 }}>
          Join our community and start making a difference
        </Typography>
      </Box>

      <RoleSelector selectedRole={formData.type} onSelectRole={handleRoleSelect} />

      {/* Profile Image */}
      <Box sx={{ mb: 3 }}>
        <ImageUploader 
          onImageUpload={handleImageUpload}
          currentImage={formData.img}
        />
      </Box>

      {/* Country Selector */}
      <FormControl fullWidth sx={{ marginBottom: "12px" }}>
        <Typography
          fontSize={15}
          sx={{
            mt: 1,
            textAlign: "left",
            fontWeight: "bold",
            pl: "4px",
            pb: "4px",
          }}
        >
          Country
        </Typography>
        <Select
          value={formData.country}
          onChange={(e) => handleInputChange("country", e.target.value)}
          error={errors.country}
          sx={{
            height: "40px", 
            padding: "5px", 
            textAlign: "left", 
          }}
        >
          <MenuItem value="Vietnam">🇻🇳 Vietnam</MenuItem>
          <MenuItem value="South Korea">🇰🇷 South Korea</MenuItem>
          <MenuItem value="United States">🇺🇸 United States</MenuItem>
        </Select>
      </FormControl>

      {/* Form Fields */}
      {/* Change the form up to user type */}
      {formData.type === "Donor" ? (
        <DonorForm formData={formData} handleInputChange={handleInputChange} handleAddressChange={handleAddressChange} errors={errors} />
      ) : (
        <CharityForm formData={formData} handleInputChange={handleInputChange} handleAddressChange={handleAddressChange} errors={errors} />
      )}

      {/* Terms and Conditions */}
      <Box sx={{ mt: 1, mb: 1, display: "flex", flexDirection: "row" }}>
        <Checkbox 
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        sx={{
          color: "#e91e63", // unchecked color
          "&.Mui-checked": {
            color: "#fb1465", // checked color
          },
        }}/>
        <Typography fontSize={13} color="textSecondary" sx={{ mt: "11px" }}>
          I agree to the{" "}
          <Link href="#" color="#fb1465">
            Charitan Terms
          </Link>{" "}
          and{" "}
          <Link href="#" color="#fb1465">
            Conditions
          </Link>
        </Typography>
      </Box>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        disabled={!isChecked} // disable button when checkbox is not checked
        fullWidth
        onClick={handleSubmit}
        sx={{
          backgroundColor: theme.palette.colors.pink,
          "&:hover": { backgroundColor: "#e91e63" },
          "&:disabled": { backgroundColor: "#f06292" },
          marginBottom: "12px",
        }}
      >
        Create account
      </Button>

      {/* Sign in Link */}
      <Typography variant="body2" textAlign="center" color="textSecondary">
        Already have an account?{" "}
        <Link href="/signin" color="#fb1465" fontWeight="bold">
          Sign in.
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupForm;
