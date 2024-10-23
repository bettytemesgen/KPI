// // components/UserProfile.js

// import React, { useState, useEffect } from 'react';
// import { Box, IconButton, Avatar } from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import axios from 'axios';

// const UserProfile = () => {
//   const [image, setImage] = useState(null);
//   const [userId, setUserId] = useState(null); // To store user ID

//   useEffect(() => {
//     // Fetch the user ID and profile image from the server or session storage when the component mounts
//     const user = JSON.parse(sessionStorage.getItem('user'));
//     if (user) {
//       setUserId(user.id);
//       setImage(user.profileImage || 'https://via.placeholder.com/150'); // Use default image if none
//     }
//   }, []);

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         setImage(reader.result); // Update the image state

//         // Send the image data to the backend to save in the database
//         try {
//           const response = await axios.post('/api/user/updateProfileImage', {
//             userId,
//             image: reader.result, // This should be a base64 string
//           });
//           console.log('Profile image updated:', response.data);
//         } catch (error) {
//           console.error('Error updating profile image:', error);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Box sx={{ position: 'relative', display: 'inline-block' }}>
//       <input
//         accept="image/*"
//         style={{ display: 'none' }}
//         id="icon-button-file"
//         type="file"
//         onChange={handleImageChange}
//       />
//       <label htmlFor="icon-button-file">
//         <IconButton component="span">
//           <Avatar
//             alt="User Profile"
//             src={image} // Use the image state
//             sx={{
//               width: 56,
//               height: 56,
//               borderRadius: '50%',
//               border: '2px solid #fff',
//               boxShadow: 2,
//             }}
//           />
//           <PhotoCamera sx={{ position: 'absolute', bottom: 0, right: 0, color: '#fff' }} />
//         </IconButton>
//       </label>
//     </Box>
//   );
// };

// export default UserProfile;
// components/UserProfile.js

import React, { useState, useEffect } from 'react';
import { Box, IconButton, Avatar } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

const UserProfile = () => {
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null); // To store user ID

  useEffect(() => {
    // Fetch the user ID and profile image from the server or session storage when the component mounts
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setUserId(user.id);
      setImage(user.profileImage || 'https://via.placeholder.com/150'); // Use default image if none
    }
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImage(reader.result); // Update the image state

        // Send the image data to the backend to save in the database
        try {
          const response = await axios.post('/api/user/updateProfileImage', {
            userId,
            image: reader.result, // This should be a base64 string
          });
          
          // Update session storage with the new profile image
          const updatedUser = { ...JSON.parse(sessionStorage.getItem('user')), profileImage: reader.result };
          sessionStorage.setItem('user', JSON.stringify(updatedUser));

          console.log('Profile image updated:', response.data);
        } catch (error) {
          console.error('Error updating profile image:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        padding: 2, // Add padding
        borderRadius: 1, // Optional: rounded corners
      }}
    >
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="icon-button-file"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="icon-button-file">
        <IconButton component="span">
          <Avatar
            alt="User Profile"
            src={image} // Use the image state
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              border: '2px solid #fff',
              boxShadow: 2,
            }}
          />
          <PhotoCamera sx={{ position: 'absolute', bottom: 0, right: 0, color: '#fff' }} />
        </IconButton>
      </label>
    </Box>
  );
};

export default UserProfile;
