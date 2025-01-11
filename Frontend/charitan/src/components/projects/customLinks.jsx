import React from 'react';
import { Typography, Box } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

// Modified to be a text item with icon instead of a link
const TextItem = ({ text }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      // Removed link-specific styles
      color: 'inherit',
    }}
  >
    <ArrowForward
      sx={{
        color: '#FB1465',
        fontSize: '24px',
      }}
    />
    <Typography
      sx={{
        color: '#666',
        fontSize: '1.25rem',
      }}
    >
      {text}
    </Typography>
  </Box>
);

const CustomLinks = () => {
  // Updated to only include text without href
  const textItems = [
    { text: 'Easy project setup' },
    { text: 'Secure payment processing' },
    { text: 'Real-time donation tracking' },
    { text: 'Social media integration' },
  ];

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', p: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'left' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          Start Your Project Today
        </Typography>
        <Typography
          sx={{
            fontSize: '1.25rem',
            color: '#666',
            mb: 4,
          }}
        >
          Create a project and start raising funds for your cause. Our platform
          provides all the tools you need to succeed
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {textItems.map((item, index) => (
          <TextItem key={index} {...item} />
        ))}
      </Box>
    </Box>
  );
};

export default CustomLinks;