import React from 'react';
import { AppBar, Toolbar, Box, Grid } from '@mui/material';
import CharitanLogo from './charitanLogo';
import NavLink from './navLink';
import WelcomeBox from './welcomeBox';

const NavigationBar = () => {
    return (
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'white',
          border: '1px solid grey', // Black border surrounding the navigation bar
          boxShadow: 'none', // Removes default AppBar shadow, adjust as needed
        }}
      >
        <Toolbar>
          <Grid container alignItems="center" direction="row" justifyContent="space-between">
              <Grid item sx={{ ml: 8, mr: 2 }}>
                  <CharitanLogo color="black"/>
              </Grid>
              <Grid item sx={{ flexGrow: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, ml: 4 }}> {/* Adjust the margin-left value as needed */}
                      <NavLink href="/home" color="black" size="1.2rem">Home</NavLink>
                      <NavLink href="/discovery" color="black" size="1.2rem">Discovery</NavLink>
                      <NavLink href="/about-us" color="black" size="1.2rem">About Us</NavLink>
                      <NavLink href="/leaderboard" color="black" size="1.2rem">Leaderboard</NavLink>
                      <NavLink href="/history" color="black" size="1.2rem">History</NavLink>
                  </Box>
              </Grid>
              <Grid item>
                  <WelcomeBox userName="Nam"/>
              </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
}

export default NavigationBar;
