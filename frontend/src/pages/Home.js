import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Validate IP address (IPv4 and IPv6)
  const isValidIP = (ip) => {
    // IPv4 regex
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    // IPv6 regex (simplified)
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    
    if (!ip || ip.trim() === '') {
      return false;
    }

    // Check IPv4
    if (ipv4Regex.test(ip)) {
      const parts = ip.split('.');
      return parts.every(part => {
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255;
      });
    }
    
    // Check IPv6
    if (ipv6Regex.test(ip)) {
      return true;
    }
    
    return false;
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSearch = async () => {
    // Prevent multiple submissions
    if (loading) {
      return;
    }

    if (!searchValue.trim()) {
      setError('Please enter an IP address');
      return;
    }

    if (!isValidIP(searchValue.trim())) {
      setError('Please enter a valid IP address');
      return;
    }

    // Valid IP - proceed with search
    setError('');
    setLoading(true);
    
    try {
      console.log('Searching for IP:', searchValue);
      // TODO: Add actual search/API logic here
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Search completed!');
    } catch (err) {
      setError('Failed to fetch IP data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setError('');
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
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              error={!!error}
              helperText={error}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton size="small" onClick={handleSearch} disabled={loading}>
                      {loading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <Search sx={{ color: error ? '#d32f2f' : '#999' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: searchValue && !loading && (
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
                '& .MuiFormHelperText-root': {
                  backgroundColor: 'white',
                  margin: 0,
                  paddingLeft: 2,
                  paddingRight: 2,
                  paddingBottom: 1,
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

