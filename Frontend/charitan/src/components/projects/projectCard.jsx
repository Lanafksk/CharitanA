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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PauseIcon from '@mui/icons-material/Pause';
import ProjectDetailForm from './projectDetailForm';

// Configuration object for text length limits
const TEXT_LIMITS = {
  projectName: 20,
  charityName: 20,
  description: 150,
  location: 20
};

const ProjectCard = ({
  projectName,
  charityName,
  status,
  description,
  category,
  raised,
  goal,
  location,
  daysLeft,
  image,
  projectData
}) => {
  const progress = (raised / goal) * 100;
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  // Helper function to truncate text with ellipsis
  const truncateText = (text, limit) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return `${text.substring(0, limit)}...`;
  };

  // Handle edit icon click
  const handleEditClick = () => {
    setIsEditFormOpen(true);
  };

  return (
    <Card sx={{ width: 400, height: 400, borderRadius: 2, overflow: 'hidden' }}>
      <CardMedia
        component="img"
        height="160"
        image={image}
        alt={projectName}
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
            {/* Project Name with Tooltip */}
            <Tooltip title={projectName.length > TEXT_LIMITS.projectName ? projectName : ''}>
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
                  maxWidth: '250px'  // Adjust based on your needs
                }}
              >
                {truncateText(projectName, TEXT_LIMITS.projectName)}
              </Typography>
            </Tooltip>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Charity Name with Tooltip */}
              <Tooltip title={charityName.length > TEXT_LIMITS.charityName ? charityName : ''}>
                <Typography 
                  variant="body2" 
                  color="black" 
                  sx={{ 
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '150px'  // Adjust based on your needs
                  }}
                >
                  {truncateText(charityName, TEXT_LIMITS.charityName)}
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
        {/* Description with Tooltip */}
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
          <Typography variant="body2">${raised.toLocaleString()} raised</Typography>
          <Typography variant="body2" color="text.secondary">
            / ${goal.toLocaleString()} goal
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ 
            mb: 2,
            backgroundColor: '#FFE2F1', // Color of the unfilled part
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#FB1465' // Color of the filled part
            }
          }}
        />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* Location with Tooltip */}
          <Tooltip title={location.length > TEXT_LIMITS.location ? location : ''}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px'  // Adjust based on your needs
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 1,
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <EditIcon 
          sx={{ cursor: 'pointer', mx: 1, ':active': { color: 'highlightColor' } }}
          onClick={handleEditClick}
        />
        <ProjectDetailForm
          open={isEditFormOpen}
          onClose={() => setIsEditFormOpen(false)}
          project={projectData}
          onSave={(updatedData) => {
            console.log('Updated project data:', updatedData);
            // Handle the save operation here
          }}
        />
        <PauseIcon sx={{ cursor: 'pointer', mx: 1, ':active': { color: 'highlightColor' } }} />
        <DeleteIcon sx={{ cursor: 'pointer', mx: 1, ':active': { color: 'highlightColor' } }} />
      </Box>
    </Card>
  );
};

export default ProjectCard;