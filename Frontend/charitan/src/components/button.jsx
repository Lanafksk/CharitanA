import React from "react";
import PropTypes from "prop-types";
import { darken } from "@mui/system";
import Button from "@mui/material/Button";

const CustomButton = ({ text, onClick, disabled, backgroundColor, hoverColor, disabledColor, textColor }) => {
    return (
      <Button
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        sx={{
          backgroundColor: backgroundColor || "#FB1465",
          color: textColor || "white",
          borderRadius: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: hoverColor || (backgroundColor ? darken(backgroundColor, 0.2) : "#d93b63"),
          },
          "&:disabled": {
            backgroundColor: disabledColor || "#d3d3d3",
          },
        }}
      >
        {text}
      </Button>
    );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.string,
  hoverColor: PropTypes.string,
  disabledColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default CustomButton;