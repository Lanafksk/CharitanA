import React from 'react';
import { Typography, Link as MuiLink } from '@mui/material';

const NavLink = ({ href, children, color = 'black', size = 'inherit', highlight = false }) => {
  return (
    <MuiLink
      href={href}
      underline="none"
      sx={{
        textDecoration: 'none',
        position: 'relative',
        color: color,
        fontWeight: 500,
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -2,
          left: 0,
          width: highlight ? '100%' : 0,
          height: 3,
          backgroundColor: '#FB1465',
          transition: 'width 0.1s ease-in-out',
        },
        '&:hover::after': {
          width: '100%',
        },
      }}
    >
      <Typography variant="button" sx={{ color: 'inherit', textTransform: 'none', fontSize: size }}>
        {children}
      </Typography>
    </MuiLink>
  );
};

export default NavLink;
