import React, { useState, useMemo, useEffect } from 'react';
import { Box, Grid, Container, CircularProgress } from '@mui/material';
import NavigationBar from '../../components/navigationBar';
import PageBanner from '../../components/pageBanner';
import SearchFilter from '../../components/searchFilter';
import PageTitle from '../../components/pageTitle';
import ProjectDiscovery from '../../components/projects/projectDiscovery';
import { fetchProjects } from '../../utils/api/projects/projectService'

const ProjectDiscoveryPage = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    country: '',
    category: '',
    goal: '',
    status: ''
  });
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from API
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error loading projects:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filter projects based on search term and active filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Search term filter
      const searchMatch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Apply filters
      const countryMatch = !activeFilters.country || project.country === activeFilters.country;
      const categoryMatch = !activeFilters.category || project.category === activeFilters.category;
      const statusMatch = !activeFilters.status || project.status.toLowerCase() === activeFilters.status.toLowerCase();
      
      // Goal filter logic
      let goalMatch = true;
      if (activeFilters.goal) {
        const projectGoal = project.target_amount;
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
  }, [projects, searchTerm, activeFilters]);

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: 'error.main'
      }}>
        Error loading projects: {error}
      </Box>
    );
  }

  return (
    <Box>
      <NavigationBar currentPage="/discovery" />
      <PageBanner text="DISCOVERY" />
      <Container sx={{ marginTop: 4, padding: '24px' }}>
        <SearchFilter
          onSearch={setSearchTerm}
          onFilter={setActiveFilters}
          hasResults={filteredProjects.length > 0}
          isDiscovery={true}
        />

        <PageTitle 
          title="Projects" 
          subtitle="Make a difference today by supporting these carefully curated causes"
        />
       
        <ProjectDiscovery 
          projects={filteredProjects}
          itemsPerPage={3}
          rowSpacing={8} 
        />
      </Container>
    </Box>
  );
};

export default ProjectDiscoveryPage;