import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image,Platform, Pressable, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function Settings({ }) {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar style="auto" /> */}
            <View style={styles.SettingHeader}>
                <AntDesign onPress={() =>navigation.navigate('HOME')} style={styles.back_arrow_icon} name="arrowleft" size={34} color="#FFFFFF" ></AntDesign>
                <Text style={styles.settingText}>Setting</Text>
            </View>
            <Pressable onPress={() =>navigation.navigate('ProfileSetting')} style={styles.profileSetting}>
                <Text>Profile Setting</Text>
            </Pressable>
            <Pressable onPress={() =>navigation.navigate('PasswordSetting')} style={styles.profileSetting}>
                <Text>Password Setting</Text>
            </Pressable>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor:"F9F9F9",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Adjust padding for Android
    },
    SettingHeader: {
        height: "15%",
        backgroundColor: "#6997DD",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "5%",
        top:"-10%"
    },
    settingText: {
        paddingLeft: "30%",
        fontSize: 18,
        color: "white"
    },
    imageSetting:{
        resizeMode:"contain",
        width:100,
        height:"50%",
    },
    profileSetting:{
        height:"8%",
        marginLeft:"auto",
        marginRight:"auto",
        width:"95%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFFFFF",
        borderRadius:1,
        borderWidth:2,
        borderColor:"#6997DD",
        marginTop:"6%",

    },


});