import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Button,
  Tooltip,
} from '@mui/material';

// Configuration object for text length limits
const TEXT_LIMITS = {
  projectName: 20,
  charityName: 20,
  description: 150,
  location: 20
};

// Helper function to calculate days remaining until project end
const calculateDaysLeft = (endDate) => {
  const end = new Date(endDate);
  const today = new Date();
  const diffTime = end - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

// Helper function to get the first available image or return a placeholder
const getProjectImage = (images) => {
  if (images && images.length > 0 && images[0].url) {
    return images[0].url;
  }
  // Return a placeholder image if no project image is available
  return 'https://via.placeholder.com/350x160';
};

const ProjectDiscoveryCard = ({ project }) => {
  // Destructure all needed properties from the project object
  const {
    title,
    charity_id,
    status,
    description,
    category,
    current_amount,
    target_amount,
    country,
    region,
    end_date,
    images,
  } = project;

  // Calculate values needed for display
  const progress = (current_amount / target_amount) * 100;
  const daysLeft = calculateDaysLeft(end_date);
  const location = `${country}, ${region}`;
  const image = getProjectImage(images);

  // Helper function to truncate text with ellipsis
  const truncateText = (text, limit) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return `${text.substring(0, limit)}...`;
  };

  return (
    <Card sx={{ width: 350, height: 400, borderRadius: 2, overflow: 'hidden' }}>
      <CardMedia
        component="img"
        height="160"
        image={image}
        alt={title}
      />
      <CardContent sx={{ height: 290, position: 'relative' }}>
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* Project Title with Tooltip */}
            <Tooltip title={title.length > TEXT_LIMITS.projectName ? title : ''}>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  textAlign: 'left', 
                  fontWeight: 'bold', 
                  fontSize: '1.0rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '250px'
                }}
              >
                {truncateText(title, TEXT_LIMITS.projectName)}
              </Typography>
            </Tooltip>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Charity ID displayed until we can fetch charity names */}
              <Tooltip title={charity_id}>
                <Typography 
                  variant="body2" 
                  color="black" 
                  sx={{ 
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '150px'
                  }}
                >
                  {truncateText(charity_id, TEXT_LIMITS.charityName)}
                </Typography>
              </Tooltip>
              <Chip
                label={status}
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  borderColor: '#00ff26',
                  color: '#00ff26',
                  borderRadius: '12px',
                }}
              />
            </Box>
          </Box>
          <Chip
            label={category}
            variant="outlined"
            sx={{
              borderColor: '#fb1465',
              color: '#fb1465',
              borderRadius: '12px',
            }}
          />
        </Box>
        
        <Tooltip title={description.length > TEXT_LIMITS.description ? description : ''}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            paragraph 
            align="left"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: '4.5em',
              mb: 2
            }}
          >
            {truncateText(description, TEXT_LIMITS.description)}
          </Typography>
        </Tooltip>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="body2">${current_amount.toLocaleString()} raised</Typography>
          <Typography variant="body2" color="text.secondary">
            / ${target_amount.toLocaleString()} goal
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ 
            mb: 2,
            backgroundColor: '#FFE2F1',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#FB1465'
            }
          }}
        />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Tooltip title={location.length > TEXT_LIMITS.location ? location : ''}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px'
              }}
            >
              {truncateText(location, TEXT_LIMITS.location)} - {daysLeft} days left
            </Typography>
          </Tooltip>
          <Button size="small" sx={{ ml: 2, color: '#fb1465', textTransform: 'none' }}>
            Reading more →
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectDiscoveryCard;