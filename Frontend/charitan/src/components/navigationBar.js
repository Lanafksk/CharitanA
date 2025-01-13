import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Grid } from '@mui/material';
import CharitanLogo from './charitanLogo';
import NavLink from './navLink';
import WelcomeBox from './welcomeBox';
import CustomButton from './button';
import { useNavigate } from 'react-router-dom';
import { fetchCharityProfile } from '../utils/api/profile/profileService';

const NavigationBar = ({ currentPage }) => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
      const fetchUserProfile = async () => {
        const charityId = localStorage.getItem('charityId');
        if (charityId) {
          try {
            const profileData = await fetchCharityProfile(charityId);
            setUserProfile(profileData);
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        }
      };

      fetchUserProfile();
    }, []);

    const handleSignIn = () => {
      navigate("/signin");
    };

    const handleSignUp = () => {
      navigate("/signup");
    };
    return (
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'white',
          border: '1px solid grey',
          boxShadow: 'none'
        }}
      >
        <Toolbar>
          <Grid container alignItems="center" direction="row" justifyContent="space-between">
              <Grid item sx={{ ml: 8, mr: 2 }}>
                  <CharitanLogo color="black" />
              </Grid>
              <Grid item sx={{ flexGrow: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, ml: 4 }}>
                      <NavLink href="/home" color="black" size="1rem" highlight={currentPage === '/home'}>
                          Home
                      </NavLink>
                      <NavLink href="/discovery" color="black" size="1rem" highlight={currentPage === '/discovery'}>
                          Discovery
                      </NavLink>
                      <NavLink href="/about-us" color="black" size="1rem" highlight={currentPage === '/about-us'}>
                          About Us
                      </NavLink>
                      <NavLink href="/leaderboard" color="black" size="1rem" highlight={currentPage === '/leaderboard'}>
                          Leaderboard
                      </NavLink>
                      <NavLink href="/donor-history" color="black" size="1rem" highlight={currentPage === '/donor-history'}>
                          History
                      </NavLink>
                  </Box>
              </Grid>
              <Grid item>
                {userProfile ? (
                  <WelcomeBox userName={userProfile.data.name} imageUrl={userProfile.data.imageUrl} />
                ) : (
                  <>
                    <CustomButton text="Sign In" backgroundColor="white" textColor="black" hoverColor="grey" disabledColor="#d3d3d3" onClick={handleSignIn} />
                    <CustomButton text="Sign Up" backgroundColor="#FB1465" hoverColor="#d93b63" disabledColor="#d3d3d3" onClick={handleSignUp} />
                  </>
                )}
              </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
}

export default NavigationBar;
