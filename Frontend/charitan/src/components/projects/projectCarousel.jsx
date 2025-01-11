import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProjectCarousel = ({ children }) => {
  const [startIndex, setStartIndex] = useState(0);

  const getVisibleCount = () => {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 960) return 2;
    return 3;
  };

  const totalProjects = React.Children.count(children);

  const handlePrevious = () => {
    setStartIndex(prev => Math.max(0, prev - getVisibleCount()));
  };

  const handleNext = () => {
    setStartIndex(prev => Math.min(totalProjects - getVisibleCount(), prev + getVisibleCount()));
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center',
      px: 4
    }}>
      {/* Left navigation arrow */}
      <ArrowBackIosNewIcon
        onClick={handlePrevious}
        style={{
          position: 'absolute',
          left: 0,
          zIndex: 2,
          color: '#FB1465',
          cursor: 'pointer',
          display: startIndex === 0 ? 'none' : 'block',
          fontSize: '40px'
        }}
      />

      <Box sx={{ 
        overflow: 'hidden', 
        width: '100%',
      }}>
        <Grid
          container
          spacing={3}
          sx={{
            transform: `translateX(-${startIndex * (100 / getVisibleCount())}%)`,
            transition: 'transform 0.3s ease-in-out',
            width: '100%',
            margin: '0 !important',
            flexWrap: 'nowrap',
          }}
        >
          {children}
        </Grid>
      </Box>

      {/* Right navigation arrow */}
      <ArrowForwardIosIcon
        onClick={handleNext}
        style={{
          position: 'absolute',
          right: 0,
          zIndex: 2,
          color: '#FB1465',
          cursor: 'pointer',
          display: startIndex >= totalProjects - getVisibleCount() ? 'none' : 'block',
          fontSize: '40px'
        }}
      />
    </Box>
  );
};

export default ProjectCarousel;