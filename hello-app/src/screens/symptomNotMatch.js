import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, StatusBar,Pressable,Platform, Image } from 'react-native';

export default function SymptomsNotMatched({ }) {
    const navigation = useNavigation();
   
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.historyHeader}>
                <Text style={styles.historytextChnging}>Check Symptoms</Text>
            </View>
            <View style={styles.patientImage} >
                <Image style={styles.patientImageSizing} source={require('../images/symptomss.jpg')}></Image>
            </View>
            <View style={styles.SymptomsList}>
                <Text style={styles.SymptomsText}>Symptoms Not Matched</Text>
                    <View  style={styles.matchedList}>
                        <View style={styles.CheckboxFill}>

                        </View>
                         <Text style={styles.symptomText}>Good to have you with us! Thanks for your valueable time.</Text>
                    </View>
                   
                    <Pressable  onPress={()=>navigation.navigate("Home")} style={styles.submitBtn}>
                    <Text style={styles.submitBtnText}>Logout</Text>
                </Pressable>
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
    },
    historytextChnging: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "medium",
        textAlign: "center",
        marginTop: "4%"
    },
    patientImage: {
        height: "8%",
        backgroundColor: "white",
        alignItems: "center",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    patientImageSizing: {
        width: 100, // Set your desired width
        height: 100, // Set your desired height
        borderRadius: 50, //
        overflow: 'hidden', 
        borderWidth: 2, 
        borderColor: '#ddd',
        top: "-70%",
    },
    checkboxheader: {
        flexDirection: "row",
        marginTop:"7%"
    },
    SymptomsList:{
        height:"78%",
        backgroundColor:"white"
    },
    SymptomsText:{
        marginTop:"8%",
        marginLeft:"5%",
        fontSize:14,
        marginBottom:"5%",
        fontWeight:"600"
    },
    CheckboxFill:{
        width:"4%",
        height:"30%",
        top:"-3%",
        backgroundColor:"#6997DD"
    }, 
    matchedList:{
        flexDirection:"row",
        height:"10%",
        // backgroundColor:"yellow",
        alignItems:"center",
        marginLeft:"5%"
    },
    symptomText:{
        marginStart:"4%",

    },
    submitBtn:{
        height:"7%",
        backgroundColor:"#6997DD",
        borderRadius:100,
        width:"90%",
        margin:"auto",
        alignItems:"center",
        justifyContent:"center"
        },
        submitBtnText:{
            color:"white",
            fontSize:15,
            fontWeight:"500"       
        },
   
});