import React, { useState } from "react";
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

const SignupForm = () => {
  const theme = useTheme();

  const [isChecked, setIsChecked] = useState(false); // checkbox
  const [errors, setErrors] = useState({}); // error state
  const [formData, setFormData] = useState({
    type: "Donor",
    country: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    passwordConfirm: "",
    charityName: "",
    taxCode: "",
    charityType: "",
    img: "",
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
      address: "",
      password: "",
      passwordConfirm: "",
      charityName: "",
      taxCode: "",
      charityType: "",
      img: "",
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
      if (!formData.address.trim()) newErrors.address = true;
      if (!formData.password.trim()) newErrors.password = true;
      if (!formData.passwordConfirm.trim()) newErrors.passwordConfirm = true;
    } else if (formData.type === "Charity") {
      if (!formData.country.trim()) newErrors.country = true;
      if (!formData.charityName.trim()) newErrors.charityName = true;
      if (!formData.taxCode.trim()) newErrors.taxCode = true;
      if (!formData.email.trim()) newErrors.email = true;
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = true;
      if (!formData.address.trim()) newErrors.address = true;
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

  const handleAvatarClick = () => {
    // adding picture funtions will be implemented here
    console.log("Avatar clicked!");
  };

  const handleSubmit = () => {
    let filteredData;

    // form validate check 
    if (!validateForm()) {
      alert("All the fields are required. Please check the form carefully.");
      return;
    }

    // filter data based on the role
    if (formData.type === "Donor") {
      filteredData = {
        type: formData.type,
        country: formData.country,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        img: formData.img,
      };
    } else {
      filteredData = {
        type: formData.type,
        country: formData.country,
        charityName: formData.charityName,
        taxCode: formData.taxCode,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        charityType: formData.charityType,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        img: formData.img,
      };
    }

    console.log("Submitted Data:", filteredData);
    alert(`Submitted Data: ${JSON.stringify(filteredData, null, 2)}`);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 1, 
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            backgroundColor: "#f4f4f4",
            cursor: "pointer", // for hover effect
          }}
          onClick={handleAvatarClick} 
        >
          <AddPhotoAlternateIcon fontSize="large" sx={{ color: "#ccc" }} />
        </Avatar>
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
        <DonorForm formData={formData} handleInputChange={handleInputChange} errors={errors} />
      ) : (
        <CharityForm formData={formData} handleInputChange={handleInputChange} errors={errors} />
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
