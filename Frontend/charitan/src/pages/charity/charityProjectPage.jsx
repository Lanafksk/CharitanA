import React from 'react';
import { Box, Grid, Container } from '@mui/material';
import NavigationBar from '../../components/navigationBar';
import PageBanner from '../../components/pageBanner';
import ProjectCard from '../../components/projectCard';
import projectImage from '../../assets/project.jpg';

const CharityProjectPage = () => {
  const mockProjects = [
    {
      projectName: 'Clean Water Initiative',
      charityName: 'Water Charity',
      status: 'Available',
      description: 'Providing clean water to communities in need.',
      category: 'Health',
      raised: 50000,
      goal: 100000,
      location: 'Kenya',
      daysLeft: 30,
      image: projectImage,
    },
    {
      projectName: 'Education for All',
      charityName: 'Education Charity',
      status: 'Available',
      description: 'Ensuring access to education for children. What we should do is to help as many kids as possible.',
      category: 'Education',
      raised: 70000,
      goal: 80000,
      location: 'India',
      daysLeft: 45,
      image: projectImage,
    },
  ];

  return (
    <Box>
      <NavigationBar currentPage="/projects" />
      <PageBanner text="PROJECT" />
      {/* Add padding to the Container to ensure consistent edge spacing */}
      <Container sx={{ marginTop: 4, padding: '24px' }}>
        {/* The Grid container now uses consistent spacing and has a negative margin to offset padding */}
        <Grid 
          container 
          spacing={3} // This creates 24px of space between grid items (spacing of 3 = 24px in MUI)
          sx={{
            margin: '0 auto', // Center the grid
            width: '100%',
            // Add negative margins to counteract container padding
            marginLeft: '-24px',
            marginRight: '-24px',
          }}
        >
          {mockProjects.map((project, index) => (
            // Each Grid item will now have equal spacing
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center', // Center the card within its grid item
                padding: '24px', // Add padding to ensure consistent spacing
              }}
            >
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CharityProjectPage;