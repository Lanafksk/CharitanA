import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Container, 
  Grid, 
  Paper 
} from '@mui/material';

// Import the ProjectDiscoveryCard component we'll use to display each project
import ProjectDiscoveryCard from './projectDiscoveryCard';
import { fetchProjects } from '../../utils/api/projects/projectService';

const TopProjectsDisplay = () => {
  // Initialize state for projects, loading status, and potential errors
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTopProjects = async () => {
      try {
        // Fetch projects from the API
        const response = await fetchProjects();
        
        // Filter for running projects and calculate their completion percentage
        const runningProjects = response.filter(project => 
          project.status === "Running"
        );
        
        // Sort projects by completion percentage (current_amount/target_amount)
        const sortedProjects = runningProjects
          .map(project => ({
            ...project,
            completionPercentage: (project.current_amount / project.target_amount) * 100
          }))
          .sort((a, b) => b.completionPercentage - a.completionPercentage)
          .slice(0, 3); // Get only the top 3 projects
        
        setProjects(sortedProjects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getTopProjects();
  }, []);

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="400px"
      >
        <CircularProgress sx={{ color: '#fb1465' }} />
      </Box>
    );
  }

  // Show error message if something went wrong
  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="400px"
      >
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4,
          backgroundColor: 'transparent'
        }}
      >
        
        <Grid container spacing={3} justifyContent="center">
          {projects.map((project) => (
            <Grid item xs={12} md={4} key={project.project_id}>
              <ProjectDiscoveryCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default TopProjectsDisplay;