import { Box, Typography, Avatar, Tooltip, Popper, Paper, MenuItem, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, PersonOutline } from '@mui/icons-material';
import { useState } from 'react';
import { logOut } from '../utils/auth/logOut';

const WelcomeBox = ({ userName, imageUrl='https://via.placeholder.com/150' }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  const handleProfile = () => {
    const role = localStorage.getItem("role");
    if (role === "Charity") {
      navigate("/charity-profile");
    } else if (role === "Donor") {
      navigate("/donor-profile");
    }
    handleClose();
  };

  const handleLogout = () => {
    logOut(navigate);
    handleClose();
  };

  return (
    <Box>
      <Box 
        display="flex" 
        alignItems="center" 
        gap={1} 
        onClick={handleClick}
        sx={{ cursor: 'pointer' }}
      >
        <Typography variant="h6" sx={{ color: 'black', fontSize: '1rem' }}>
          Hi, {userName}
        </Typography>
        <Tooltip title="You have logged in!" arrow>
          <Avatar
            src={imageUrl}
            sx={{
              bgcolor: 'transparent',
              border: '1px solid black',
              color: 'black',
              width: 40,
              height: 40,
            }}
          />
        </Tooltip>
      </Box>

      <Popper 
        open={open} 
        anchorEl={anchorEl} 
        placement="bottom-start"
        sx={{ zIndex: 1300 }}
      >
        <Paper 
          elevation={3}
          sx={{ 
            mt: 1,
            minWidth: 200,
            borderRadius: 1,
          }}
        >
          <MenuItem onClick={handleProfile} sx={{ py: 1 }}>
            <ListItemIcon>
              <PersonOutline sx={{ color: '#1976d2' }} />
            </ListItemIcon>
            <Typography>Profile</Typography>
          </MenuItem>
          
          <MenuItem onClick={handleLogout} sx={{ py: 1 }}>
            <ListItemIcon>
              <LogoutOutlined sx={{ color: '#d32f2f' }} />
            </ListItemIcon>
            <Typography>Logout</Typography>
          </MenuItem>
        </Paper>
      </Popper>
    </Box>
  );
};

export default WelcomeBox;