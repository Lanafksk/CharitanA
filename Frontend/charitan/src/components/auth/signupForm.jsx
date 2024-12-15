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

const SignupForm = () => {
  const theme = useTheme();

  const [isChecked, setIsChecked] = useState(false); // checkbox
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

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Role Selector with initializing
  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setIsChecked(false);
    setFormData({
      type: newType,
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

  const handleAvatarClick = () => {
    // adding picture funtions will be implemented here
    console.log("Avatar clicked!");
  };

  const handleSubmit = () => {
    let filteredData;

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
        marginTop: 10, // 상단 여백
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

      {/* Role Selector */}
      <Box sx={{ mb: 1, display: "flex", flexDirection: "row" }}>
        <Typography fontSize={16} sx={{ mt: 1 }}>
          Role:
        </Typography>
        <select
          id="role"
          value={formData.type}
          onChange={handleTypeChange}
          style={{
            width: "27%",
            height: "40px",
            padding: "0 5px",
            fontSize: "16px",
            border: "0px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "white",
            textAlign: "left",
            fontWeight: "bold",
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
          marginBottom: 1, 
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
          sx={{
            height: "40px", // 높이 조절
            padding: "5px", // 내부 패딩 조절
            textAlign: "left", // 텍스트 왼쪽 정렬
          }}
        >
          <MenuItem value="Vietnam">🇻🇳 Vietnam</MenuItem>
          <MenuItem value="South Korea">🇰🇷 South Korea</MenuItem>
          <MenuItem value="United States">🇺🇸 United States</MenuItem>
        </Select>
      </FormControl>

      {formData.type === "Donor" ? (
        <DonorForm formData={formData} handleInputChange={handleInputChange} />
      ) : (
        <CharityForm
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      {/*            Footer         */}
      {/* Terms and Conditions */}
      <Box sx={{ mb: 1, display: "flex", flexDirection: "row" }}>
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
        disabled={!isChecked} // disable when checkbox is not checked
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
