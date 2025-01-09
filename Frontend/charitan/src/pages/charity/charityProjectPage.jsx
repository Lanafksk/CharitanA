// CharityProjectPage.js
import React, { useState, useMemo } from 'react';
import { Box, Grid, Container } from '@mui/material';
import NavigationBar from '../../components/navigationBar';
import PageBanner from '../../components/pageBanner';
import ProjectCard from '../../components/projectCard';
import ProjectCarousel from '../../components/projectCarousel';
import SearchFilter from '../../components/searchFilter';
import projectImage from '../../assets/project.jpg';
import CreateProjectForm from '../../components/createProjectForm';

const CharityProjectPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    country: '',
    category: '',
    goal: '',
    status: ''
  });
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
    {
      projectName: 'Healthcare Access',
      charityName: 'Health Charity',
      status: 'Available',
      description: 'Providing healthcare services to underserved communities.',
      category: 'Health',
      raised: 30000,
      goal: 90000,
      location: 'Uganda',
      daysLeft: 60,
      image: projectImage,
    },
    {
      projectName: 'Food for All',
      charityName: 'Hunger Charity',
      status: 'Available',
      description: 'Distributing food to families in need.',
      category: 'Hunger',
      raised: 40000,
      goal: 70000,
      location: 'Ethiopia',
      daysLeft: 20,
      image: projectImage,
    },
    {
      projectName: 'Shelter for Homeless',
      charityName: 'Shelter Charity',
      status: 'Available',
      description: 'Providing shelter and support to homeless individuals.',
      category: 'Shelter',
      raised: 60000,
      goal: 120000,
      location: 'USA',
      daysLeft: 90,
      image: projectImage,
    },
    {
      projectName: 'Environmental Protection',
      charityName: 'Environment Charity',
      status: 'Available',
      description: 'Protecting the environment through various initiatives.',
      category: 'Environment',
      raised: 20000,
      goal: 50000,
      location: 'Brazil',
      daysLeft: 40,
      image: projectImage,
    },
  ];

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      // Search term filter
      const searchMatch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Apply filters
      const countryMatch = !activeFilters.country || project.location === activeFilters.country;
      const categoryMatch = !activeFilters.category || project.category === activeFilters.category;
      const statusMatch = !activeFilters.status || project.status === activeFilters.status;
      
      // Goal filter logic
      let goalMatch = true;
      if (activeFilters.goal) {
        const projectGoal = project.goal;
        switch (activeFilters.goal) {
          case 'Under $10,000':
            goalMatch = projectGoal < 10000;
            break;
          case '$10,000-$50,000':
            goalMatch = projectGoal >= 10000 && projectGoal <= 50000;
            break;
          case 'Over $50,000':
            goalMatch = projectGoal > 50000;
            break;
          default:
            goalMatch = true;
        }
      }

      return searchMatch && countryMatch && categoryMatch && statusMatch && goalMatch;
    });
  }, [mockProjects, searchTerm, activeFilters]);

  return (
    <Box>
      <NavigationBar currentPage="/projects" />
      <PageBanner text="PROJECT" />
      <Container sx={{ marginTop: 4, padding: '24px' }}>
        <SearchFilter
          onSearch={setSearchTerm}
          onFilter={setActiveFilters}
        />
        <ProjectCarousel>
          {filteredProjects.map((project, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '24px',
                flexShrink: 0
              }}
            >
              <ProjectCard {...project} />
            </Grid>
          ))}
        </ProjectCarousel>
      </Container>
      <CreateProjectForm/>
    </Box>
  );
};

export default CharityProjectPage;