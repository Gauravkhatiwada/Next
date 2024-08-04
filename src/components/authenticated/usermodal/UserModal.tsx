"use client"
import Cookies from 'js-cookie';
import React, { useState, useEffect, MouseEvent } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
 import { getUserFromCookies } from '../../auth/token'; // Adjust the path as necessary
  const user = getUserFromCookies();

import axios from 'axios';

interface User {
  name: string;
  userType: string;
  imageUrl: string;
}

const UserModal: React.FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   // Fetch user data from the backend
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get('/api/user'); // Replace with your API endpoint
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
        Cookies.remove('user');
        console.log('User cookie has been cleared');
      ;
    router.push('/homepage');
  };
  const handleSetting = () => {
    router.push('/setting');
  };

  const openMenu = Boolean(anchorEl);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <div className="flex flex-col items-center justify-center">
        <Typography variant="h6" sx={{ mr: 2 }}>
          {user?.name || 'Loading...'}
        </Typography>
        <Typography variant="subtitle2" sx={{ mr: 2 }}>
          {user?.userType || 'Loading...'}
        </Typography>
      </div>
      <IconButton onClick={handleMenuClick}>
        {user?.imageUrl ? (
          <Avatar src={user.imageUrl} alt={user.username} />
        ) : (
          <AccountCircleIcon fontSize="large" />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleSetting}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserModal;
