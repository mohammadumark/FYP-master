import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, Pressable, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export default function OtpverificationReset({ }) {
    const navigation = useNavigation();
    return (
        <View style={styles.frame1} >
            <AntDesign  style={styles.back_arrow_icon} name="arrowleft" size={30} color="#6997DD"
              onPress={() => navigation.navigate('forgetpassword')} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.otp_head}>Verification Code</Text>
                    <View>
                        <Text style={styles.otp_para} >Check Your email for otp code</Text>
                    </View>
                </View>
            </View>
            <View style={styles.lining_in_sequence}>
                <View>
                    <SafeAreaView>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            maxLength={1}
                        />
                    </SafeAreaView>
                </View>
                <View>
                    <SafeAreaView>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            maxLength={1}
                        />
                    </SafeAreaView>
                </View>
                <View>
                    <SafeAreaView>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            maxLength={1}
                        />
                    </SafeAreaView>
                </View>
                <View>
                    <SafeAreaView>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            maxLength={1}
                        />
                    </SafeAreaView>
                </View>
            </View>
            <View style={styles.resend_code}>
                <Text style={styles.resend_code_text}>Resend code in 00.40</Text>
            </View>
            <Pressable style={styles.verify_btn} onPress={() => navigation.navigate('ResetPassword')}>
                <Text style={styles.verify_button}
                > Verify</Text>
            </Pressable>
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
        height: 51,
        borderWidth: 1,
        width: 54,
        padding: 10,
        borderColor: "#777777",
        backgroundColor: "white",
        borderRadius: 100,
        textAlign: "center"
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