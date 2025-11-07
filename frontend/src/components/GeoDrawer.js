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
        zIndex: 1000,
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
            height: 1,
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
          <Box sx={{ padding: { xs: 2, md: 3 }, maxHeight: '60vh', overflowY: 'auto' }}>
            {/* IP Address */}
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="caption" sx={{ color: '#999', fontSize: 10 }}>
                IP ADDRESS
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', fontSize: { xs: 16, md: 18 } }}>
                {geoData.ip}
              </Typography>
            </Box>

            {/* Geo Details - Responsive Layout */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 0, md: 3 },
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <LocationCity sx={{ fontSize: 18, color: '#999' }} />
                <Typography variant="body2" sx={{ color: '#333', fontSize: 14, fontWeight: 500 }}>
                  {geoData.city}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <Map sx={{ fontSize: 18, color: '#999' }} />
                <Typography variant="body2" sx={{ color: '#333', fontSize: 14, fontWeight: 500 }}>
                  {geoData.region}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <Flag sx={{ fontSize: 18, color: '#999' }} />
                <Typography variant="body2" sx={{ color: '#333', fontSize: 14, fontWeight: 500 }}>
                  {geoData.country}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <MarkunreadMailbox sx={{ fontSize: 18, color: '#999' }} />
                <Typography variant="body2" sx={{ color: '#333', fontSize: 14, fontWeight: 500 }}>
                  {geoData.postal}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <MyLocation sx={{ fontSize: 18, color: '#999' }} />
                <Typography variant="body2" sx={{ color: '#333', fontSize: 13, fontWeight: 500 }}>
                  {geoData.loc}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, padding: '10px 0', borderBottom: { xs: 'none', md: '1px solid #f0f0f0' } }}>
                <AccessTime sx={{ fontSize: 18, color: '#999' }} />
                <Typography variant="body2" sx={{ color: '#333', fontSize: 13, fontWeight: 500 }}>
                  {geoData.timezone}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Collapse>
    </Box>
  );
}

export default GeoDrawer;

