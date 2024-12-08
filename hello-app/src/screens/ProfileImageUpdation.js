// import React, { createContext, useState, useEffect, useContext } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ProfileImageContext = createContext();

// export const ProfileImageProvider = ({ children }) => {
//   const [imageUri, setImageUri] = useState(null);

//   const loadImage = async () => {
//     try {
//       const storedImage = await AsyncStorage.getItem('profileImage');
//       if (storedImage) setImageUri(storedImage);
//     } catch (error) {
//       console.error('Failed to load image URI:', error);
//     }
//   };
//   const updateImage = async (newUri) => {
//     try {
//       await AsyncStorage.setItem('profileImage', newUri);
//       setImageUri(newUri);
//     } catch (error) {
//       console.error('Failed to save image URI:', error);
//     }
//   };

//   useEffect(() => {
//     loadImage();
//   }, []);

//   return (
//     <ProfileImageContext.Provider value={{ imageUri, updateImage }}>
//       {children}
//     </ProfileImageContext.Provider>
//   );
// };

// export const useProfileImage = () => useContext(ProfileImageContext);

// // 