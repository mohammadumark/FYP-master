import { StyleSheet, Image, Text, View, SafeAreaView, StatusBar, TextInput, Pressable, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
export default function ForgetPassword({ }) {
    const [text, onChangeText] = React.useState('');
    const navigation= useNavigation();
    return (
        <View style={styles.frame1} >
            <AntDesign style={styles.back_arrow_icon} name="arrowleft" size={30} color="#6997DD" 
            onPress={() => navigation.navigate('Login')}/>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.forget_head}>Forgot Password</Text>
                    <View>
                        <Text style={styles.forget_para} >Enter the email to recover the password</Text>
                    </View>
                    <StatusBar style="auto" />
                </View>
            </View>
            <View style={styles.image}>
                <Image
                 source={require('../images/forget.png')}
                />
            </View>
            {/* email */}
            <SafeAreaView>
            <View>
                <Text style={styles.forget_email}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder='enter email to send OTP'
                />
            </View>
            </SafeAreaView>
            {/* button */}
            <Pressable style={styles.sendotp_btn} onPress={() => navigation.navigate('OtpverifyReset')}>
                <Text style={styles.sendotp_btn_text}
                > Send</Text>
            </Pressable>
            <Pressable style={styles.back_to_login} onPress={() => navigation.navigate('Login')}> 
                <Text style={styles.back_to_login_text}
                >Back to login</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    frame1: {
        backgroundColor: "#F9F9F9",
        height: "100%",
      },
    back_arrow_icon: {
        marginLeft: 27,
        marginTop: 20,
        
    },
    container: {
        height: 80,
        paddingTop: 10,
        paddingLeft: 30,
        marginTop: 50
    },
    forget_head: {
        color: "#6997DD",
        fontSize: 25
    },
    forget_para: {
        paddingTop: 10,
        fontSize: 15
    },
    // image
    image: {
        width: "100%",
        height: 169,
        alignItems: "center",
        marginTop: 30,
    },
    forget_email: {
        paddingLeft: 30,
        paddingTop: 40,
        color: "#777777",
        fontSize: 16
    },
    input: {
        height: 60,
        marginTop: 10,
        width: 302,
        marginLeft: 20,
        borderWidth: 1,
        padding: 10,
        borderColor: "#777777",
        backgroundColor: "white",
        borderRadius: 100,
    },
    sendotp_btn: {
        width: 206,
        height: 60,
        marginLeft: 70,
        marginTop: 40,
        backgroundColor: "#6997DD",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
      },
      sendotp_btn_text: {
        lineHeight: 50,
        fontSize: 16,
        color: "#FFFFFF",
        // fontFamily: 'Poppins-Regular'
      },
    
      forget_pass_text: {
        width: 200,
        // margin:"auto",
        // backgroundColor:"red",
        alignItems: "center",
        marginLeft: 70,
        marginTop: 40,
      },
      back_to_login:{
       width:357,
    //    backgroundColor:"blue",
       height:109,
       alignItems:"center",
       justifyContent:"center"
      },
      back_to_login_text:{
        color:"#777777",
      }
});