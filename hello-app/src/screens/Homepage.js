import { StyleSheet, Text, View, SafeAreaView, StatusBar,ScrollView, RefreshControl, Alert, Image, Platform, Pressable, ImageBackground } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Fontisto } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
// import { Zocial } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useProfileImage } from './ProfileImageUpdation';
import { useUploadImageMutation, useFetchUserImageQuery } from '../../RTKBackend/ApiSlices/UploadImagesSlice';
import { useEmail,useName } from './DataContext';
import { useFetchNameQuery } from '../../RTKBackend/ApiSlices/RegisterApiSlice';


export default function HomePage({ }) {
    const navigation = useNavigation();
    const { email } = useEmail();
    // const {name} =useName();
    const [refreshing, setRefreshing] = useState(false);
    // console.log(email);
    const [imageUri, setImageUri] = useState(null);
    const [uploadImage, { isLoading }] = useUploadImageMutation();
    // Use RTK Query to fetch name
    const { data: nameData, isError, error } = useFetchNameQuery(email, {
        skip: !email,
      });
    //   useEffect(() => {
    //     console.log("Email:", email);
    //     console.log("Name Data:", nameData);
    //   }, [email, nameData]);
      const name = nameData?.name || "User";
    //   console.log("name is",name);
  
    const { data: userImage, refetch, isLoading: isFetching } = useFetchUserImageQuery(email, {
        refetchOnMountOrArgChange: true,  // Automatically refetch on component mount or when email changes
    });

    useEffect(() => {
        if (userImage && userImage.imageUrl) {
            setImageUri(userImage.imageUrl);
        }
    }, [userImage]);

    // Function to pick an image from the library
    const pickImage = async () => {
        // Request permission to access media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log("Permission result:", permissionResult);

        if (permissionResult.granted === false) {
            alert("Permission to access gallery is required!");
            return;
        }
        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
            allowsEditing: true,
            quality: 1,
        });
        // Check if the user canceled the image picking
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            // console.log("Email before upload:", email);
            handleUpload(result.assets[0].uri);
        }
    };

    const handleUpload = async (uri) => {
        if (uri) {
            const uriParts = uri.split('.');
            const fileType = uriParts[uriParts.length - 1];

            const imageFile = {
                uri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            };
            console.log('FormData contents:');
            console.log('email:', email);
            console.log('imageFile:', imageFile);
            try {
                await uploadImage({ email, imageFile }).unwrap();
                Alert.alert('Image uploaded successfully');
                refetch();
            } catch (error) {
                console.log('Error uploading image:', error);
                Alert.alert('Error uploading image:', error.message);
            }
        } else {
            Alert.alert('No image to upload');
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        // Simulate a network request or data reload
        setTimeout(() => {
          setRefreshing(false);
        }, 1000); // 1 seconds
      };
    
    
    return (
        <ScrollView   refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}

            >
                <View style={styles.frame1} >
                    <View style={styles.main_header}>
                        <View>
                            <Ionicons onPress={() => navigation.openDrawer()} style={styles.header_menubar_size} name="menu" size={28} color="#FFFFFF" /></View>
                        <View style={styles.header_content}>
                            <Text style={styles.header_text_color} >LtVision</Text>
                        </View>
                        <View style={styles.header_content_image}>
                            <Image style={styles.image_size}
                                source={require('../images/logo.png')}></Image>
                        </View>

                    </View>
                    <View style={styles.profile_area}>
                        <Pressable style={{ width: '100%' }} onPress={pickImage}>
                            {/* Display image if available, otherwise fallback to default */}
                            <Image
                                source={imageUri ? { uri: imageUri } : require('../images/user.png')}
                                style={styles.image_size_profile}
                            />
                        </Pressable>
                        {/* Show uploading text while image is being uploaded */}
                        {isLoading && <Text>Uploading...</Text>}
                        
                        <View style={styles.profile_text}>
                            <Text style={styles.profile_text_color}> Hi,{name} </Text>
                            <Text style={styles.profile_text_color_second}>Hope you are doing well</Text>
                        </View>
                    </View>
                    {/* your quick action */}

                    <View style={styles.quick_action_text}>
                        <Text style={styles.quick_action_text_edit}>Your Quick Actions</Text>
                    </View>
                    <View style={styles.quick_actions_bars}>
                        <View style={styles.doctor_option}>
                            <View style={styles.doctor_image}>
                                <Image style={styles.doctor_image_size} source={require('../images/doctorpicture.png')}></Image>
                            </View>
                            <View>
                                <Text style={styles.doctor_option_text_one}> Dr.Owais</Text>
                                <Text style={styles.doctor_option_text_two}>Text Your Doctor </Text>
                            </View>
                        </View>
                        <View style={styles.appoint_option}>
                            <View style={styles.appoint_image}>
                                <Image style={styles.appoint_image_size} source={require('../images/appoint.png')}></Image>
                            </View>
                            <View>
                                <Text style={styles.doctor_option_text_one}> Request</Text>
                                <Text style={styles.appoint_option_text_two}>Appointment </Text>
                            </View>
                        </View>
                        <Pressable style={styles.appoint_option} onPress={() => navigation.navigate("specialists")}>
                            <View style={styles.appoint_image}>
                                <Image style={styles.appoint_image_size} source={require('../images/specialists.png')}></Image>
                            </View>
                            <View>
                                <Text style={styles.doctor_option_text_one}> Top Specialists</Text>
                                <Text style={styles.specialist_option_text_two}>select among best </Text>
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.liver_capacity}>
                        <View style={styles.liver_capacity_text_container}>
                            <Text style={styles.liver_capacity_text_one}>70</Text>
                        </View>
                        <View style={styles.liver_capacity_internal_text}>
                            <Text style={styles.liver_capacity_internal_text_h1}> Liver Capacity</Text>
                            <Text style={styles.liver_capacity_internal_text_h2}>Based on your </Text>
                            <Text style={styles.liver_capacity_internal_text_h3}>last test</Text>
                        </View>
                        <View>
                            <ImageBackground style={styles.liver_image} source={require("../images/liverdiary.png")} />
                        </View>
                    </View>
                    <View style={styles.bottom_menu}>
                        <View style={styles.home_bottom_menu}>
                            <Ionicons name="home-outline" size={24} color="white" />
                            <Text style={styles.home_bottom_menu_text}>Home</Text>
                        </View>
                        <Pressable onPress={() => navigation.navigate('Alert')} style={styles.home_bottom_menu}>
                            <AntDesign name="bells" size={24} color="white" />
                            <Text style={styles.home_bottom_menu_text}>Alerts</Text>
                        </Pressable>
                        <View style={styles.home_bottom_menu}>
                            <Fontisto name="email" size={28} color="white" />
                            <Text style={styles.chatbox_bottom_menu_text}>Chat</Text>
                        </View>
                        <View style={styles.home_bottom_menu}>
                            <AntDesign name="calendar" size={24} color="white" />
                            <Text style={styles.home_bottom_menu_text}>Appointment</Text>
                        </View>
                        <View style={styles.home_bottom_menu}>
                            <Ionicons name="person-circle-outline" size={28} color="white" />
                            <Text style={styles.chatbox_bottom_menu_text}>Home</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    frame1: {
        backgroundColor: "#F9F9F9",
        // backgroundColor: "pink",
        height: "100%",
    },
    header_content: {
        backgroundColor: "#6997DD",
        width: "45%",
        alignItems: "flex-end",
        justifyContent: "center"
    },
    main_header: {
        width: "100%",
        backgroundColor: "#6997DD",
        flexDirection: "row",
        // marginTop:36,
        height: 53,
    },
    header_content_image: {
        width: "12%",
        paddingStart: 10,
        alignItems: "flex-start",
        justifyContent: "center"
    },
    image_size: {
        width: "100%",
        height: 50,
    },
    header_menubar_size: {
        paddingStart: 20,
        paddingTop: 12,
    },
    header_text_color: {
        color: "#FFFFFF",
        fontSize: 18,
    },
    profile_area: {
        height: 134,
        backgroundColor: "#6997DD",
        marginTop: 20,
        width: '100%',
    },
    image_size_profile: {
        resizeMode: "cover",
        height: 60,
        width: 60,
        borderRadius: 30,
        marginTop: 10,
        marginLeft: 32,
        paddingLeft: 10,
    },
    profile_text: {
        marginLeft: 35,
        marginTop: 7
    },
    profile_text_color: {
        fontSize: 18,
        color: "#F9F9F9"
    },
    profile_text_color_second: {
        fontSize: 12,
        marginLeft: 6,
        fontWeight: "300",
        color: "#F6EEEE"
    },
    // quick
    quick_action_text: {
        marginLeft: 35,
        marginTop: 30
    },
    quick_action_text_edit: {
        fontSize: 16,
        fontWeight: "bold"
    },
    quick_actions_bars: {
        flexDirection: "row"
    },
    doctor_option: {
        width: 85,
        height: 180,
        backgroundColor: "#FFFFFF",
        marginLeft: 25,
        marginTop: 20,
        borderRadius: 60,
    },
    doctor_image: {
        width: "100%",
        marginLeft: 7,
    },
    doctor_image_size: {
        height: 100,
        width: "100%",
        resizeMode: "contain",
    },
    doctor_option_text_one: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: "600"
    },
    doctor_option_text_two: {
        textAlign: "center",
        fontSize: 10,
        color: "#727272",
        fontWeight: "600"
    },
    appoint_option: {
        width: 85,
        height: 180,
        backgroundColor: "#FFFFFF",
        marginLeft: 25,
        marginTop: 20,
        borderRadius: 60,
    },
    appoint_image: {
        width: "100%",
        height: 100,
        marginLeft: 11,
        paddingTop: 6
    },
    appoint_image_size: {
        height: 100,
        width: "74%",
        resizeMode: "contain",
    },
    appoint_option_text_two: {
        textAlign: "center",
        fontSize: 10,
        color: "#727272",
        fontWeight: "600",
        marginLeft: 3
    },
    specialist_option_text_two: {
        textAlign: "center",
        fontSize: 10,
        color: "#727272",
        fontWeight: "600",
        marginLeft: 3,
        paddingBottom: 10
    },
    liver_capacity_text_container: {
        height: 45,
        width: 45,
        marginLeft: 18,
        marginTop: 18,
        alignItems: "center",
        borderRadius: 100,
        justifyContent: "center",
        backgroundColor: "#F24E1E"

    },
    liver_capacity: {
        width: "85%",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        marginLeft: 23,
        borderRadius: 30,
        marginTop: 35,
        height: 120
    },
    liver_capacity_text_one: {

        color: "white",
        fontWeight: "bold",
        fontSize: 18
    },
    liver_capacity_internal_text: {
        marginLeft: 20,
        marginTop: 25,
    },
    liver_capacity_internal_text_h1: {
        fontSize: 14,
        fontWeight: "600",
        color: "#F24E1E"
    },
    liver_capacity_internal_text_h2: {
        fontSize: 12,
        fontWeight: "500",
        paddingTop: 6,
        paddingLeft: 4,
        color: "#F24E1E"

    },
    liver_capacity_internal_text_h3: {
        fontSize: 12,
        fontWeight: "500",
        paddingLeft: 4,
        color: "#F24E1E"

    },
    liver_image: {
        width: 80,
        height: 80,
        marginLeft: 15,
        marginTop: 18,
        resizeMode: "contain"
    },
    bottom_menu: {
        backgroundColor: "#6997DD",
        height: 52,
        flexDirection: "row",
        marginTop: 55,
    },
    home_bottom_menu: {
        width: "20%",
        height: 52,
        paddingTop: 4,
        // backgroundColor:"red",
        alignItems: "center",
        justifyContent: "center"
    },
    home_bottom_menu_text: {
        fontSize: 10,
        paddingTop: 4,
        color: "white",
        fontWeight: "600"
    },
    chatbox_bottom_menu_text: {
        fontSize: 10,
        color: "white",
        fontWeight: "600"
    },
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Adjust padding for Android

    },
});