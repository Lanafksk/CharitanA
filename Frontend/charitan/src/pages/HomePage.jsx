import React from 'react';
import { Grid, Container, Card, CardActionArea, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for current route
import charityImage from '../assets/charity.png';
import NavigationBar from '../components/navigationBar';
import DonationBanner from '../components/donationBanner';
import PageTitle from '../components/pageTitle';
import TopProjectsDisplay from '../components/projects/topProjectsDisplay';


const HomePage = () => {
  const navigate = useNavigate(); // React Router hook for navigation
  const location = useLocation(); // React Router hook to get the current route


  return (
    <>
        <NavigationBar currentPage={location.pathname} />
        <DonationBanner imageSrc={charityImage} height="35vh" />
        <PageTitle 
          title="Featured Projects" 
          subtitle="Make a difference today by supporting these carefully causes"
        />
        <TopProjectsDisplay />
    </>
  );
};

export default HomePage;