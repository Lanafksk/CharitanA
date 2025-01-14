import React from 'react';
import { FavoriteBorder } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';

const CharitanLogo = ({ color = 'black' }) => {
  return (
    <Box display="flex" alignItems="center">
      {/* Heart Icon */}
      <FavoriteBorder sx={{ color: '#FB1465', fontSize: '50px' }} />
      {/* Text */}
      <Typography variant="h4" sx={{ marginLeft: '4px', fontWeight: 600, color}}>
        Charitan
      </Typography>
    </Box>
  );
};

export default CharitanLogo;