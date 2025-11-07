import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Fade,
  Divider,
  Drawer,
  Button,
} from '@mui/material';
import {
  LocationOn,
  Search,
  Clear,
  History,
  Delete,
  ChevronRight,
  Close,
  Logout,
  CheckBox,
  CheckBoxOutlineBlank,
} from '@mui/icons-material';
import GeoDrawer from '../components/GeoDrawer';
import MapView from '../components/MapView';

function Home() {
  const navigate = useNavigate();
  
  // Get user data from localStorage
  const [userData, setUserData] = useState(null);

  // Load user data on mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        setUserData(JSON.parse(user));
      } catch (err) {
        console.error('Failed to load user data:', err);
      }
    }
  }, []);

  // Search state
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [geoData, setGeoData] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  
  const searchRef = useRef(null);

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('ipSearchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.error('Failed to load search history:', err);
      }
    }
  }, []);

  // Fetch user's current IP geolocation on mount
  useEffect(() => {
    const fetchCurrentIPLocation = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        setGeoData(data);
      } catch (err) {
        console.error('Failed to fetch current location:', err);
        setError('Failed to load current location');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchCurrentIPLocation();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    
    // Hide dropdown when user starts typing
    if (showDropdown) {
      setShowDropdown(false);
    }
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const saveToHistory = (ip) => {
    const newHistory = [
      {
        ip: ip,
        timestamp: new Date().toISOString(),
      },
      ...searchHistory.filter(item => item.ip !== ip), // Remove duplicate
    ].slice(0, 10); // Keep only last 10 searches

    setSearchHistory(newHistory);
    localStorage.setItem('ipSearchHistory', JSON.stringify(newHistory));
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
    setShowDropdown(false);
    
    try {
      const ip = searchValue.trim();
      console.log('Searching for IP:', ip);
      
      // Fetch geolocation data from ipinfo.io
      const response = await fetch(`https://ipinfo.io/${ip}/json`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch IP data');
      }
      
      const data = await response.json();
      
      // Check if IP was found
      if (data.bogon) {
        setError('This IP address is a private/bogon IP and has no geolocation data');
        return;
      }
      
      setGeoData(data);
      console.log('Search completed!', data);
      
      // Save to history on successful search
      saveToHistory(ip);
    } catch (err) {
      console.error('API Error:', err);
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

  const handleClearSearch = async () => {
    setSearchValue('');
    setError('');
    
    // Fetch current IP location again
    setLoading(true);
    try {
      const response = await fetch('https://ipinfo.io/json');
      const data = await response.json();
      setGeoData(data);
    } catch (err) {
      console.error('Failed to fetch current location:', err);
      setError('Failed to load current location');
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = () => {
    if (searchHistory.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleHistoryItemClick = async (ip) => {
    setSearchValue(ip);
    setShowDropdown(false);
    
    // Fetch the IP data
    setLoading(true);
    try {
      const response = await fetch(`https://ipinfo.io/${ip}/json`);
      if (response.ok) {
        const data = await response.json();
        setGeoData(data);
      }
    } catch (err) {
      console.error('Failed to fetch IP data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistoryItem = (ip, e) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter(item => item.ip !== ip);
    setSearchHistory(newHistory);
    localStorage.setItem('ipSearchHistory', JSON.stringify(newHistory));
    // Remove from selected items if it was selected
    setSelectedItems(selectedItems.filter(item => item !== ip));
  };

  const handleClearAllHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('ipSearchHistory');
    setShowDropdown(false);
    setDrawerOpen(false);
    setSelectedItems([]);
  };

  const handleToggleSelect = (ip) => {
    if (selectedItems.includes(ip)) {
      setSelectedItems(selectedItems.filter(item => item !== ip));
    } else {
      setSelectedItems([...selectedItems, ip]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === searchHistory.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(searchHistory.map(item => item.ip));
    }
  };

  const handleDeleteSelected = () => {
    const newHistory = searchHistory.filter(item => !selectedItems.includes(item.ip));
    setSearchHistory(newHistory);
    localStorage.setItem('ipSearchHistory', JSON.stringify(newHistory));
    setSelectedItems([]);
  };

  const handleOpenDrawer = () => {
    setShowDropdown(false);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedItems([]);
  };

  const handleDrawerHistoryClick = async (ip) => {
    setSearchValue(ip);
    setDrawerOpen(false);
    
    // Fetch the IP data
    setLoading(true);
    try {
      const response = await fetch(`https://ipinfo.io/${ip}/json`);
      if (response.ok) {
        const data = await response.json();
        setGeoData(data);
      }
    } catch (err) {
      console.error('Failed to fetch IP data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: 0, md: 2 },
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: { xs: '100vw', md: '60vw' },
          height: { xs: '100vh', md: '80vh' },
          borderRadius: { xs: 0, md: 3 },
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
          {initialLoading ? (
            <Box sx={{ textAlign: 'center', zIndex: 1 }}>
              <CircularProgress size={60} sx={{ color: '#999', marginBottom: 2 }} />
              <Typography variant="body2" sx={{ color: '#999' }}>
                Loading location...
              </Typography>
            </Box>
          ) : geoData && geoData.loc ? (
            <MapView geoData={geoData} />
          ) : (
            <Box sx={{ textAlign: 'center', zIndex: 1 }}>
              <LocationOn sx={{ fontSize: 60, color: '#999', marginBottom: 1 }} />
              <Typography variant="h6" sx={{ color: '#999' }}>
                No location data
              </Typography>
            </Box>
          )}
        </Box>

        {/* Logout Button */}
        <IconButton
          onClick={handleLogout}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 1001,
            backgroundColor: 'white',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#ff6b6b',
              color: 'white',
            },
          }}
        >
          <Logout />
        </IconButton>

        {/* Floating Search Bar */}
        <Box
          ref={searchRef}
          sx={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: 500,
            zIndex: 1001,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              borderRadius: 3,
              overflow: showDropdown ? 'visible' : 'hidden',
              zIndex: 1000,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search IP address (e.g., 8.8.8.8)"
              variant="outlined"
              value={searchValue}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              onFocus={handleFocus}
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

            {/* Search History Dropdown */}
            <Fade in={showDropdown}>
              <Paper
                elevation={3}
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: 1,
                  maxHeight: 300,
                  overflowY: 'auto',
                  borderRadius: 2,
                  display: showDropdown ? 'block' : 'none',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  <Typography variant="caption" sx={{ color: '#999', fontWeight: 600 }}>
                    RECENT SEARCHES
                  </Typography>
                  {searchHistory.length > 0 && (
                    <IconButton size="small" onClick={handleClearAllHistory}>
                      <Delete sx={{ fontSize: 16, color: '#999' }} />
                    </IconButton>
                  )}
                </Box>

                {searchHistory.length > 0 ? (
                  <>
                    <List sx={{ padding: 0 }}>
                      {searchHistory.slice(0, 2).map((item, index) => (
                        <React.Fragment key={item.ip}>
                          <ListItemButton
                            onClick={() => handleHistoryItemClick(item.ip)}
                            sx={{
                              padding: '12px 16px',
                              '&:hover': {
                                backgroundColor: '#f5f5f5',
                              },
                            }}
                          >
                            <History sx={{ fontSize: 18, color: '#999', marginRight: 1.5 }} />
                            <ListItemText
                              primary={item.ip}
                              secondary={new Date(item.timestamp).toLocaleString()}
                              primaryTypographyProps={{
                                fontSize: 14,
                                fontWeight: 500,
                              }}
                              secondaryTypographyProps={{
                                fontSize: 11,
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={(e) => handleDeleteHistoryItem(item.ip, e)}
                              sx={{ marginLeft: 1 }}
                            >
                              <Clear sx={{ fontSize: 16 }} />
                            </IconButton>
                          </ListItemButton>
                          {index < 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                    
                    {/* See All Link */}
                    {searchHistory.length > 2 && (
                      <>
                        <Divider />
                        <ListItemButton
                          onClick={handleOpenDrawer}
                          sx={{
                            padding: '10px 16px',
                            justifyContent: 'center',
                            '&:hover': {
                              backgroundColor: '#f5f5f5',
                            },
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#667eea',
                              fontWeight: 600,
                              fontSize: 13,
                            }}
                          >
                            See search history
                          </Typography>
                          <ChevronRight sx={{ fontSize: 18, color: '#667eea', marginLeft: 0.5 }} />
                        </ListItemButton>
                      </>
                    )}
                  </>
                ) : (
                  <Box sx={{ padding: 3, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#999' }}>
                      No search history yet
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Fade>
          </Paper>
        </Box>

        {/* Bottom Drawer */}
        {geoData && <GeoDrawer geoData={geoData} />}
      </Paper>

      {/* History Drawer (Slides from right) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
          },
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Drawer Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 2.5,
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Search History
              </Typography>
              {searchHistory.length > 0 && (
                <Typography variant="caption" sx={{ color: '#999' }}>
                  ({searchHistory.length})
                </Typography>
              )}
            </Box>
            <IconButton onClick={handleCloseDrawer}>
              <Close />
            </IconButton>
          </Box>

          {/* Select All / Delete Selected Bar */}
          {searchHistory.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 16px',
                backgroundColor: '#f9f9f9',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <Button
                size="small"
                startIcon={selectedItems.length === searchHistory.length ? <CheckBox /> : <CheckBoxOutlineBlank />}
                onClick={handleSelectAll}
                sx={{ textTransform: 'none', color: '#667eea', fontWeight: 600 }}
              >
                {selectedItems.length === searchHistory.length ? 'Deselect All' : 'Select All'}
              </Button>
              {selectedItems.length > 0 && (
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Delete />}
                  onClick={handleDeleteSelected}
                  sx={{
                    backgroundColor: '#ff6b6b',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#ff5252',
                    },
                  }}
                >
                  Delete ({selectedItems.length})
                </Button>
              )}
            </Box>
          )}

          {/* Drawer Content */}
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {searchHistory.length > 0 ? (
              <List sx={{ padding: 0 }}>
                {searchHistory.map((item, index) => (
                  <React.Fragment key={item.ip}>
                    <ListItem
                      sx={{
                        padding: 0,
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          padding: '12px 16px',
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleToggleSelect(item.ip)}
                          sx={{ marginRight: 1 }}
                        >
                          {selectedItems.includes(item.ip) ? (
                            <CheckBox sx={{ fontSize: 20, color: '#667eea' }} />
                          ) : (
                            <CheckBoxOutlineBlank sx={{ fontSize: 20, color: '#999' }} />
                          )}
                        </IconButton>
                        <Box
                          onClick={() => handleDrawerHistoryClick(item.ip)}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flex: 1,
                            cursor: 'pointer',
                          }}
                        >
                          <History sx={{ fontSize: 20, color: '#999', marginRight: 2 }} />
                          <ListItemText
                            primary={item.ip}
                            secondary={new Date(item.timestamp).toLocaleString()}
                            primaryTypographyProps={{
                              fontSize: 15,
                              fontWeight: 600,
                            }}
                            secondaryTypographyProps={{
                              fontSize: 12,
                            }}
                          />
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => handleDeleteHistoryItem(item.ip, e)}
                          sx={{ marginLeft: 1 }}
                        >
                          <Delete sx={{ fontSize: 18, color: '#ff6b6b' }} />
                        </IconButton>
                      </Box>
                    </ListItem>
                    {index < searchHistory.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  padding: 4,
                }}
              >
                <History sx={{ fontSize: 60, color: '#ddd', marginBottom: 2 }} />
                <Typography variant="body1" sx={{ color: '#999', textAlign: 'center' }}>
                  No search history yet
                </Typography>
              </Box>
            )}
          </Box>

          {/* Drawer Footer */}
          {searchHistory.length > 0 && (
            <Box
              sx={{
                padding: 2,
                borderTop: '1px solid #f0f0f0',
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={handleClearAllHistory}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Clear All History
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}

export default Home;

