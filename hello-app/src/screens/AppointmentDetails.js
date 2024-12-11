import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StarIcon, CalendarIcon } from 'react-native-heroicons/outline';

const AppointmentCard = ({ doctorName, specialty, rating, date, time }) => {
  return (
    <View style={styles.cardContainer}> 
      <View style={styles.headerContainer}> 
        <View>
          <Text style={styles.doctorName}>{doctorName}</Text>
          <Text style={styles.specialty}>{specialty}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <StarIcon color="gold" size={20} />
          <Text style={styles.rating}>{rating}</Text>
        </View>
      </View>
      <View style={styles.dateTimeContainer}>
        <CalendarIcon color="gray" size={20} />
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Appointment Book</Text>
      </TouchableOpacity>
    </View>
  );
};

const AppointmentDetails = () => {
  const appointments = [
    {
      doctorName: 'Dr. Owais',
      specialty: 'Hepatologist Specialist',
      rating: 4.5,
      date: 'Wednesday, 25 June 2024',
      time: '5:00 PM',
    },
    {
      doctorName: 'Dr. Ishaal',
      specialty: 'Hepatologist Specialist',
      rating: 4.7,
      date: 'Wednesday, 19 June 2024',
      time: '5:00 PM',
    },
  ];

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>ALL Appointments</Text>
      {appointments.map((appointment, index) => (
        <AppointmentCard key={index} {...appointment} />
      ))}
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
    backgroundColor: '#e6f2ff',
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
    color: '#003366',
  },
  specialty: {
    fontSize: 14,
    color: '#555555',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#555555',
    marginLeft: 4,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  date: {
    fontSize: 14,
    color: '#555555',
    marginLeft: 8,
  },
  time: {
    fontSize: 14,
    color: '#555555',
    marginLeft: 16,
  },
  button: {
    backgroundColor: '#0056b3',
    marginTop: 16,
    paddingVertical: 8,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AppointmentDetails;
