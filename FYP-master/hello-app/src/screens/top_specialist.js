import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function TopSpecialist({ }) {
    const navigation =useNavigation();
    return (  
        <View style={styles.frame1} >
            <StatusBar style="auto"/>
            <View style={styles.top_specialist_header}>
                <AntDesign onPress={() => navigation.navigate("Home")} style={styles.back_arrow_icon} name="arrowleft" size={30} color="#6997DD" ></AntDesign>
                <Text style={styles.top_specialist_header_text}>Popular Doctor</Text>
            </View>
            <View style={styles.doctor_one_information_card}>
                <View style={styles.doctor_one_image}>
                    <Image style={styles.doctor_one_image_settings} source={require('../images/doctor1.png')}></Image>
                </View>
                <View style={styles.doctor_one_name}>
                    <Text style={styles.doctor_one_name_text_one}> Dr. Owais</Text>
                    <Text style={styles.doctor_one_name_text_two}>Hepatologist Specialist</Text>
                    <View style={styles.doctor_one_nested_rating}>
                        <AntDesign name="star" size={20} style={styles.doctor_one_icon_color} />
                        <Text style={styles.doctor_one_name_text_three}>4.5 (150+ Reviews)</Text>
                    </View>
                </View>
                <View style={styles.detail_view}>
                    <Pressable onPress={() => navigation.navigate("doctor")} style={styles.detail_view_nested}>
                        <Text style={styles.detail_view_text}>Detail</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.doctor_two_information_card}>
                <View style={styles.doctor_one_image}>
                    <Image style={styles.doctor_one_image_settings} source={require('../images/doctor2.png')}></Image>
                </View>
                <View style={styles.doctor_one_name}>
                    <Text style={styles.doctor_one_name_text_one}> Dr. Danish</Text>
                    <Text style={styles.doctor_one_name_text_two}>Hepatologist Specialist</Text>
                    <View style={styles.doctor_one_nested_rating}>
                        <AntDesign name="star" size={20} style={styles.doctor_one_icon_color} />
                        <Text style={styles.doctor_one_name_text_three}>4.7 (160+ Reviews)</Text>
                    </View>
                </View>
                <View style={styles.detail_view}>
                    <View style={styles.detail_view_nested}>
                        <Text style={styles.detail_view_text}>Detail</Text>
                    </View>
                </View>
            </View>
            <View style={styles.doctor_two_information_card}>
                <View style={styles.doctor_one_image}>
                    <Image style={styles.doctor_one_image_settings} source={require('../images/doctor3.png')}></Image>
                </View>
                <View style={styles.doctor_one_name}>
                    <Text style={styles.doctor_one_name_text_one}> Dr. Maham</Text>
                    <Text style={styles.doctor_one_name_text_two}>Hepatologist Specialist</Text>
                    <View style={styles.doctor_one_nested_rating}>
                        <AntDesign name="star" size={20} style={styles.doctor_one_icon_color} />
                        <Text style={styles.doctor_one_name_text_three}>4.3 (105+ Reviews)</Text>
                    </View>
                </View>
                <View style={styles.detail_view}>
                    <View style={styles.detail_view_nested}>
                        <Text style={styles.detail_view_text}>Detail</Text>
                    </View>
                </View>
            </View>
            <View style={styles.doctor_two_information_card}>
                <View style={styles.doctor_one_image}>

                    <Image style={styles.doctor_one_image_settings} source={require('../images/doctor1.png')}></Image>
                </View>
                <View style={styles.doctor_one_name}>
                    <Text style={styles.doctor_one_name_text_one}> Dr. kumar</Text>
                    <Text style={styles.doctor_one_name_text_two}>Hepatologist Specialist</Text>
                    <View style={styles.doctor_one_nested_rating}>
                        <AntDesign name="star" size={20} style={styles.doctor_one_icon_color} />
                        <Text style={styles.doctor_one_name_text_three}>4.3 (105+ Reviews)</Text>
                    </View>
                </View>
                <View style={styles.detail_view}>
                    <View style={styles.detail_view_nested}>
                        <Text style={styles.detail_view_text}>Detail</Text>
                    </View>
                </View>
            </View>
            
            <View style={styles.doctor_two_information_card}>
                <View style={styles.doctor_one_image}>

                    <Image style={styles.doctor_one_image_settings} source={require('../images/doctor1.png')}></Image>
                </View>
                <View style={styles.doctor_one_name}>
                    <Text style={styles.doctor_one_name_text_one}> Dr. Basit</Text>
                    <Text style={styles.doctor_one_name_text_two}>Hepatologist Specialist</Text>
                    <View style={styles.doctor_one_nested_rating}>
                        <AntDesign name="star" size={20} style={styles.doctor_one_icon_color} />
                        <Text style={styles.doctor_one_name_text_three}>4.3 (105+ Reviews)</Text>
                    </View>
                </View>
                <View style={styles.detail_view}>
                    <View style={styles.detail_view_nested}>
                        <Text style={styles.detail_view_text}>Detail</Text>
                    </View>
                </View>
            </View>
            
        </View>
    );
}
const styles = StyleSheet.create({
    frame1: {
        backgroundColor: "#F9F9F9",
        height: "100%",
    },
    top_specialist_header:{
        backgroundColor: "#6997DD",
        height: 100,
        width: "100%",
        alignItems: "center",
        flexDirection: "row"
    },
    top_specialist_header_text: {
        fontSize: 16,
        paddingLeft: "20%",
        color:"#ffffff"
    },
    back_arrow_icon: {
        paddingLeft: 15,
        color:"#ffffff"
    },
    doctor_one_image: {
        alignItems: "center",
        justifyContent: "center",
        width: "25%"
    },
    doctor_one_nested_rating: {
        flexDirection: "row",
    },
    doctor_one_information_card: {
        flexDirection: "row",
        width: "90%",
        marginLeft: '5%',
        borderRadius:20,
        height: 90,
        marginTop:50,
        backgroundColor: "#FFFFFF",
    },
    doctor_one_image_settings: {
        resizeMode: "contain",
        height: 50,
        borderRadius: 100,
        borderColor: "black",
        borderWidth: 1,
        width: 50,
    },
    doctor_one_name: {
        width: 150,
        justifyContent: "center",
        // backgroundColor: "purple"
    },
    doctor_one_name_text_one: {
        fontSize: 15,
        fontWeight: "600",
        lineHeight: 25
    },
    doctor_one_name_text_two: {
        fontSize: 12,
        marginLeft: 5,
    },
    doctor_one_name_text_three: {
        fontSize: 10,
        marginTop: 9,
    },
    doctor_one_icon_color: {
        color: "#FFC700",
        marginTop: 4,
        marginLeft: 4
    },
    detail_view: {
        width: "28%",
    },
    detail_view_text: {
        textAlign: "center",
        fontSize: 12,
        color:"#FFFFFF"
    },
    detail_view_nested: {
        width: "90%",
        marginTop: 37,
        marginLeft: 6,
        borderRadius: 100,
        borderWidth: 1,
        borderColor:"#6997DD",
        backgroundColor: "#57B8E8"

    },
    doctor_two_information_card: {
        flexDirection: "row",
        width: "90%",
        marginLeft: '5%',
        borderRadius:20,
        height: 90,
        marginTop:20,
        backgroundColor: "#FFFFFF",
    },
});