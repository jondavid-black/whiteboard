import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {/* Logo: SVG circle with W */}
          <Box
            data-testid="logo-placeholder"
            role="img"
            aria-label="Whiteboard logo"
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'white',
              borderRadius: '50%',
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#1976d2" />
              <text
                x="16"
                y="21"
                textAnchor="middle"
                fontSize="16"
                fill="white"
                fontFamily="Arial"
                fontWeight="bold"
              >
                W
              </text>
            </svg>
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: 'white', fontWeight: 'bold', letterSpacing: 2 }}
          >
            Whiteboard
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
