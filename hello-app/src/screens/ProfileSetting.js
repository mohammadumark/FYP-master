import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useFetchNameQuery } from '../../RTKBackend/ApiSlices/RegisterApiSlice';
import { useEmail } from './DataContext';
import { useAddUserInfoMutation } from '../../RTKBackend/ApiSlices/ProfileInfoSlice';

import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TextInput,
    Platform,
    Image,
    TouchableOpacity,
    Pressable,
    ActivityIndicator,
    Alert
} from 'react-native';

export default function ProfileSetting() {
    const navigation = useNavigation();
    const [username, setUsername] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [blood, setBloodGroup] = React.useState('');
    const [height, setHeight] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [age, setAge] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [showPicker, setShowPicker] = React.useState(false);
    const { email } = useEmail();

    const { data: nameData } = useFetchNameQuery(email, {
        skip: !email,
    });
    const name = nameData?.name || "User";

    React.useEffect(() => {
        setUsername(name);
    }, [name]);

    const [addUserInfo, { isLoading, isSuccess, isError, error }] = useAddUserInfoMutation();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // Use backticks for template literals
    };
    

    const handleSave = () => {
        const userInfo = {
            username,
            gender,
            dob: date.toISOString(),
            age,
            weight,
            height,
            blood,
            email,
        };

        addUserInfo(userInfo);
        if(addUserInfo(userInfo))
        {
            alert("succesfully saved details")
            navigation.navigate('HOME');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.historyHeader}>
                <View style={styles.historyHeaderdata}>
                    <View style={styles.historybackicon}>
                        <AntDesign
                            onPress={() => navigation.navigate('setting')}
                            name="arrowleft"
                            size={34}
                            color="#FFFFFF"
                        />
                    </View>
                    <View style={styles.historytext}>
                        <Text style={styles.historytextChnging}>Profile Setting</Text>
                    </View>
                </View>
            </View>
            <View style={styles.patientImage}>
                <View style={styles.patientImageBorder}>
                    <Image
                        style={styles.patientImageSizing}
                        source={require('../images/doctor1.png')}
                    />
                    <EvilIcons
                        style={styles.changeimage}
                        name="camera"
                        size={24}
                        color="black"
                    />
                </View>
            </View>
            <View style={styles.profileinformationView}>
                <View style={styles.profileSetting}>
                    <Text style={styles.settingcurrentText}>User Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUsername}
                        value={username}
                        editable={false}
                    />
                </View>
                <View style={styles.profileSetting}>
                    <Text style={styles.settingcurrentText}>Gender</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setGender}
                        value={gender}
                    />
                </View>
                <View style={styles.profileSetting}>
                    <Text style={styles.settingcurrentText}>Date of Birth</Text>
                    <TouchableOpacity onPress={() => setShowPicker(true)}>
                        <TextInput
                            style={styles.input}
                            value={formatDate(date)}
                            editable={false}
                        />
                    </TouchableOpacity>
                    {showPicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                onChange(event, selectedDate);
                                if (Platform.OS === 'android') {
                                    setShowPicker(false);
                                }
                            }}
                        />
                    )}
                </View>
                <View style={styles.AgeWeight}>
                    <View style={styles.profileSetting2}>
                        <Text style={styles.settingcurrentText}>Age</Text>
                        <TextInput
                            style={styles.input2}
                            onChangeText={setAge}
                            value={age}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.profileSetting2}>
                        <Text style={styles.settingcurrentText}>Weight</Text>
                        <TextInput
                            style={styles.input2}
                            onChangeText={setWeight}
                            value={weight}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={styles.AgeWeight}>
                    <View style={styles.profileSetting2}>
                        <Text style={styles.settingcurrentText}>Height</Text>
                        <TextInput
                            style={styles.input2}
                            onChangeText={setHeight}
                            value={height}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.profileSetting2}>
                        <Text style={styles.settingcurrentText}>Blood Group</Text>
                        <TextInput
                            style={styles.input2}
                            onChangeText={setBloodGroup}
                            value={blood}
                        />
                    </View>
                </View>
                <Pressable onPress={handleSave} style={styles.profileSettings}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.profileSettingsText}>Save</Text>
                    )}
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#6997DD',
    },
    historyHeader: {
        height: '14%',
        marginTop: '5%',
    },
    historyHeaderdata: {
        height: '40%',
        flexDirection: 'row',
        paddingTop: '4%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    historybackicon: {
        marginStart: '6%',
    },
    historytext: {
        marginStart: '19%',
    },
    historytextChnging: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'medium',
    },
    patientImage: {
        height: '8%',
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    patientImageBorder: {
        width: '24%',
        marginTop: '-10%',
        height: '145%',
        margin: 'auto',
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 100,
        borderColor: '#6997DD',
    },
    patientImageSizing: {
        resizeMode: 'contain',
        width: '100%',
        borderWidth: 2,
        height: '100%',
    },
    changeimage: {
        marginLeft: '65%',
        top: '-25%',
    },
    profileSetting: {
        marginTop: '4%',
    },
    profileSetting2: {
        marginTop: '4%',
        width: '40%',
        marginLeft: '5%',
    },
    input: {
        height: 50,
        marginTop: '3%',
        marginLeft: '10%',
        width: '80%',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        borderColor: '#777777',
        backgroundColor: 'white',
    },
    input2: {
        height: 50,
        marginTop: '3%',
        marginLeft: '10%',
        width: '90%',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        borderColor: '#777777',
        backgroundColor: 'white',
    },
    profileinformationView: {
        height: '78%',
        backgroundColor: 'white',
    },
    settingcurrentText: {
        paddingLeft: '12%',
        fontSize: 12,
    },
    AgeWeight: {
        flexDirection: 'row',
        width: '100%',
    },
    profileSettings: {
        height: '5%',
        width: '30%',
        backgroundColor: '#6997DD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: '8%',
        marginLeft: '10%',
    },
    profileSettingsText: {
        color: 'white',
    },
});