import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      // Call login API
      const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8000').replace(/\/$/, '');
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Save token and user info to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to geo page
        navigate('/geo');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to connect to server. Make sure backend is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };
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
          <Box component="form" onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
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

            {/* Error Message */}
            {error && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error}
              </Alert>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
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
                '&:disabled': {
                  opacity: 0.6,
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
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

