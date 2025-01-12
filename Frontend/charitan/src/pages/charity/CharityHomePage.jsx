import React from 'react';
import { Grid, Container, Card, CardActionArea, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for current route
import charityImage from '../../assets/charity.png';
import NavigationBar from '../../components/navigationBar';
import DonationBanner from '../../components/donationBanner';
import CustomCard from '../../components/customCard';

// Import MUI Icons
import AssessmentIcon from '@mui/icons-material/Assessment';
import HistoryIcon from '@mui/icons-material/History';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';

const CharityHomePage = () => {
  const navigate = useNavigate(); // React Router hook for navigation
  const location = useLocation(); // React Router hook to get the current route

  // Define the card data
  const cards = [
    {
      icon: AssessmentIcon,
      title: 'Project Management',
      description: 'You can find and manage your all projects here.',
      route: '/projects',
    },
    {
      icon: HistoryIcon,
      title: 'History',
      description: 'You can find your all donations informations.',
      route: '/charity-history',
    },
    {
      icon: LeaderboardIcon,
      title: 'Leaderboard',
      description: 'The Top 10 Donors/Charities of the Month.',
      route: '/leaderboard',
    },
    {
      icon: SettingsIcon,
      title: 'Preference',
      description: 'You can find the System Settings here.',
      route: '/charity-profile',
    },
  ];

  return (
    <>
      {/* Pass the current route's pathname to NavigationBar */}
      <NavigationBar currentPage={location.pathname} />
      <DonationBanner imageSrc={charityImage} height="35vh" />
      <Container
        sx={{
          marginTop: 8, // Adjust top margin
          marginBottom: 16, // Adjust bottom margin
          marginLeft: 30, // Adjust left margin
        }}
      >
        <Grid container spacing={6} justifyContent="center">
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              {/* Set xs=12 for full width on small screens and sm/md=6 for two cards per row */}
              <CustomCard
                icon={card.icon}
                title={card.title}
                description={card.description}
                width={345}
                height={200}
                route={card.route}
                sx={{
                  margin: 'auto', // Center-align cards horizontally
                }}
                
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default CharityHomePage;