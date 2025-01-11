import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, CircularProgress } from '@mui/material';
import ProjectDiscoveryCard from './projectDiscoveryCard';

const ProjectDiscovery = ({ projects = [], itemsPerPage = 3, rowSpacing = 8 }) => {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingTriggerRef = useRef();

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  useEffect(() => {
    // Initialize with first two pages of projects if we have enough projects
    const initialItems = projects.slice(0, itemsPerPage * 2);
    setVisibleProjects(initialItems);
    setHasMore(projects.length > initialItems.length);
  }, [projects, itemsPerPage]);

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

  const loadMoreProjects = async () => {
    setIsLoading(true);
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
      {/* Container for centered grid with max-width */}
      <Box
        sx={{
          maxWidth: '1200px', // Adjust this value based on your design needs
          width: '100%',
          px: 3 // Horizontal padding
        }}
      >
        <Grid 
          container 
          spacing={3}        // Horizontal spacing between cards
          rowSpacing={rowSpacing} // Vertical spacing between rows
          justifyContent="center" // Centers the grid items horizontally
        >
          {visibleProjects.map((project, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              lg={4} 
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <ProjectDiscoveryCard
                projectName={project.projectName || ''}
                charityName={project.charityName || ''}
                status={project.status || ''}
                description={project.description || ''}
                category={project.category || ''}
                raised={project.raised || 0}
                goal={project.goal || 0}
                location={project.location || ''}
                daysLeft={project.daysLeft || 0}
                image={project.image || ''}
                projectData={project}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

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