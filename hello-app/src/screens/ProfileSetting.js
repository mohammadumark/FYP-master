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
    Alert,
    ScrollView,
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

    const [addUserInfo, { isLoading }] = useAddUserInfoMutation();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(false);
        setDate(currentDate);
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
        Alert.alert("Success", "Details saved successfully!");
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.header}>
                <AntDesign
                    onPress={() => navigation.goBack()}
                    name="arrowleft"
                    size={28}
                    color="#FFFFFF"
                />
                <Text style={styles.headerTitle}>Profile Setting</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.profileImageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={require('../images/doctor1.png')}
                    />
                    <TouchableOpacity style={styles.cameraIcon}>
                        <EvilIcons name="camera" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.profileInputContainer}>
                    <Text style={styles.label}>User Name</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        editable={false}
                    />
                </View>

                <View style={styles.profileInputContainer}>
                    <Text style={styles.label}>Gender</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setGender}
                        value={gender}
                    />
                </View>

                <View style={styles.profileInputContainer}>
                    <Text style={styles.label}>Date of Birth</Text>
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
                            onChange={onChange}
                        />
                    )}
                </View>

                <View style={styles.row}>
                    <View style={styles.halfInputContainer}>
                        <Text style={styles.label}>Age</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setAge}
                            value={age}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.halfInputContainer}>
                        <Text style={styles.label}>Weight</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setWeight}
                            value={weight}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.halfInputContainer}>
                        <Text style={styles.label}>Height</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setHeight}
                            value={height}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.halfInputContainer}>
                        <Text style={styles.label}>Blood Group</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setBloodGroup}
                            value={blood}
                        />
                    </View>
                </View>

                <Pressable onPress={handleSave} style={styles.saveButton}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>Save</Text>
                    )}
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        height: 60,
        backgroundColor: '#6997DD',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        marginLeft: 15,
    },
    scrollContainer: {
        padding: 20,
        alignItems: 'center',
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#6997DD',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#6997DD',
        borderRadius: 20,
        padding: 5,
    },
    profileInputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
    },
    halfInputContainer: {
        width: '48%',
    },
    saveButton: {
        height: 50,
        width: '60%',
        backgroundColor: '#6997DD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
