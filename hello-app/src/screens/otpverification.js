import { StyleSheet, Text, View, SafeAreaView, StatusBar, Button, Alert, Pressable, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useVerifyUserMutation, useResendOtpMutation } from '../../RTKBackend/ApiSlices/RegisterApiSlice';
import OTPTextInput from 'react-native-otp-textinput';

import React, { useEffect } from 'react';

export default function Otpverification({ }) {
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params;
    const [timer, setTimer] = React.useState(60); // Timer in seconds
    const [isResendEnabled, setIsResendEnabled] = React.useState(false);
    const [otp, setotp] = React.useState('');
    const [verifyUser, { isLoading, error }] = useVerifyUserMutation();
    const [resendOtp, { err }] = useResendOtpMutation();

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setIsResendEnabled(true);
        }
    }, [timer]);

    const handleVerify = async () => {
        try {
            const response = await verifyUser({ email, code: otp }).unwrap();
            console.log('User verified:', response);
            alert("Account has successfully been created");

            
            navigation.navigate("Login");

        } catch (err) {
            console.error('Verification error:', err);
        }
    };

    const handleResendCode = async () => {
        if (isResendEnabled) {
            // Logic to resend OTP
            try {
                
                await resendOtp(email);
                alert('New OTP sent to your email');
            } catch (error) {
                console.error('Failed to resend OTP:', err);
                alert('Failed to resend OTP');
            }

            Alert.alert('Code Resent', 'A new code has been sent to your email.');
            setTimer(60); // Reset timer
            setIsResendEnabled(false);
        } else {
            Alert.alert('Wait', `You can resend the code after ${timer} seconds.`);
        }
    };

    return (
        <View style={styles.frame1} >
            <AntDesign style={styles.back_arrow_icon} name="arrowleft" size={30} color="#6997DD"
                onPress={() => navigation.navigate('Register')} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.otp_head}>Verification Code</Text>
                    <View>
                        <Text style={styles.otp_para} >Check Your email for otp code</Text>
                    </View>
                </View>
            </View>
            <View style={styles.lining_in_sequence}>
                <OTPTextInput
                    // handleTextChange={(text) => setOtp(text)}
                    tintColor="#007bff"
                    offTintColor="#dcdcdc"
                    handleTextChange={(text) => setotp(text)}
                    textInputStyle={styles.input}
                    inputCount={6}
                    keyboardType="numeric"
                    secureTextEntry
                />
            </View>
            <View style={styles.resend_code}>
                <Text style={styles.timerText}>
                    {isResendEnabled ? 'You can now resend the code.' : `Resend code in ${timer}s`}
                </Text>
                <Button
                    title="Resend Code"
                    onPress={handleResendCode}
                    color={isResendEnabled ? "#007bff" : "#dcdcdc"}
                    disabled={!isResendEnabled}
                />
                {/* <Text style={styles.resend_code_text}>Resend code in 00.40</Text> */}
            </View>
            <Pressable onPress={handleVerify} style={styles.verify_btn} >
                <Text style={styles.verify_button}
                > Verify</Text>
            </Pressable>
            {isLoading && <Text>Loading...</Text>}
            {error && <Text>Error: {error.message}</Text>}
            <StatusBar style="auto" />
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
    otp_head: {
        color: "#6997DD",
        fontSize: 25
    },
    otp_para: {
        paddingTop: 10,
        fontSize: 15
    },
    input: {
        width: 40,
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        textAlign: 'center',
    },
    timerText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    lining_in_sequence: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: 40
    },
    resend_code: {
        width: 357,
        height: 109,
        alignItems: "center",
        justifyContent: "center"
    },
    resend_code_text: {
        color: "#777777",
    },
    verify_btn: {
        width: 206,
        margin: "auto",
        height: 60,
        backgroundColor: "#6997DD",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    verify_button: {
        lineHeight: 50,
        fontSize: 16,
        color: "#FFFFFF",
    },



});