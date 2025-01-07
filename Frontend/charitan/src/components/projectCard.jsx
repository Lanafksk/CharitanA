import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PauseIcon from '@mui/icons-material/Pause';

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
}) => {
  const progress = (raised / goal) * 100;

  return (
    <Card sx={{ maxWidth: 400, borderRadius: 2, overflow: 'hidden' }}>
      <CardMedia
        component="img"
        height="160"
        image={image}
        alt={projectName}
      />
      <CardContent>
        <Box style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="div" sx={{ textAlign: 'left', fontWeight: 'bold' , fontSize: '1.2rem'}}>
            {projectName}
          </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="black" sx={{ fontSize: '1.0rem' }}>
                {charityName}
              </Typography>
              <Chip
                label={status}
                variant="outlined"
                sx={{
                    fontSize: '0.75rem',
                    borderColor: '#00ff26', // Green border
                    color: '#00ff26',      // Green text
                    borderRadius: '16px',       // Pill-shaped
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
              borderRadius: '16px',
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph align="left">
          {description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="body2">${raised.toLocaleString()} raised</Typography>
          <Typography variant="body2" color="text.secondary">
            / ${goal.toLocaleString()} goal
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ mb: 2 }}
        />
       <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
                {location} - {daysLeft} days left
            </Typography>
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
        <EditIcon sx={{ cursor: 'pointer', mx: 1, ':active': { color: 'highlightColor' } }} />
        <PauseIcon sx={{ cursor: 'pointer', mx: 1, ':active': { color: 'highlightColor' } }} />
        <DeleteIcon sx={{ cursor: 'pointer', mx: 1, ':active': { color: 'highlightColor' } }} />
      </Box>
    </Card>
  );
};

export default ProjectCard;
