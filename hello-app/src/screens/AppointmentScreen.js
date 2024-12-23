import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useEmail } from './DataContext';

const AppointmentScreen = ({ route, navigation }) => {
  const { doctorId, selectedDate, selectedTime, selectedDay } = route.params;
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [patientId, setPatientId] = useState("current_patient_id"); // Replace with actual patient ID logic
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch doctor details from the API
  const fetchDoctorDetails = async (doctorId) => {
    try {
      const response = await fetch(
        `http://192.168.137.1:5000/api/doctorss/${doctorId}`
      );
      const data = await response.json();
      setDoctorDetails(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch doctor details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) {
      fetchDoctorDetails(doctorId);
    }
  }, [doctorId]);

  const { email } = useEmail(); // Fetch the user's email

  const handleAppointmentRequest = async () => {
    const appointmentData = {
      name,
      doctorName: doctorDetails?.username || "Unknown",
      doctorId: doctorDetails?._id,
      date: selectedDate,
      time: selectedTime,
      location: location || doctorDetails?.hospitalName || "Unknown",
      message,
      patientId,
      email, // Add email to appointment data
    };
  
    try {
      const response = await fetch("http://192.168.137.1:5001/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.statusText} - ${errorText}`);
      }
  
      const data = await response.json();
      Alert.alert("Success", "Appointment created successfully!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"), // Navigate to Homepage
        },
      ]);
    } catch (error) {
      console.error("Error creating appointment:", error);
      Alert.alert("Error", `Failed to create appointment: ${error.message}`);
    }
  };
  
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text>Loading doctor details...</Text>
      </View>
    );
  }

  if (!doctorDetails) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Unable to load doctor details.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Appointment</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>New Appointment</Text>

        {/* Name Input */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />

        {/* With Input */}
        <Text style={styles.label}>With</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Doctor's Name"
          value={doctorDetails?.username || ""}
          editable={false}
        />

        {/* Date & Time Input */}
        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Select Date"
              value={selectedDate}
              editable={false}
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Time</Text>
            <TextInput
              style={styles.input}
              placeholder="Select Time"
              value={selectedTime}
              editable={false}
            />
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter Location"
          value={location || doctorDetails?.hospitalName}
          onChangeText={setLocation}
        />

        {/* Message Input */}
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Enter Message"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />

        {/* Request Appointment Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleAppointmentRequest}
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Request Appointment</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    backgroundColor: "#6997DD",
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    color: "#3B82F6",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  label: {
    color: "#374151",
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#111827",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInputContainer: {
    width: "48%",
  },
  messageInput: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default AppointmentScreen;
