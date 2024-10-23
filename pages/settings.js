import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Box, Text, FormLabel } from '@chakra-ui/react';

export default function SettingsPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/api/users/me');
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await axios.put('/api/users/update', { email, password });
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" py="8">
      <Text fontSize="3xl" fontWeight="bold" mb="6">
        Settings
      </Text>
      {message && <Text color="green.500" mb="4">{message}</Text>}
      <Box mb="4">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </Box>
      <Box mb="4">
        <FormLabel>New Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
        />
      </Box>
      <Button colorScheme="blue" onClick={handleUpdateProfile}>
        Update Profile
      </Button>
    </Box>
  );
}
