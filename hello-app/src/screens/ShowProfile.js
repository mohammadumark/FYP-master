import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, Pressable, TextInput } from "react-native";
import { useEmail } from "./DataContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { useFetchUserImageQuery } from '../../RTKBackend/ApiSlices/UploadImagesSlice';
import { useFetchUserInfoQuery } from "../../RTKBackend/ApiSlices/ProfileInfoSlice";

const ProfileScreen = () => {
    const { email } = useEmail();
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const { data: userImage } = useFetchUserImageQuery(email, {
        refetchOnMountOrArgChange: true,
    });

    const { data: userInfo } = useFetchUserInfoQuery(email, {
        refetchOnMountOrArgChange: true,
    });

    const { username, gender, age, weight, height, blood } = userInfo?.profile || {};

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
            </View>

            {/* Back Arrow */}
            <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={38} color="#fff" />
            </TouchableOpacity>

            {/* Profile Image */}
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.profileImageContainer}>
                <Image
                    source={userImage?.imageUrl ? { uri: userImage.imageUrl } : require('../images/user.png')}
                    style={styles.profileImage}
                />
            </TouchableOpacity>

            {/* Username */}
            <View style={styles.nameContainer}>
                <Text style={styles.username}>{username || "User Name"}</Text>
            </View>

            {/* User Info */}
            <View style={styles.infoContainer}>
                {[
                    { label: "Gender", value: gender },
                    { label: "Age", value: age },
                    { label: "Weight (KG)", value: weight },
                    { label: "Height (cm)", value: height },
                    { label: "Blood Group", value: blood },
                    { label: "Email", value: email },
                ].map((item, index) => (
                    <View key={index} style={styles.infoRow}>
                        <Text style={styles.label}>{item.label}</Text>
                        <Text style={styles.value}>{item.value || "N/A"}</Text>
                    </View>
                ))}
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>

            {/* Modal for Full-Screen Image */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Ionicons name="close" size={30} color="#fff" />
                    </Pressable>
                    <Image
                        source={userImage?.imageUrl ? { uri: userImage.imageUrl } : require('../images/user.png')}
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
        paddingHorizontal: 0,
        paddingVertical: 30,
        backgroundColor: "#f9f9f9",
        alignItems: "center",
    },
    header: {
        width: "100%",
        backgroundColor: "#6997DD",
        paddingVertical: 20,
        paddingHorizontal: 0,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "700",
        color: "#fff",
    },
    backArrow: {
        position: "absolute",
        top: 50,
        left: 15,
    },
    profileImageContainer: {
        marginBottom: 20,
        borderRadius: 60,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "#0077cc",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: "cover",
    },
    nameContainer: {
        alignItems: "center",
        marginBottom: 15,
    },
    username: {
        fontSize: 24,
        fontWeight: "700",
        color: "#333",
    },
    infoContainer: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#444444",
        width: "40%",
    },
    value: {
        fontSize: 16,
        color: "#555555",
        width: "55%",
        textAlign: "right",
    },
    logoutButton: {
        backgroundColor: "#FF4C4C",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginTop: 20,
        marginBottom: 30,
    },
    logoutButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        justifyContent: "center",
        alignItems: "center",
    },
    fullScreenImage: {
        width: "90%",
        height: "80%",
        resizeMode: "contain",
    },
    closeButton: {
        position: "absolute",
        top: 40,
        right: 20,
    },
});

export default ProfileScreen;
