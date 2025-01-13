import { Box, Typography, Avatar, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WelcomeBox = ({ userName, imageUrl='https://via.placeholder.com/150' }) => {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    const role = localStorage.getItem("role");
    console.log(role);
    if (role === "Charity") {
      navigate("/charity-profile");
    } else if (role === "Donor") {
      navigate("/donor-profile");
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {/* Welcome Message */}
      <Typography variant="h6" sx={{ color: 'black', fontSize: '1rem' }}>
        Hi, {userName}
      </Typography>

      {/* Avatar with Tooltip */}
      <Tooltip title="You have logged in!" arrow>
        <Avatar
          src={imageUrl}
          sx={{
            bgcolor: 'transparent',
            border: '1px solid black',
            color: 'black',
            width: 40,
            height: 40,
            cursor: 'pointer',
          }}
          onClick={handleAvatarClick}
        />
      </Tooltip>
    </Box>
  );
};

export default WelcomeBox;