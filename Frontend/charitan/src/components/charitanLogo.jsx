import React from 'react';
import { FavoriteBorder } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';


const CharitanLogo = () => {
  return (
    <Box display="flex" alignItems="center">
      {/* Heart Icon */}
      <FavoriteBorder sx={{ color: '#f44336', fontSize: '54px' }} />
      {/* Text */}
      <Typography variant="h4" sx={{ marginLeft: '4px', fontWeight: 600, color: 'black' }}>
        Charitan
      </Typography>
    </Box>
  );
};

export default CharitanLogo;
