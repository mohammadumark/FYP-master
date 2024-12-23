import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DoctorDetailsScreen = ({ route }) => {
  const { doctorId } = route.params;
  const navigation = useNavigation();
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("05:00PM");
  const [selectedDate, setSelectedDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const times = [
    "03:00PM",
    "04:00PM",
    "05:00PM",
    "06:00PM",
    "07:00PM",
    "08:00PM",
    "09:00PM",
    "10:00PM",
  ];

  const handleProceedToAppointment = () => {
    if (!selectedDate) {
      Alert.alert("Error", "Please select a valid date.");
      return;
    }

    navigation.navigate("Appointment", {
      doctorId,
      selectedDay,
      selectedTime,
      selectedDate,
    });
  };

  const fetchDoctorDetails = async () => {
    try {
      const response = await fetch(
        `http://192.168.137.1:5000/api/doctorss/${doctorId}`
      );

      if (!response.ok) {
        throw new Error("Doctor not found");
      }

      const data = await response.json();
      setDoctorDetails(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message || "Failed to fetch doctor details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) {
      fetchDoctorDetails();
    }
  }, [doctorId]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const currentDate = new Date();
    if (date < currentDate) {
      Alert.alert("Error", "You cannot select a past date.");
      hideDatePicker();
      return;
    }
  
    const formattedDate = date.toISOString().split("T")[0]; // Format as yyyy-mm-dd
    setSelectedDate(formattedDate);
  
    // Update selected day based on the selected date
    const selectedDayIndex = date.getDay();
    setSelectedDay(days[selectedDayIndex]);
  
    hideDatePicker();
  };
  
  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!doctorDetails) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Doctor not found</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Top App Bar */}
      <View style={tw`bg-blue-400 p-4`}>
        <Text style={tw`text-white text-center text-lg font-bold`}>
          Doctor Details
        </Text>
      </View>

      <ScrollView style={tw`flex-1`}>
        <View style={tw`p-4`}>
          <View style={tw`items-center`}>
            <Image
              source={{
                uri: doctorDetails.profilePicture
                  ? `http://192.168.137.1:5000${doctorDetails.profilePicture}`
                  : "https://via.placeholder.com/96",
              }}
              style={tw`w-24 h-24 rounded-full border-2 border-blue-500`}
            />
            <Text style={tw`text-xl font-bold mt-4`}>{doctorDetails.username}</Text>
            <Text style={tw`text-gray-600`}>{doctorDetails.specialty}</Text>
          </View>

          <View style={tw`mt-6 bg-gray-100 p-4 rounded-lg`}>
            <Text style={tw`text-lg font-bold mb-2`}>Description</Text>
            <Text style={tw`text-gray-700 text-justify`}>{doctorDetails.description}</Text>
          </View>

          <View style={tw`mt-6 bg-gray-100 p-4 rounded-lg`}>
            <Text style={tw`text-lg font-bold mb-4`}>Schedules</Text>
            <View style={tw`flex-row justify-between mb-4`}>
              {days.map((day) => (
                <TouchableOpacity
                  key={day}
                  onPress={() => setSelectedDay(day)}
                  style={tw`p-2 border rounded-lg ${
                    selectedDay === day
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <Text
                    style={tw`${
                      selectedDay === day ? "text-white" : "text-gray-500"
                    } text-center`}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={tw`flex-row flex-wrap`}>
              {times.map((time) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  style={tw`p-2 m-1 border rounded-lg ${
                    selectedTime === time ? "bg-blue-500" : "bg-gray-200"
                  }`}
                >
                  <Text
                    style={tw`${
                      selectedTime === time ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={tw`text-lg font-bold mt-4`}>Date</Text>
            <TouchableOpacity
              style={tw`border border-gray-300 mt-2 p-4 rounded-lg`}
              onPress={showDatePicker}
            >
              <Text style={tw`text-gray-500`}>
                {selectedDate || "Select Date"}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            <TouchableOpacity
              style={tw`bg-blue-500 mt-6 p-4 rounded-lg`}
              onPress={handleProceedToAppointment}
            >
              <Text style={tw`text-white text-center font-bold text-lg`}>
                Proceed To Appointment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorDetailsScreen;
