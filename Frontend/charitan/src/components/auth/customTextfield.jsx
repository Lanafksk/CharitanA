import React from "react";
import { TextField } from "@mui/material";

const CustomTextfield = ({ value, onChange, ...props }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      sx={{
        height: 40,
        "& .MuiOutlinedInput-root": {
          height: "100%",
          "& .MuiOutlinedInput-input": {
            padding: "8px 12px",
            fontSize: "0.9rem",
          },
        },
        marginBottom: "12px",
      }}
      {...props}
    />
  );
};

export default CustomTextfield;
