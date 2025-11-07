import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  LocationOn,
  Search,
  Clear,
} from '@mui/icons-material';
import GeoDrawer from '../components/GeoDrawer';

function Home() {
  // Static data for display purposes only
  const userData = { name: 'John Doe' };
  const geoData = {
    ip: '8.8.8.8',
    city: 'Mountain View',
    region: 'California',
    country: 'US',
    loc: '37.4056,-122.0775',
    org: 'Google LLC',
    postal: '94043',
    timezone: 'America/Los_Angeles',
  };

  // Search state
  const [searchValue, setSearchValue] = useState('');

  const handleClearSearch = () => {
    setSearchValue('');
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: '60vw',
          height: '80vh',
          borderRadius: 3,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Map Area */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: '#e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <LocationOn sx={{ fontSize: 60, color: '#999', marginBottom: 1 }} />
            <Typography variant="h6" sx={{ color: '#999' }}>
              Map View
            </Typography>
            <Typography variant="body2" sx={{ color: '#999' }}>
              {geoData.loc}
            </Typography>
          </Box>
        </Box>

        {/* Floating Search Bar */}
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: 500,
            zIndex: 10,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <TextField
              fullWidth
              placeholder="Search IP address (e.g., 8.8.8.8)"
              variant="outlined"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#999' }} />
                  </InputAdornment>
                ),
                endAdornment: searchValue && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleClearSearch}>
                      <Clear sx={{ fontSize: 20 }} />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: 'white',
                  '& fieldset': {
                    border: 'none',
                  },
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  paddingRight: 1,
                },
              }}
            />
          </Paper>
        </Box>

        {/* Bottom Drawer */}
        <GeoDrawer geoData={geoData} />
      </Paper>
    </Box>
  );
}

export default Home;

