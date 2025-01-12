import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, CircularProgress } from '@mui/material';
import ProjectDiscoveryCard from './projectDiscoveryCard';

const ProjectDiscovery = ({ projects = [], itemsPerPage = 3, rowSpacing = 8 }) => {
  // State management for infinite scroll and project display
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // Reference for intersection observer
  const loadingTriggerRef = useRef();
  
  // Calculate total pages based on project array length
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  // Initialize the component with the first set of projects
  useEffect(() => {
    // Load first two pages initially for better user experience
    const initialItems = projects.slice(0, itemsPerPage * 2);
    setVisibleProjects(initialItems);
    setHasMore(projects.length > initialItems.length);
    // Reset current page when projects array changes
    setCurrentPage(2);
  }, [projects, itemsPerPage]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          loadMoreProjects();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingTriggerRef.current) {
      observer.observe(loadingTriggerRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, hasMore]);

  // Function to load more projects when scrolling
  const loadMoreProjects = async () => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      const startIndex = visibleProjects.length;
      const endIndex = startIndex + itemsPerPage;
      const newProjects = projects.slice(startIndex, endIndex);
      
      setVisibleProjects(prev => [...prev, ...newProjects]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < projects.length);
    } else {
      setHasMore(false);
    }
    
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Main content container with max-width constraint */}
      <Box
        sx={{
          maxWidth: '1200px',
          width: '100%',
          px: 3
        }}
      >
        <Grid
          container
          spacing={3}
          rowSpacing={rowSpacing}
          justifyContent="center"
        >
          {visibleProjects.map((project, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              key={project.id || index} // Prefer using project.id if available
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {/* Pass the entire project object to ProjectDiscoveryCard */}
              <ProjectDiscoveryCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Loading indicator for infinite scroll */}
      <Box
        ref={loadingTriggerRef}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 4,
          width: '100%'
        }}
      >
        {isLoading && <CircularProgress />}
      </Box>
    </Box>
  );
};

export default ProjectDiscovery;