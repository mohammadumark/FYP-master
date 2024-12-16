import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar,Pressable ,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavigationContainer from '@react-navigation/native';
export default function Doctor_one({ }) {
    const navigation = useNavigation();
    return (
        <View style={styles.frame1} >
              {/* <statusbar style="auto"/> */}
            <View style={styles.top_specialist_header}>
                <AntDesign onPress={() => navigation.navigate("specialists")} style={styles.back_arrow_icon} name="arrowleft" size={30} color="#6997DD" ></AntDesign>
                <Text style={styles.top_specialist_header_text}>Detail Doctor</Text>
            </View>
            <View style={styles.detail_doctor_image} >
                <Image style={styles.detail_doctor_image_seeting} source={require("../images/doctor2.png")}></Image>
                <View style={styles.detail_doctor_Name}>
                    <Text style={styles.detail_doctor_Name_text}>Dr. Owais</Text>
                    <Text style={styles.detail_doctor_Name_text_two}>Hepatologist Specialist</Text>
                </View>
                <View style={styles.detail_doctor_image_icon}>
                    <AntDesign name="message1" size={24} color="#6997DD" />
                </View>
            </View>
            <View style={styles.detail_doctor_fee_info}>
                <View style={styles.detail_doctor_fee}>
                    <View style={styles.detail_doctor_fee_icon}>
                        <FontAwesome name="dollar" size={22} color="#F24E1E" />
                    </View>
                    <View>
                        <Text style={styles.detail_doctor_fee_text_one}>Fee</Text>
                        <Text style={styles.detail_doctor_fee_text_two}>2000 Rs</Text>
                    </View>
                </View>

                <View style={styles.detail_doctor_fee}>
                    <View style={styles.detail_doctor_fee_icon}>
                        <AntDesign name="star" size={20} color={"#FFC700"} />

                    </View>
                    <View>
                        <Text style={styles.detail_doctor_fee_text_one}>160</Text>
                        <Text style={styles.detail_doctor_fee_text_two}>Reviews</Text>
                    </View>
                </View>

                <View style={styles.detail_doctor_fee}>
                    <View style={styles.detail_doctor_fee_icon}>
                        <MaterialCommunityIcons style={styles.detail_doctor_exper_icon} name="cookie-clock-outline" size={24} color="#F24E1E" />
                    </View>
                    <View>
                        <Text style={styles.detail_doctor_fee_text_one}>2+ Years</Text>
                        <Text style={styles.detail_doctor_fee_text_two}>Experience</Text>
                    </View>
                </View>

            </View>
            <View style={styles.description}>
                <Text style={styles.description_text_one}>Description</Text>
                <View style={styles.description_text}>
                    <Text style={styles.description_text_two}>Dr. Owais is a Hepatologist specialist serving in Shifa International Hospital Islamabad.
                        He is dedicated in providing services to people. He is noble and kind by profession.</Text>
                </View>
            </View>

            <View>
                <Text style={styles.schedule_text_one}>Schedules</Text>
                <View style={styles.schedule_boxes_arng}>
                    <View style={styles.schedule_boxes} >
                        <Text>Mon</Text>
                        <Text>1</Text>
                    </View>
                    <View style={styles.schedule_boxes} >
                        <Text>Tue</Text>
                        <Text>2</Text>
                    </View>
                    <View style={styles.schedule_boxes} >
                        <Text>Wed</Text>
                        <Text>3</Text>
                    </View>
                    <View style={styles.schedule_boxes} >
                        <Text>Thru</Text>
                        <Text>4</Text>
                    </View>
                    <View style={styles.schedule_boxes} >
                        <Text>Fri</Text>
                        <Text>5</Text>
                    </View>
                    <View style={styles.schedule_boxes} >
                        <Text>Sat</Text>
                        <Text>6</Text>
                    </View>

                </View>
            </View>
            <View>
                <Text style={styles.schedule_text_one}>Time</Text>
                <View style={styles.schedule_first_four}>
                    <View style={styles.time_boxes}>
                        <Text style={styles.time_boxes_text}>03:00PM</Text>
                    </View>
                    <View style={styles.time_boxes}>
                        <Text style={styles.time_boxes_text} >03:00PM</Text>
                    </View>
                    <View style={styles.time_boxes}>
                        <Text style={styles.time_boxes_text}>03:00PM</Text>
                    </View>
                    <View style={styles.time_boxes}>
                        <Text style={styles.time_boxes_text}>03:00PM</Text>
                    </View>
                </View>
                <View style={styles.schedule_first_four}>
                    <View style={styles.time_boxes}>
                        <Text style={styles.time_boxes_text}>03:00PM</Text>
                    </View>
                    <View style={styles.time_boxes}>
                        <Text style={styles.time_boxes_text} >03:00PM</Text>
                    </View>
                    <View style={styles.time_boxes}>
                        <Text style={styles.time_boxes_text}>03:00PM</Text>
                    </View>
                    <View style={styles.time_boxes}>
                        <Text style={styles.time_boxes_text}>03:00PM</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.schedule_text_one}>Date</Text>
                <TextInput
                    style={styles.input}
                    placeholder="dd-mm-yyyy"
                />
            </View>
            <Pressable style={styles.request_btn}  >
                <Text style={styles.request_button}
                > Proceed To Appointment</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    frame1: {
        backgroundColor: "#F9F9F9",
        height: "100%",
    },
    top_specialist_header: {
        backgroundColor: "#6997DD",
        height: 130,
        width: "100%",
        flexDirection: "row"
    },
    top_specialist_header_text: {
        fontSize: 16,
        paddingLeft: "25%",
        marginTop: 40,
        color: "#ffffff"
    },
    back_arrow_icon: {
        paddingLeft: 15,
        marginTop: 40,
        color: "#ffffff"
    },
    detail_doctor_image: {
        height: 110,
        alignItems: 'center',
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
    },
    detail_doctor_image_seeting: {
        marginLeft: 40,
        top: -45,
        position: "absolute",
        height: 90,
        resizeMode: "contain",
        borderRadius: 100,
        borderColor: "black",
        borderWidth: 1,
        width: "27%",
        backgroundColor: "white"
    },
    detail_doctor_Name: {
        marginTop: "14%",
    },
    detail_doctor_Name_text: {
        left: "7%",
        fontSize: 20,
        fontWeight: "600",
    },
    detail_doctor_Name_text_two: {
        fontSize: 12,
    },
    detail_doctor_image_icon: {
        left: "40%",
        top: "-85%",
    },
    detail_doctor_fee_info: {
        height: 80,
        flexDirection: "row",
        // backgroundColor: "red"
    },
    detail_doctor_fee_icon: {
        left: "-20%"
    },
    detail_doctor_exper_icon: {
        left: "15%"
    },
    detail_doctor_fee: {
        flexDirection: "row",
        marginLeft: 10,
        marginTop: 14,
        backgroundColor: "#FFFFFF",
        width: "30%",
        height: 50,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    detail_doctor_fee_text_one: {
        fontSize: 12,
        fontWeight: "500"
    },
    detail_doctor_fee_text_two: {
        fontSize: 12,
        fontWeight: "400"
    },
    description: {
        marginTop: 10
    },
    description_text_one: {
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 10
    },
    description_text_two: {
        fontSize: 12,
        fontWeight: "400",
        textAlign: "justify"
    },
    description_text: {
        maxWidth: "95%",
        marginLeft: 10
    },
    schedule_text_one: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: "600",
        marginTop: 10,
    },
    schedule_boxes: {
        marginLeft: 13,
        backgroundColor: "#FFFFFF",
        width: 45,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 10
    },
    schedule_boxes_arng: {
        flexDirection: "row",
    },
    time_boxes: {
        marginLeft: 13,
        backgroundColor: "#FFFFFF",
        width: 70,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 10,
    },
    schedule_first_four: {
        flexDirection: "row",
        marginLeft: 10,
    },
    time_boxes_text: {
        fontSize: 12,
        fontWeight: "400",
        color: "#959494"
    },
    input: {
        height: 40,
        marginTop: 10,
        marginLeft: 8,
        width: "40%",
        borderWidth: 1,
        textAlign: "center",
        padding: 10,
        color: "#959494",
        borderColor: "#777777",
        backgroundColor: "white",
        borderRadius: 100,
    },
    request_btn: {
        width: "95%",
        height: 35,
        marginLeft: 10,
        marginTop: 13,
        backgroundColor: "#6997DD",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
      },
      request_button: {
        // lineHeight: 50,
        fontSize: 14,
        color: "#FFFFFF",
        
      },
}); 