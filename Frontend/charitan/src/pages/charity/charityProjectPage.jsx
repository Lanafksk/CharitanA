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
      <Container sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          {mockProjects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CharityProjectPage;