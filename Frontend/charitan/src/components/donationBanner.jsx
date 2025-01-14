import React from "react";
import { Box, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";

const DonationBanner = ({ imageSrc, height }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1px",
        borderRadius: "0px",
        backgroundColor: "#fff",
        overflow: "hidden",
        flexDirection: { xs: "column", md: "row" },
        height: height, // Set the height from the prop
        maxHeight: height, // Constrain the max height
      }}
    >
      {/* Text Content */}
      <Box
        sx={{
          maxWidth: "50%",
          textAlign: { xs: "center", md: "left" },
          padding: "100px",
          flex: "1 1 auto", // Allows the text content to adapt to height changes
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "black",
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          Make a difference{" "}
          <Box component="span" sx={{ color: "#ff0055" }}>
            in the world today
          </Box>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            mb: 3,
            lineHeight: 1.6,
          }}
        >
          Join thousands of donors worldwide in supporting meaningful causes.
          Every contribution counts towards creating positive change in
          communities around the globe.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff0055",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none", // Prevents all-caps
            padding: "10px 20px",
            borderRadius: "12px", // Makes the button rounder
            "&:hover": {
              backgroundColor: "#e6004f",
            },
          }}
        >
          Start Donating
        </Button>
      </Box>

      {/* Image */}
      <Box
        sx={{
          flex: 1,
          textAlign: "center",
          mt: { xs: 4, md: 0 },
          maxHeight: "100%", // Ensures the image container doesn't exceed the component's height
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={imageSrc}
          alt="Hands forming a heart shape"
          style={{
            maxWidth: "100%",
            maxHeight: "100%", // Resize image dynamically within the defined height
            height: "auto",
            borderRadius: "8px",
          }}
        />
      </Box>
    </Box>
  );
};

// PropTypes for type-checking
DonationBanner.propTypes = {
  imageSrc: PropTypes.string.isRequired, // Ensures an image URL is passed as a prop
  height: PropTypes.string, // Height is an optional string (e.g., "400px", "50vh")
};

DonationBanner.defaultProps = {
  height: "auto", // Default height is auto if not specified
};

export default DonationBanner;
