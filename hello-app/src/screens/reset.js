import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, Pressable, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Resetpassword({ }) {
    const [text, onChangeText] = React.useState('');
    const navigation = useNavigation();
    return (
        <View style={styles.frame1}>
            <AntDesign style={styles.back_arrow_icon} name="arrowleft" size={30} color="#6997DD" 
            onPress={() => navigation.navigate('forgetpassword')}/>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.reset_head}>Reset Password</Text>
                    <View>
                        <Text style={styles.reset_para} >Password must always be strong</Text>
                    </View>
                    <StatusBar style="auto" />
                </View>
            </View>
            <SafeAreaView>
            <View>
                <Text style={styles.rest_pass}>Enter New Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}    
                />
            </View>
            <View>
                <Text style={styles.rest_pass}>Re-enter Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
            </View>
            </SafeAreaView>
            <Pressable style={styles.reset_btn}  onPress={() => navigation.navigate('Login')}>

                <Text style={styles.reset_btn_text}> Reset</Text>

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
    reset_head: {
        color: "#6997DD",
        fontSize: 25
    },
    reset_para: {
        paddingTop: 10,
        fontSize: 15
    },
    rest_pass: {
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
    reset_btn: {
        width: 206,
        height: 60,
        marginLeft: 70,
        marginTop: 40,
        backgroundColor: "#6997DD",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
      },
      reset_btn_text: {
        lineHeight: 50,
        fontSize: 16,
        color: "#FFFFFF",
        // fontFamily: 'Poppins-Regular'
      },

});
