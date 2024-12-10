import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Pressable,
    Image,Platform
} from 'react-native';

export default function SymptomsMatched() {
    const navigation = useNavigation();
    const route = useRoute();
    const { matchedSymptoms } = route.params || {}; // Handle route.params safely

    console.log('Received matched symptoms: ', matchedSymptoms);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.historyHeader}>
                <Text style={styles.historytextChnging}>Matched Symptoms</Text>
            </View>
            <View style={styles.patientImage}>
                <Image
                    style={styles.patientImageSizing}
                    source={require('../images/symptomss.jpg')}
                />
            </View>
            <View style={styles.SymptomsList}>
                <Text style={styles.SymptomsText}>Symptoms Matched:</Text>
                {matchedSymptoms && matchedSymptoms.length > 0 ? (
                    matchedSymptoms.map((symptom, index) => (
                        <View key={symptom._id || index} style={styles.matchedList}>
                            <Text style={styles.symptomText}>{symptom.name}</Text>
                        </View>
                    ))
                ) : (
                    <Text>No symptoms matched.</Text>
                )}
                <Pressable
                    onPress={() => navigation.navigate('Home')}
                    style={styles.submitBtn}
                >
                    <Text style={styles.submitBtnText}>Login to the App</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
// import React, { useState } from 'react';
// import { useNavigation,useRoute } from '@react-navigation/native';
// import { StyleSheet, Text, View, SafeAreaView, StatusBar,Pressable,Platform, Image } from 'react-native';

// export default function SymptomsMatched({ }) {
//     const navigation = useNavigation();
//     const route = useRoute(); 
//     const { matchedSymptoms } = route.params;
//     console.log("Received matched symptoms: ", matchedSymptoms); 
   
//     return (
//         <SafeAreaView style={styles.container}>
//             <StatusBar style="auto" />
//             <View style={styles.historyHeader}>
//                 <Text style={styles.historytextChnging}>Check Symptoms</Text>
//             </View>
//             <View style={styles.patientImage} >
//                 <Image style={styles.patientImageSizing} source={require('../images/symptomss.jpg')}></Image>
//             </View>
//             <View style={styles.SymptomsList}>
//                 <Text style={styles.SymptomsText}>Symptoms Matched</Text>
//                 {matchedSymptoms && matchedSymptoms.length > 0 ? (
//                     matchedSymptoms.map((symptom, index) => (
//                     <View key={index} style={styles.matchedList}>
//                         <View style={styles.CheckboxFill}>

//                         </View>
//                          <Text style={styles.symptomText}>{symptom}</Text>
//                     </View>
//                     )))
//                 :(  <Text>No symptoms matched.</Text>)}
                   
//                     <Pressable  onPress={()=>navigation.navigate("Home")} style={styles.submitBtn}>
//                     <Text style={styles.submitBtnText}>Login to the App</Text>
//                 </Pressable>
//             </View>
//         </SafeAreaView>
//     );
// }
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