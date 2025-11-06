import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  LocationCity,
  Map,
  Flag,
  MarkunreadMailbox,
  AccessTime,
  MyLocation,
} from '@mui/icons-material';

function GeoDrawer({ geoData }) {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {/* Drawer Handle */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 1,
          cursor: 'pointer',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
        onClick={toggleDrawer}
      >
        <Box
          sx={{
            width: 40,
            height: 4,
            backgroundColor: '#ddd',
            borderRadius: 2,
            marginRight: 2,
          }}
        />
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666' }}>
          Location Details
        </Typography>
        <IconButton size="small" sx={{ marginLeft: 1 }}>
          {drawerOpen ? <ExpandMore /> : <ExpandLess />}
        </IconButton>
      </Box>

      {/* Drawer Content */}
      <Collapse in={drawerOpen}>
        <Box sx={{ padding: 3, maxHeight: '60vh', overflowY: 'auto' }}>
          <Grid container spacing={3}>
            {/* Geo Location Details - 2 Columns */}
            <Grid item xs={12}>
              <Box>
                {/* IP Address */}
                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="caption" sx={{ color: '#999', fontSize: 10 }}>
                    IP ADDRESS
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', fontSize: 18 }}>
                    {geoData.ip}
                  </Typography>
                </Box>

                {/* Geo Details in 2 Columns */}
                <Grid container spacing={2}>
                  {/* Column 1 */}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                        <LocationCity sx={{ fontSize: 16, color: '#999' }} />
                        <Typography variant="body2" sx={{ color: '#333', fontSize: 13 }}>
                          {geoData.city}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                        <Map sx={{ fontSize: 16, color: '#999' }} />
                        <Typography variant="body2" sx={{ color: '#333', fontSize: 13 }}>
                          {geoData.region}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, padding: '8px 0' }}>
                        <Flag sx={{ fontSize: 16, color: '#999' }} />
                        <Typography variant="body2" sx={{ color: '#333', fontSize: 13 }}>
                          {geoData.country}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Column 2 */}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                        <MarkunreadMailbox sx={{ fontSize: 16, color: '#999' }} />
                        <Typography variant="body2" sx={{ color: '#333', fontSize: 13 }}>
                          {geoData.postal}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                        <MyLocation sx={{ fontSize: 16, color: '#999' }} />
                        <Typography variant="body2" sx={{ color: '#333', fontSize: 12 }}>
                          {geoData.loc}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, padding: '8px 0' }}>
                        <AccessTime sx={{ fontSize: 16, color: '#999' }} />
                        <Typography variant="body2" sx={{ color: '#333', fontSize: 12 }}>
                          {geoData.timezone}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Box>
  );
}

export default GeoDrawer;

