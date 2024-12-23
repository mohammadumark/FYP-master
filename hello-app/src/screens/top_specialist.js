import React, { useState, useEffect } from "react";
import { Text, View, Image, FlatList, ActivityIndicator, Alert, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // For the chat icon

export default function TopSpecialist({ navigation }) {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://192.168.137.1:5000/api/doctorss");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch doctors data.");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshDoctors = async () => {
    try {
      setIsRefreshing(true);
      await fetchDoctors();
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const openWhatsApp = (phoneNumber) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(whatsappUrl);
        } else {
          Alert.alert("Error", "WhatsApp is not installed or cannot open the URL.");
        }
      })
      .catch(() => Alert.alert("Error", "Failed to open WhatsApp."));
  };

  const renderDoctor = ({ item }) => (
    <TouchableOpacity
      style={styles.doctorCard}
      onPress={() => navigation.navigate("DoctorDetails", { doctorId: item._id })}
    >
      <Image
        style={styles.profilePicture}
        source={{
          uri: item.profilePicture
            ? `http://192.168.137.1:5000${item.profilePicture}`
            : "https://via.placeholder.com/64",
        }}
        onError={() => console.log(`Failed to load image for ${item.username}`)}
      />
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{item.username}</Text>
        <Text style={styles.doctorSpecialty}>{item.specialty || "Specialty not specified"}</Text>
      </View>
      <TouchableOpacity
        style={styles.chatIcon}
        onPress={() => openWhatsApp(item.phoneNumber)} // Use the phoneNumber from the API
      >
        <FontAwesome name="whatsapp" size={24} color="#25D366" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6997DD" />
        <Text>Loading doctors...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Doctors List</Text>
      </View>
      {/* Doctors List */}
      <FlatList
        data={doctors}
        keyExtractor={(item) => item._id}
        renderItem={renderDoctor}
        contentContainerStyle={styles.listContent}
        onRefresh={refreshDoctors}
        refreshing={isRefreshing}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No doctors available.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fafc",
  },
  topBar: {
    width: "100%",
    backgroundColor: "#6997DD",
    paddingVertical: 20,
    paddingHorizontal: 0,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  profilePicture: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  doctorInfo: {
    marginLeft: 16,
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3748",
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  chatIcon: {
    marginLeft: 16,
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyMessage: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 16,
  },
});
