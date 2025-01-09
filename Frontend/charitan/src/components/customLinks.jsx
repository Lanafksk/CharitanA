import React from 'react';
import { Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const CustomLinks = () => {
  const features = [
    'Easy project setup',
    'Secure payment processing',
    'Real-time donation tracking',
    'Social media integration'
  ];

  return (
    <Box sx={{ padding: 4, maxWidth: 400 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Start Your Project Today
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Create a project and start raising funds for your cause. Our platform provides all the tools you need to succeed.
      </Typography>
      <List>
        {features.map((feature, index) => (
          <ListItem key={index} sx={{ paddingLeft: 0 }}>
            <ListItemIcon sx={{ minWidth: 32, color: 'red' }}>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary={feature} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CustomLinks;
