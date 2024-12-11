import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Pressable, TouchableOpacity, Modal } from "react-native";
import { useEmail } from "./DataContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { useFetchUserImageQuery } from '../../RTKBackend/ApiSlices/UploadImagesSlice';
import { useFetchUserInfoQuery } from "../../RTKBackend/ApiSlices/ProfileInfoSlice";
// import { useState } from "react";


const ProfileScreen = () => {
    const { email } = useEmail(); // Assuming you're using a context to fetch email
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const { data: userImage,  } = useFetchUserImageQuery(email, {
        refetchOnMountOrArgChange: true,
    });
     // Fetch user information from the backend
  const { data: userInfo, isFetching, isError } = useFetchUserInfoQuery(email, {
    refetchOnMountOrArgChange: true,
  });

  const { username, gender, dob, age, weight, height, blood } = userInfo?.profile || {};
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Back Arrow */}
            <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
                <Ionicons onPress={() => navigation.navigate('Home')} name="arrow-back" size={38} color="#0077cc" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.profileImageContainer}>
                <Image
                    source={userImage?.imageUrl ? { uri: userImage.imageUrl } : require('../images/user.png')}// Replace with actual image URL
                    style={styles.profileImage}
                />
            </TouchableOpacity>

            <Text style={styles.header}>User Profile</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Username:</Text>
                <Text style={styles.value}>{username || "N/A"}</Text>

                <Text style={styles.label}>Gender:</Text>
                <Text style={styles.value}>{gender || "N/A"}</Text>

                <Text style={styles.label}>Date of Birth:</Text>
                <Text style={styles.value}>{dob || "N/A"}</Text>

                <Text style={styles.label}>Age:</Text>
                <Text style={styles.value}>{age || "N/A"}</Text>

                <Text style={styles.label}>Weight(KG):</Text>
                <Text style={styles.value}>{weight || "N/A"}</Text>

                <Text style={styles.label}>Height(cm):</Text>
                <Text style={styles.value}>{height || "N/A"}</Text>

                <Text style={styles.label}>Blood Group:</Text>
                <Text style={styles.value}>{blood || "N/A"}</Text>

                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{email}</Text>
            </View>
            {/* Modal for Full-Screen Image */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Ionicons name="close" size={30} color="#fff" />
                    </Pressable>
                    <Image
                        source={userImage?.imageUrl ? { uri: userImage.imageUrl } : require('../images/user.png')}// Replace with actual image URL
                        style={styles.fullScreenImage}
                    />

                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#e9f5ff",
        alignItems: "center",
    },
    profileImageContainer: {
        marginBottom: 20,
        borderRadius: 75,
        overflow: "hidden",
        borderWidth: 2,
        marginTop: "10%",
        borderColor: "#0077cc",
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60, // Makes the image circular
        borderWidth: 3,
        borderColor: "#ccc",
        resizeMode: "cover",
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#0077cc",
        marginBottom: 20,
        textAlign: "center",
    },
    infoContainer: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    label: {
        fontSize: 18,
        fontWeight: "600",
        color: "#444444",
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        color: "#666666",
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#e6e6e6",
        paddingBottom: 5,
    },
    backArrow: {
        position: "absolute",
        top: 50,
        left: 15,

    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.9)", // Dark overlay
        justifyContent: "center",
        alignItems: "center",
    },
    fullScreenImage: {
        width: "90%",
        height: "70%",
        resizeMode: "contain", // Ensures the image fits within the screen
    },
    closeButton: {
        position: "absolute",
        top: 50,
        right: 20,
    },
});

export default ProfileScreen;