import { StatusBar, } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, SafeAreaView, Alert, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLoginUserMutation } from '../../RTKBackend/ApiSlices/RegisterApiSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEmail } from './DataContext';

import React from 'react';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginUser] = useLoginUserMutation();
  const { saveEmail } = useEmail();
  const handleLogin = async () => {

    if (!email && !password) {
      Alert.alert("Error Message", "Fields Must not be Empty");
      return;
    }
    if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      Alert.alert("Error Message", "Enter valid email address")
      return;
    }
    try {
      const user = { email, password };
      const response = await loginUser(user).unwrap();
      if (response) {
        const { symptomsChecked } = response; 
        saveEmail(email); // Use the state email directly here
        console.log("email is", email);
        console.log("Login response:", symptomsChecked);

        if (symptomsChecked) {
          navigation.navigate("Home");
          console.log("email is",email );
          Alert.alert("LIVER TUMOR VISION", "Login Succesfully");
          console.log('Login successful', response);
        }else {
        navigation.navigate('SymptomCheck');
        }
        console.log("email is",email );
        Alert.alert("LIVER TUMOR VISION", "Login Succesfully");
        console.log('Login successful', response);

      }
    } catch (err) {
      console.error('Login failed', err);
      // const errorMessage = err?.data?.msg || "Enter valid credentials.";
      Alert.alert("Enter Valid Credentials")
    }
  };
  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={styles.frame1} >
        {/* //first  */}
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.register_head}>Login</Text>
            <View>
              <Text style={styles.register_para} s>Hello! You are welcome with us</Text>
            </View>
            <StatusBar style="auto" />
          </View>
        </View>
        {/* //second */}
        <View style={styles.lgsp_indicator} >
          <View style={styles.lgsp_indicator_b1b2} >
            <View style={styles.lgsp_indicator_b1_edit} >
              <Text style={styles.lgsp_indicator_b1}>Login</Text>
            </View>
            <Pressable style={styles.lgsp_indicator_b2_edit} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.lgsp_indicator_b2}
              >Register</Text>
            </Pressable>
          </View>
        </View >
        {/* //third */}
        <View style={styles.nameView}>
          <Text style={styles.label_edit_2} >Email</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              placeholder="abc@gmail.com"
            />
          </SafeAreaView>
        </View>

        <View style={styles.nameView}>
          <Text style={styles.label_edit_2} > Password</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </SafeAreaView>
        </View>
        {/* onPress={() => navigation.navigate("SymptomCheck")} */}
        <Pressable style={styles.register_btn} onPress={handleLogin} >
          <Text style={styles.register_button}
          > Login</Text>
        </Pressable>
        <View style={styles.forget_pass_text}>
          <Text > Forget Password?
            <Text style={styles.forget_pass_text_color}
              onPress={() => navigation.navigate('forgetpassword')}
            >Restore</Text>
          </Text>
        </View >
      </View >
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  frame1: {
    backgroundColor: "#F9F9F9",
    height: "100%",
  },
  container: {
    height: 80,
    paddingTop: 10,
    paddingLeft: 30,
    marginTop: 90
  },
  register_head: {
    color: "#6997DD",
    fontSize: 25
  },
  register_para: {
    paddingTop: 10,
    fontSize: 16
  },
  lgsp_indicator: {
    borderRadius: 100,
    width: "90%",
    marginLeft: 20,
    height: 50,
    marginTop: 20,
    flexDirection: 'row',
  },
  lgsp_indicator_b1b2: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  lgsp_indicator_b1: {
    fontSize: 19,
    color: "white"
  },
  lgsp_indicator_b2: {
    fontSize: 19,
  },
  lgsp_indicator_b1_edit: {
    width: "40%",
    backgroundColor: "#6997DD",
    height: 35,
    alignItems: "center",
    borderRadius: 50
  },
  lgsp_indicator_b2_edit: {

    width: "40%",
    height: 35,
    alignItems: "center",
    borderRadius: 50,

  },

  // third
  nameView: {
    width: "90%",
    marginTop: 20
  },
  input: {
    height: 50,
    marginTop: 10,
    marginLeft: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: "#777777",
    backgroundColor: "white",
    borderRadius: 100,

  },
  labeledit: {
    color: "#777777",
    paddingTop: 30,
    marginLeft: 25,
    fontSize: 16

  },
  label_edit_2: {
    paddingTop: 20,
    marginLeft: 25,
    fontSize: 16,
    color: "#777777",
  },
  register_btn: {
    width: 206,
    height: 60,
    marginLeft: 70,
    marginTop: 40,
    backgroundColor: "#6997DD",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  register_button: {
    lineHeight: 50,
    fontSize: 16,
    color: "#FFFFFF",

  },

  forget_pass_text: {
    width: 357,
    height: 80,
    alignItems: "center",
    justifyContent: "center"

  },
  forget_pass_text_color: {
    color: "#6997DD",
  }

});