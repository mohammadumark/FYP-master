import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const DoctorDetailsScreen = ({ route }) => {
  const { doctorId } = route.params;
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDoctorDetails = async () => {
    try {
      console.log('Fetching doctor with ID:', doctorId);  // Debugging log
      const response = await fetch(`http://10.0.2.2:5000/api/doctors/${doctorId}`); // Corrected endpoint
  
      if (!response.ok) {
        throw new Error('Doctor not found');
      }
  
      const data = await response.json();
      setDoctorDetails(data);
    } catch (error) {
      console.error(error); // Log error for debugging
      Alert.alert('Error', error.message || 'Failed to fetch doctor details.');
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    if (doctorId) {
      fetchDoctorDetails();
    }
  }, [doctorId]);

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
    <ScrollView style={tw`bg-green-100 flex-1`}>
      <View style={tw`p-4`}>
        <View style={tw`items-center`}>
          <Image
            source={{ uri: doctorDetails.profilePicture }}
            style={tw`w-24 h-24 rounded-full border-2 border-green-500`}
          />
          <Text style={tw`text-lg font-bold mt-4`}>{doctorDetails.username}</Text>
          <Text style={tw`text-gray-600`}>{doctorDetails.specialty}</Text>
        </View>

        <View style={tw`mt-4 bg-white p-4 rounded-lg shadow`}>
          <View style={tw`flex-row justify-around`}>
            <Text style={tw`text-gray-800`}>
              💵 <Text style={tw`font-bold`}>Fee:</Text> {doctorDetails.fee} Rs
            </Text>
            <Text style={tw`text-gray-800`}>
              ⭐ <Text style={tw`font-bold`}>{doctorDetails.reviews} Reviews</Text>
            </Text>
            <Text style={tw`text-gray-800`}>
              📅 <Text style={tw`font-bold`}>{doctorDetails.experience} Years Experience</Text>
            </Text>
          </View>
          <Text style={tw`mt-4 text-gray-700`}>{doctorDetails.description}</Text>
        </View>

        <TouchableOpacity style={tw`bg-green-500 mt-4 p-4 rounded-lg shadow-lg`}>
          <Text style={tw`text-white text-center font-bold text-lg`}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DoctorDetailsScreen;
