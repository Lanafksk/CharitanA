import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const CustomCard = ({ icon: Icon, title, description }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 2,
        borderRadius: 2,
        textAlign: 'center',
        padding: 2,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)', // Slight scaling effect
          boxShadow: 4, // Increase shadow on hover
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <Icon sx={{ fontSize: 48, color: '#fb1465' }} /> {/* Icon passed as prop */}
      </Box>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {title} {/* Title passed as prop */}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          {description} {/* Description passed as prop */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
