// src/screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const blinkAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const blink = () => {
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        blink(); // Repeat the sequence
      });
    };

    blink();

    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, 5000); 

    return () => {
      clearTimeout(timer);
    };
  }, [blinkAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../images/logo.png')}
        style={[
          styles.logo,
          {
            opacity: blinkAnim, 
          },
        ]}
/>
      <Text style={styles.text}>Liver Tumor Vision</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:"100%",
    alignItems: 'center',
    backgroundColor: '#6997DD',
  },
  logo: {
    resizeMode:"contain",
    marginTop:"40%",
    width: "100%",
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    top:"-5%",
    color:"white"
  },
});
export default SplashScreen;




