import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography,
  Divider 
} from '@mui/material';

function Login() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        padding: 2,
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent sx={{ padding: 5 }}>
          {/* Title */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: '#667eea',
              fontWeight: 600,
              textAlign: 'center',
              marginBottom: 1,
            }}
          >
            IP Geolocation App
          </Typography>
          
          <Typography
            variant="h6"
            component="h2"
            sx={{
              color: '#333',
              textAlign: 'center',
              marginBottom: 4,
            }}
          >
            Login
          </Typography>

          {/* Login Form */}
          <Box component="form">
            {/* Email Field */}
            <Box sx={{ marginBottom: 2.5 }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#555',
                  fontWeight: 500,
                  marginBottom: 1,
                }}
              >
                Email
              </Typography>
              <TextField
                type="email"
                placeholder="Enter your email"
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                      borderWidth: 2,
                    },
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                }}
              />
            </Box>

            {/* Password Field */}
            <Box sx={{ marginBottom: 2.5 }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#555',
                  fontWeight: 500,
                  marginBottom: 1,
                }}
              >
                Password
              </Typography>
              <TextField
                type="password"
                placeholder="Enter your password"
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                      borderWidth: 2,
                    },
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                }}
              />
            </Box>

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                padding: 1.75,
                fontSize: 16,
                fontWeight: 600,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s',
                },
              }}
            >
              Login
            </Button>
          </Box>

          {/* Test Credentials */}
          <Divider sx={{ marginY: 3 }} />
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                fontSize: 13,
                marginBottom: 0.5,
              }}
            >
              <strong style={{ color: '#333' }}>Test Credentials:</strong>
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: 13 }}>
              Email: test@example.com
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: 13 }}>
              Password: password123
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;

