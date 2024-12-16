import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { useMatchSymptomsMutation } from '../../RTKBackend/ApiSlices/SymtomsSlice';
import { StyleSheet, Text, Alert, View, SafeAreaView, StatusBar, Platform, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SymptomsScreen({ }) {
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);
    const [isChecked5, setIsChecked5] = useState(false);
    const [isChecked6, setIsChecked6] = useState(false);
    const [isChecked7, setIsChecked7] = useState(false);
    const [matchSymptoms, { isLoading, isSuccess, error }] = useMatchSymptomsMutation();
    const navigation = useNavigation();

    

    const handleSubmit = async () => {
        const selectedSymptoms = [];
        if (isChecked) selectedSymptoms.push("Weakness and Tiredness");
        if (isChecked2) selectedSymptoms.push("Pain in the Abdomen");
        if (isChecked3) selectedSymptoms.push("Swelling of the abdomen due to a build-up of fluid");
        if (isChecked4) selectedSymptoms.push("Pain in the right shoulder");
        if (isChecked5) selectedSymptoms.push("Appetite loss and feeling sick");
        if (isChecked6) selectedSymptoms.push("Weight loss");
        if (isChecked7) selectedSymptoms.push("Yellowing of the skin and eyes");

        // Check if any symptoms are selected
        if (selectedSymptoms.length === 0) {
            Alert.alert("Please select at least one symptom.");
            return;
        }
        // Send selected symptoms to the backend
        try {
            const result = await matchSymptoms(selectedSymptoms).unwrap();
            if (result.matched) {
                await AsyncStorage.setItem('symptomsViewed', 'true'); 
                navigation.navigate("SymptomMatch", { matchedSymptoms: result.matchedSymptom });
            }
            else {
                Alert.alert("No match found for the selected symptoms.");
                navigation.navigate("SymptomNotMatch")
            }
        }
        catch (error) {
            console.error("Error details:", error);
            Alert.alert("Error occurred while matching symptoms: ", error.message);
        }
    }

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
                <Text style={styles.SymptomsText}>Track Your symptoms</Text>
                <View>
                    <View style={styles.checkboxheader}>
                        <Checkbox
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={isChecked ? '#4630EB' : undefined}
                            style={styles.checkbox} />
                        <Text style={styles.label}>Weakness and Tiredness</Text>
                    </View>
                    <View style={styles.checkboxheader}>
                        <Checkbox
                            value={isChecked2}
                            onValueChange={setIsChecked2}
                            color={isChecked2 ? '#4630EB' : undefined}
                            style={styles.checkbox} />
                        <Text style={styles.label}>Pain in the Abdomen</Text>
                    </View>
                    <View style={styles.checkboxheader}>
                        <Checkbox
                            value={isChecked3}
                            onValueChange={setIsChecked3}
                            color={isChecked3 ? '#4630EB' : undefined}
                            style={styles.checkbox} />
                        <Text style={styles.label}>Swelling of the abdomen due to a build-up of fluid </Text>
                    </View>
                    <View style={styles.checkboxheader}>
                        <Checkbox
                            value={isChecked4}
                            onValueChange={setIsChecked4}
                            color={isChecked4 ? '#4630EB' : undefined}
                            style={styles.checkbox} />
                        <Text style={styles.label}>Pain in the right shoulder</Text>
                    </View>
                    <View style={styles.checkboxheader}>
                        <Checkbox
                            value={isChecked5}
                            onValueChange={setIsChecked5}
                            color={isChecked5 ? '#4630EB' : undefined}
                            style={styles.checkbox} />
                        <Text style={styles.label}>Appetite loss and feeling sick</Text>
                    </View>
                    <View style={styles.checkboxheader}>
                        <Checkbox
                            value={isChecked6}
                            onValueChange={setIsChecked6}
                            color={isChecked6 ? '#4630EB' : undefined}
                            style={styles.checkbox} />
                        <Text style={styles.label}>Weight loss</Text>
                    </View>
                    <View style={styles.checkboxheader}>
                        <Checkbox
                            value={isChecked7}
                            onValueChange={setIsChecked7}
                            color={isChecked7 ? '#4630EB' : undefined}
                            style={styles.checkbox} />
                        <Text style={styles.label}>Yellowing of the skin and eyes </Text>
                    </View>
                </View>
                {/* onPress={()=>navigation.navigate("SymptomMatch")} */}
                <Pressable onPress={handleSubmit} style={styles.submitBtn}>
                    <Text style={styles.submitBtnText}>Submit</Text>
                </Pressable>
                {isLoading && <Text>Submitting...</Text>}
                {isSuccess && <Text>submitted succesfully</Text>}
                {error && <Text>Error: {error?.data?.msg || 'Failed to register'}</Text>}
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
        borderRadius: 50, // Half of the width and height to make it round
        overflow: 'hidden', // Ensures the image stays within the circle
        borderWidth: 2, // Optional: add border
        borderColor: '#ddd',
        top: "-70%",
    },
    checkboxheader: {
        flexDirection: "row",
        marginTop: "7%"
    },
    SymptomsList: {
        height: "78%",
        backgroundColor: "white"
    },
    SymptomsText: {
        marginTop: "10%",
        marginLeft: "5%",
        fontSize: 14,
        fontWeight: "600"
    },
    label: {
        marginLeft: "4%",
        width: "80%",
    },
    checkbox: {
        marginLeft: "5%",
    },
    submitBtn: {
        height: "7%",
        backgroundColor: "#6997DD",
        borderRadius: 100,
        width: "90%",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center"
    },
    submitBtnText: {
        color: "white",
        fontSize: 15,
        fontWeight: "500"
    },
});
