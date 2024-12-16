import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image,Platform, Pressable, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TextInput,GestureHandlerRootView } from 'react-native-gesture-handler';
export default function Settings({ }) {
   const navigation = useNavigation();
   const [confirmPass, newdata] = React.useState('');
   const [newPass, passnew] = React.useState('');
   const [confirmnewPass, newcofirmdata] = React.useState('');
    return (
        <GestureHandlerRootView style={styles.container}>
        <StatusBar style="auto" />
            <View style={styles.SettingHeader}>
                <AntDesign onPress={() =>navigation.navigate('setting')} style={styles.back_arrow_icon} name="arrowleft" size={34} color="#FFFFFF" ></AntDesign>
                <Text style={styles.settingText}>Password Setting</Text>
            </View>
            <View style={styles.profileSetting}>
                <Text style={styles.settingcurrentText}>Enter Current Password</Text>
              <TextInput
               style={styles.input}
               onChangeText={newdata}
               secureTextEntry={true}
               value={confirmPass}
            ></TextInput>
            </View>
            <View style={styles.profileSetting}>
                <Text style={styles.settingcurrentText}>Enter New Password</Text>
              <TextInput
               style={styles.input}
               onChangeText={passnew}
               secureTextEntry={true}
               value={newPass}
            ></TextInput>
            </View>
            <View style={styles.profileSetting}>
                <Text style={styles.settingcurrentText}>Confirm New Password</Text>
              <TextInput
               style={styles.input}
               onChangeText={newcofirmdata}
               secureTextEntry={true}
               value={confirmnewPass}
            ></TextInput>
            </View>
            <Pressable onPress={() =>navigation.navigate('HOME')}  style={styles.passwordSetting}>
                <Text style={styles.passwordSettingText}>Update</Text>
            </Pressable>
            </GestureHandlerRootView>
    
    );
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor:"F9F9F9",
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Adjust padding for Android
    },
    SettingHeader: {
        height: "16%",
        backgroundColor: "#6997DD",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "5%",
        
    },
    settingText: {
        paddingLeft: "18%",
        fontSize: 18,
        color: "white"
    },
    settingcurrentText: {
        paddingLeft: "10%",
        fontSize: 12,
    },
    profileSetting:{
        marginTop:"10%"
    },
    input: {
        height: 50,
        marginTop: "3%",
        marginLeft: "10%",
        width:"80%",
        borderWidth: 1,
        borderRadius:15,
        padding:10,
        borderColor: "#777777",
        backgroundColor: "white",
      },
    passwordSetting:{
        height:"5%",
        width:"30%",
        backgroundColor:"#6997DD",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        marginTop:"8%",
        marginLeft:"10%"
    },
    passwordSettingText:{
        color:"white"
    }
});