import React from 'react';
import { Grid, Container, Card, CardActionArea, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for current route
import charityImage from '../assets/charity.png';
import NavigationBar from '../components/navigationBar';
import DonationBanner from '../components/donationBanner';

// Import MUI Icons
import AssessmentIcon from '@mui/icons-material/Assessment';
import HistoryIcon from '@mui/icons-material/History';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';

const HomePage = () => {
  const navigate = useNavigate(); // React Router hook for navigation
  const location = useLocation(); // React Router hook to get the current route

  // Define the card data
  const cards = [
    {
      icon: AssessmentIcon,
      title: 'Project Management',
      description: 'You can find and manage your all projects here.',
      route: '/project-management',
    },
    {
      icon: HistoryIcon,
      title: 'History',
      description: 'You can find your all donations informations.',
      route: '/history',
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
      route: '/preference',
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
        }}
      >
        <Grid container spacing={6} justifyContent="center">
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              {/* Set xs=12 for full width on small screens and sm/md=6 for two cards per row */}
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: 2,
                  borderRadius: 2,
                  textAlign: 'center',
                  padding: 2,
                  margin: 'auto', // Center-align cards horizontally
                }}
              >
                <CardActionArea onClick={() => navigate(card.route)}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 2,
                    }}
                  >
                    <card.icon sx={{ fontSize: 48, color: '#FB1465' }} />
                  </Box>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                    {card.description}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
