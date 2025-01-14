import React from 'react';
import { Avatar, Button, Box, Typography } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

const ImageUploader = ({ onImageUpload, currentImage }) => {
  // Initialize Cloudinary instance with environment variables
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
    }
  });

  // Handle the upload process using Cloudinary widget
  const handleUpload = () => {
    if (typeof window === 'undefined') return;

    // Create and configure the upload widget
    const widget = window.cloudinary?.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1,
        showSkipCropButton: false,
        folder: 'profile-images/',
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          // Pass the uploaded image URL to the parent component
          onImageUpload(result.info.secure_url);
        }
      }
    );

    widget?.open();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      {/* Avatar with upload functionality */}
      <Avatar
        sx={{
          width: 100,
          height: 100,
          cursor: 'pointer',
          backgroundColor: '#f4f4f4',
          '&:hover': {
            opacity: 0.8,
          },
        }}
        onClick={handleUpload}
      >
        {currentImage ? (
          <AdvancedImage
            cldImg={cld.image(currentImage.split('/').slice(7).join('/').replace('.png', ''))}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt="Profile"
          />
        ) : (
          <AddPhotoAlternateIcon fontSize="large" sx={{ color: '#ccc' }} />
        )}
      </Avatar>

      {/* Upload button */}
      <Button
        variant="outlined"
        size="small"
        onClick={handleUpload}
        sx={{
          textTransform: 'none',
          fontSize: '0.875rem',
          color: theme => theme.palette.colors?.pink || '#fb1465',
          borderColor: theme => theme.palette.colors?.pink || '#fb1465',
          '&:hover': {
            borderColor: '#e91e63',
            color: '#e91e63',
          },
        }}
      >
        {currentImage ? 'Change Photo' : 'Upload Photo'}
      </Button>
    </Box>
  );
};

export default ImageUploader;