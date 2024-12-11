import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useEmail } from './DataContext'; // Import useEmail
import { StarIcon, CalendarIcon } from 'react-native-heroicons/outline';

const AppointmentCard = ({ doctorName, date, time, location }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.doctorName}>{doctorName}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
      <View style={styles.dateTimeContainer}>
        <CalendarIcon color="gray" size={20} />
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Appointment Booked</Text>
      </TouchableOpacity>
    </View>
  );
};

const AppointmentDetails = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { email } = useEmail(); // Get the email from DataContext

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://192.168.137.1:5001/api/appointments/by-email/${email}`);
        const data = await response.json();

        // Filter appointments to only include those with "accepted" status
        const acceptedAppointments = data.filter((appointment) => appointment.status === 'accepted');
        setAppointments(acceptedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchAppointments();
    } else {
      setLoading(false); // Stop loading if no email is available
    }
  }, [email]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0056b3" />
        <Text style={styles.loaderText}>Loading appointments...</Text>
      </View>
    );
  }

  if (appointments.length === 0) {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.title}>No Appointments Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Upcoming Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <AppointmentCard
            doctorName={item.doctorName}
            date={item.date}
            time={item.time}
            location={item.location}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: "#6997DD",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // Changed to white
  },
  location: {
    fontSize: 14,
    color: '#ffffff', // Changed to white
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  date: {
    fontSize: 14,
    color: '#ffffff', // Changed to white
    marginLeft: 8,
  },
  time: {
    fontSize: 14,
    color: '#ffffff', // Changed to white
    marginLeft: 16,
  },
  button: {
    backgroundColor: '#ffffff', // Changed button background to white
    marginTop: 16,
    paddingVertical: 8,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#6997DD', // Changed text color to match card background
    fontSize: 14,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 8,
    fontSize: 16,
    color: '#333333',
  },
});


export default AppointmentDetails;
