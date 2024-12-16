import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform, Image} from 'react-native';
export default function PatientHistory({ }) {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.historyHeader}>
                <View style={styles.historyHeaderdata}>
                    <View style={styles.historybackicon}>
                        <AntDesign onPress={() => navigation.navigate('Home')} name="arrowleft" size={34} color="#FFFFFF" ></AntDesign>
                    </View>
                    <View style={styles.historytext}>
                        <Text style={styles.historytextChnging}>History</Text>
                    </View>
                </View>
            </View>
            <View style={styles.patientImage} >
                <View style={styles.patientImageBorder}>
                    <Image style={styles.patientImageSizing} source={require('../images/doctor1.png')}></Image>
                </View>
            </View >
            <View style={styles.patientRecord}>
                <Text style={styles.patientname}>Usama Khan</Text>
                <View style={styles.patientinfo}>
                    <View style={styles.patientInfoDetail}>
                        <Text style={styles.historytextChngingInfo2}>30</Text>
                        <Text style={styles.historytextChngingInfo}>Age</Text>
                    </View>
                    <View style={styles.patientInfoDetail}>
                        <Text style={styles.historytextChngingInfo2}>178 cm</Text>
                        <Text style={styles.historytextChngingInfo}>Height</Text>
                    </View>
                    <View style={styles.patientInfoDetail}>
                        <Text style={styles.historytextChngingInfo2}>A+</Text>
                        <Text style={styles.historytextChngingInfo}>Blood</Text>
                    </View>
                    <View style={styles.patientInfoDetail}>
                        <Text style={styles.historytextChngingInfo2}>90 kg</Text>
                        <Text style={styles.historytextChngingInfo}>Weight</Text>
                    </View>
                </View>
            </View>
            <View style={styles.patientInfoCharts}>
                <View style={styles.patientInfoChartone}>
                    <View>
                        <Text style={styles.patientInfoChartoneText}>Alergies</Text>
                        <Text style={styles.patientInfoChartoneText2}>Nuts</Text>
                    </View>
                    <View>
                        <Text style={styles.patientInfoChartoneText}>Operate</Text>
                        <Text style={styles.patientInfoChartoneText2}>None</Text>
                    </View>
                    <View>
                        <Text style={styles.patientInfoChartoneText}>Last Appointment</Text>
                        <Text style={styles.patientInfoChartoneText2}>23 April,2024</Text>
                    </View>
                    <View>
                        <Text style={styles.patientInfoChartoneText}>Disease Detected</Text>
                        <Text style={styles.patientInfoChartoneText2}>Liver Tumor</Text>
                    </View>
                </View>

                <View style={styles.patientInfoCharttwo}>
                    <View >
                        <Text style={styles.patientInfoChartoneText}>Detailed Diaganosis</Text>
                    </View>
                    <View style={styles.patientInfoCharttwofilling}>
                        <View >
                            <Text style={styles.detailedinfotext1}>Width</Text>
                            <Text style={styles.detailedinfotext1}>Length</Text>
                            <Text style={styles.detailedinfotext1}>Thick</Text>
                            <Text style={styles.detailedinfotext1}>Lession</Text>
                            <Text style={styles.detailedinfotext1}>Density</Text>
                            <Text style={styles.detailedinfotext1}>Location</Text>
                            <Text style={styles.detailedinfotext1}>Stage</Text>
                        </View>
                        <View>
                            <Text style={styles.detailedinfotext2}>15cm</Text>
                            <Text style={styles.detailedinfotext2}>21cm</Text>
                            <Text style={styles.detailedinfotext2}>11cm</Text>
                            <Text style={styles.detailedinfotext2}>Abnormal</Text>
                            <Text style={styles.detailedinfotext2}>High</Text>
                            <Text style={styles.detailedinfotext2}>upright</Text>
                            <Text style={styles.detailedinfotext2}>1st-s</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#6997DD",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Adjust padding for Android
    },
    historyHeader: {
        height: "14%",
        // backgroundColor: "red",
    },
    historyHeaderdata: {
        height: "40%",
        flexDirection: "row",
        paddingTop: "4%",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    historybackicon: {
        marginStart: "6%"
    },
    historytext: {
        marginStart: "27%"
    },
    historytextChnging: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "medium"
    },
    patientImage: {
        height: "8%",
        backgroundColor: "white",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    patientImageBorder: {
        width: "24%",
        marginTop: "-10%",
        height: "145%",
        margin: "auto",
        backgroundColor: "white",
        borderWidth: 2,
        borderRadius: 100,
        borderColor: "#6997DD",
    },
    patientImageSizing: {
        resizeMode: 'contain',
        width: '100%',
        borderWidth: 2,
        height: '100%',
    },
    patientRecord: {
        height: "12%",
        backgroundColor: "white"
    },
    patientname: {
        textAlign: "center",
        fontSize: 13,
        fontWeight: "semibold",
        color: "#6997DD"
    },
    patientinfo: {
        paddingTop: "3%",
        height: "80%",
        width: "80%",
        margin: "auto",
        // backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "center",
    },
    patientInfoDetail: {
        height: "100%",
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "pink",
        borderLeftWidth: 2,
        borderColor: "#6997DD"
    },
    historytextChngingInfo: {
        // color: "#6997DD",
        fontSize: 10,
        fontWeight: "regular"
    },
    historytextChngingInfo2: {
        color: "#6997DD",
        fontSize: 13,
        fontWeight: "medium"
    },
    patientInfoCharts: {
        height: "66%",
        backgroundColor: "white",
        justifyContent: "space-evenly",
        flexDirection: "row"
    },
    patientInfoChartone: {
        height: "65%",
        backgroundColor: "#d9e3f2",
        width: "45%",
        marginTop: "15%",
    },
    patientInfoCharttwo:{
        height: "65%",
        backgroundColor: "#f1dfdd",
        width: "45%",
        marginTop: "15%",
    },
    patientInfoChartoneText: {
        fontSize: 13,
        fontWeight: "600",
        marginStart: "5%",
        lineHeight: 40
    },
    patientInfoChartoneText2: {
        fontSize: 13,
        marginStart: "5%",
        fontWeight: "400"
    },
    patientInfoCharttwofilling: {
        flexDirection: "row"
    },
    detailedinfotext1: {
        marginStart: "8%",
        marginTop: "13%",
        fontSize:12
    },
    detailedinfotext2: {
        marginTop:"14%",
        fontSize:12,
        fontWeight:"medium"
    },
});