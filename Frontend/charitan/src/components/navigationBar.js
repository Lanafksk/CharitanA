import React from 'react';
import { AppBar, Toolbar, Box, Grid } from '@mui/material';
import CharitanLogo from './charitanLogo';
import NavLink from './navLink';
import WelcomeBox from './welcomeBox';
import CustomButton from './button';

const NavigationBar = ({ currentPage }) => {
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
                      <NavLink href="/history" color="black" size="1rem" highlight={currentPage === '/history'}>
                          History
                      </NavLink>
                  </Box>
              </Grid>
            <Grid item>
                {/* <WelcomeBox userName="Nam" /> */}
                <CustomButton text="Sign In" backgroundColor="white" textColor="black" hoverColor="grey" disabledColor="#d3d3d3" />
                <CustomButton text="Sign Up" backgroundColor="#FB1465" hoverColor="#d93b63" disabledColor="#d3d3d3" />
            </Grid> 
          </Grid>
        </Toolbar>
      </AppBar>
    );
}

export default NavigationBar;
