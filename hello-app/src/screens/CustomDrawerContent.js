import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Image, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useFetchUserImageQuery } from '../../RTKBackend/ApiSlices/UploadImagesSlice';
import { useEmail } from './DataContext';
import { useFetchNameQuery } from '../../RTKBackend/ApiSlices/RegisterApiSlice';




export default function CustomDrawerContent(props) {
  const { email } = useEmail();
  const { data: nameData } = useFetchNameQuery(email, {
    skip: !email,
  });
  const name = nameData?.name || "User";
  const { data: userImage, isFetching } = useFetchUserImageQuery(email, {
    refetchOnMountOrArgChange: true,
});
   
  return (
    <DrawerContentScrollView {...props}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.Profile}>
          <View style={styles.ProfileInfo}>
            <Image
             source={userImage?.imageUrl ? { uri: userImage.imageUrl } : require('../images/user.png')}
              style={styles.image_size_profile}
            />
             {isFetching && <Text>Loading...</Text>}
            <Text style={styles.ProfileInfotext1}>{name}</Text>
            <Text style={styles.ProfileInfotext2}>{email}</Text>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: "#6997DD",
    top: "-1%",
  },
  ProfileInfo: {
    height: "100%",
    alignItems: "center",
    top: "5%",
  },
  ProfileInfotext2: {
    color: "white",
    fontSize: 12,
  },
  ProfileInfotext1: {
    fontSize: 22,
    color: "white",
    fontWeight: "500",
  },
  image_size_profile: {
    resizeMode: "cover",
    width: "40%",
    borderRadius: 50,
    height: "40%",
    marginTop: "10%",
  },
});






// import React ,{useState,useEffect, useCallback } from 'react';
// import { View, StyleSheet, StatusBar, Image, Text,SafeAreaView ,Platform} from 'react-native';
// import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// import { useRoute,useFocusEffect } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// export default function CustomDrawerContent(props) {
  
//   const [imageUri, setImageUri] = useState(null); // State to hold the image URI

//      // Load image URI from AsyncStorage when drawer is opened
//      useEffect(() => {
//       const loadProfileImage = async () => {
//           try {
//               const storedImage = await AsyncStorage.getItem('profileImage');
//               if (storedImage) {
//                   setImageUri(storedImage);
//                   // console.log('Loaded Image URI:', storedImage); // Log the retrieved URI
//               } else {
//                   console.log('No image URI found in AsyncStorage');
//               }
//           } catch (error) {
//               console.error('Failed to load image URI:', error);
//           }
//       };

//       useFocusEffect(
//         useCallback(() => {
//           loadProfileImage();
//         }, [])

//       ));



//   return (
//     <DrawerContentScrollView {...props}>
  
//       <StatusBar barStyle="dark-content" />
//       <View style={styles.header}>
//         <View style={styles.Profile}>
//           <View style={styles.ProfileInfo}>
//             <Image style={styles.image_size_profile} 
//             source={imageUri ? { uri: imageUri } : require('../images/user.png')} 
//              onError={(error) => console.error('Image loading failed:', error)}
//             ></Image>
//             <Text style={styles.ProfileInfotext1}>Shaharyar</Text>
//             <Text style={styles.ProfileInfotext2}>shaharyar@gmail.com</Text>
//           </View>
//         </View>
//       </View>
//       <DrawerItemList {...props} />
//     </DrawerContentScrollView>
//   );
// }
// const styles = StyleSheet.create({
//   header: {
//     height: 200,
//     backgroundColor: "#6997DD",
//     top:"-1%"
//   },
//   ProfileInfo: {
//     height: "100%",
//     // backgroundColor: "pink",
//     alignItems: "center",
//     top:"5%"
//   },
//   ProfileInfotext2: {
//     color: "white",
//     fontSize: 12,

//   },
//   ProfileInfotext1: {
//     fontSize: 22,
//     color: "white",
//     fontWeight: "500"
//   },
//   // ProfileImage:{
  
//   // height:"100%"
//   // },
//   image_size_profile:{
//     resizeMode:"cover",
//     width:"40%",
//     borderRadius: 50,
//     height:"40%",
//     marginTop:"10%"
//   },
  

// });
