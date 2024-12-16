import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, Platform, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function Alert({ }) {
   const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />

            <View style={styles.AlertHeader}>
                <AntDesign onPress={() => navigation.navigate('HOME')} style={styles.back_arrow_icon} name="arrowleft" size={34} color="#FFFFFF" ></AntDesign>
                <Text style={styles.headerText}>Alerts</Text>
            </View>
            <View style={styles.notificationOne}>
                <Text style={styles.notificationOneText}>This is notification</Text>
            </View>
            
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight :0, // Adjust padding for Android

    },
    AlertHeader: {
        height: "10%",
        backgroundColor: "#6997DD",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "4%"
    },
    headerText: {
        paddingLeft: "33%",
        color: "white",
        fontSize: 18
    },
    notificationOne:{
        height:"6%",
        backgroundColor:"silver",
        justifyContent:"center"

    },
    notificationOneText:{
        paddingLeft:"5%",
        fontSize:18,
        fontWeight:"700"
    },
});