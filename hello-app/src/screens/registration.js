import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useRegisterUserMutation } from "../../RTKBackend/ApiSlices/RegisterApiSlice";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useName } from './DataContext';
import React from 'react';

export default function Registration({ }) {
  // const [textentered, onChangeText] = React.useState('0');
  const navigation = useNavigation();
  const {saveName } = useName(); 
  const [name, setName] = React.useState('');
  const [nameVerify, setNameVerify] = React.useState("false");
  const [email, setEmail] = React.useState('');
  const [emailVerify, setEmailVerify] = React.useState('false');
  const [password, setPassword] = React.useState('');
  const [passwordVerify, setpasswordVerify] = React.useState('false');
  const [showpassword, setshowpassword] = React.useState(false);

  const [registerUser, { isLoading, isSuccess, isError, error }] = useRegisterUserMutation();
  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    
    setNameVerify(nameVar.length > 1);
  }
  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar));
  }
  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setpasswordVerify(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar));
  }

  const handleSubmit = async () => {
    console.log('Submitting user data:', { name, email, password });
    if (!name && !email && !password) {
      Alert.alert('Empty Fields', 'All fields are required.');
      return;
    }
    if (!nameVerify) {
      Alert.alert('Invalid Name', 'Name should be more than one character.');
      return;
    }
    if (!emailVerify) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!passwordVerify) {
      Alert.alert('Invalid Password', 'Password must contain at least 6 characters, including upper/lowercase and numbers.');
      return;
    }
    try {
      const userData = { name, email, password };
      const result = await registerUser(userData).unwrap();
      if (result) {
        // await AsyncStorage.setItem('userName', name);
        // await AsyncStorage.setItem('userEmail', email);
        // console.log('User info stored:', { name, email });
        navigation.navigate("Otpverify", { email });
        saveName(name);
      }
    }
    
    catch (error) {
      console.error('Failed to register:', error);
    }
  };
  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={styles.frame1} >
        {/* //first  */}
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.register_head}>Register</Text>
            <View>
              <Text style={styles.register_para} s>Hello! You are welcome with us</Text>
            </View>
            <StatusBar style="auto" />
          </View>
        </View>
        {/* //second */}
        <View style={styles.lgsp_indicator} >
          <View style={styles.lgsp_indicator_b1b2} >
            <Pressable style={styles.lgsp_indicator_b1_edit} onPress={() => navigation.navigate('Login')} >
              <Text style={styles.lgsp_indicator_b1}

              >Login</Text>
            </Pressable>
            <View style={styles.lgsp_indicator_b2_edit}>
              <Text style={styles.lgsp_indicator_b2}>Register</Text>
            </View>
          </View>
        </View >
        {/* //third */}

        <View style={[styles.nameView, styles.name_space]}>
          <Text style={styles.labeledit} > Fullname</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChange={e => handleName(e)}
            />
            {name.length < 1 ? null : nameVerify ? (
              <Feather style={styles.circleadjust} name="check-circle" size={24} color="#6997DD" />
            ) : (
              <MaterialIcons style={styles.circleadjust} name="error" size={24} color="red" />
            )}
          </SafeAreaView>
          {name.length < 1 ? null : nameVerify ? null : (
            <Text style={styles.errorText}>Name should be more then one character</Text>
          )}
        </View>
        <View style={styles.nameView}>
          <Text style={styles.label_edit_2} > Email</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChange={e => handleEmail(e)}
              placeholder="abc@gmail.com"
            />
            {email.length < 1 ? null : emailVerify ? (
              <Feather style={styles.circleadjust} name="check-circle" size={24} color="#6997DD" />
            ) : (
              <MaterialIcons style={styles.circleadjust} name="error" size={24} color="red" />
            )}
          </SafeAreaView>
          {email.length < 1 ? null : emailVerify ? null : (
            <Text style={styles.errorText}>Enter proper email</Text>
          )}
        </View>
        <View style={styles.nameView}>
          <Text style={styles.label_edit_2} > Password</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChange={e => handlePassword(e)}
              placeholder="Enter your password"
              secureTextEntry={showpassword}
            />
            <TouchableOpacity style={styles.eyeadjust} onPress={() => setshowpassword(!showpassword)}>
              <Feather name="eye-off"
                size={24}
                color="#6997DD" />
            </TouchableOpacity>
          </SafeAreaView>
          {password.length < 1 ? null : passwordVerify ? null : (
            <Text style={styles.errorText}>combination of Upper/Lower/numbers</Text>
          )}
        </View>

        <Pressable style={styles.register_btn} onPress={() => handleSubmit()}>

          <Text style={styles.register_button}

          > Register</Text>

        </Pressable>
        {isLoading && <Text>Registering...</Text>}
        {isSuccess && <Text>Registration successful!</Text>}
        {isError && <Text>Error: {error?.data?.msg || 'Failed to register'}</Text>}
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
    fontSize: 19
  },
  lgsp_indicator_b2: {
    fontSize: 19,
    color: "white"
  },
  lgsp_indicator_b1_edit: {
    width: "40%",
    height: 35,
    alignItems: "center",
    borderRadius: 50
  },
  lgsp_indicator_b2_edit: {
    backgroundColor: "#6997DD",
    width: "40%",
    height: 35,
    alignItems: "center",
    borderRadius: 50,

  },

  // third
  nameView: {
    width: "90%",

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
    paddingTop: "3%",
    marginLeft: 25,
    fontSize: 16,
    color: "#777777",
  },
  register_btn: {
    width: 206,
    marginTop: "10%",
    marginLeft: "auto",
    marginRight: "auto",
    // margin: "auto",
    // Top:"10%",
    height: 60,
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
  circleadjust: {
    marginLeft: "90%",
    top: "-65%",
    marginBottom: "-8%"
  },
  errorText: {
    marginLeft: "10%",
    width: "100%",
    fontSize: 10,
    marginBottom: "-5%",
    color: "red"
  },
  eyeadjust: {
    marginLeft: "90%",
    top: "-65%",
    marginBottom: "-8%"
  }
});



// const handleSubmit = () => {
//   // Validate the form data
//   if (name.length > 1 && emailVerify && passwordVerify) {
//     // Create the form data object
//     const formData = {
//       UserName: name,
//       Email: email,
//       Password: password,
//     };

//     // Dispatch the register action
//     dispatch(register(formData));
//   } else {
//     // Show an error message if validation fails
//     console.log('Please fill in all fields correctly.');
//   }
// };
