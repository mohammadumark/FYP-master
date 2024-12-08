import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform, Image, TextInput, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

export default function GuideTip({ }) {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.GuideTipHeader}>
                <View style={styles.GuideTipHeaderdata}>
                    <View style={styles.GuideTipbackicon}>
                        <AntDesign onPress={() =>navigation.navigate('HOME')} style={styles.back_arrow_icon} name="arrowleft" size={34} color="#FFFFFF" ></AntDesign>
                    </View>
                    <View style={styles.GuideTiptext}>
                        <Text style={styles.GuideTiptextChnging}>Guide And Tips</Text>
                    </View>
                </View>
                <View style={styles.GuideTipIconView}>
                    <View style={styles.GuideTipIconborder}>
                        <FontAwesome5 name="info" size={24} color="white" />
                    </View>
                </View>
            </View>
            <View style={styles.GuideTipspointView}>
                <View style={styles.GuideTipspointViewchart}>
                     <View  style={styles.GuideTipspointsalign}>
                        <View  style={styles.GuideTipspoints}>
                        </View>
                        <Text style={styles.GuideTipspointstext}>This app will detect and locate the tumor presence in  liver
                             with the help of CT scan processing</Text>
                    </View>

                    <View  style={styles.GuideTipspointsaligntwo}>
                        <View  style={styles.GuideTipspointstwo}>
                        </View>
                        <Text style={styles.GuideTipspointstext}>All we have to do is to first perform segmentation so that liver should be  separated from other organs and 
                            then perform other processing and generate the diagnosis  report</Text>
                    </View>

                    <View  style={styles.GuideTipspointsaligntwo}>
                        <View  style={styles.GuideTipspointstwo}>
                        </View>
                        <Text style={styles.GuideTipspointstext} >This app will detect and locate the tumor presence in  liver
                             with the help of CT scan processing</Text>
                    </View>

                    <View  style={styles.GuideTipspointsalignthree}>
                        <View  style={styles.GuideTipspointsthree}>
                        </View>
                        <Text style={styles.GuideTipspointstext}>This app will detect and locate the tumor presence in  liver
                             with the help of CT scan processing</Text>
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
    GuideTipHeader: {
        height: "20%",
    },
    GuideTipHeaderdata: {
        height: "40%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems:"center"
    },
    GuideTipbackicon: {
        marginStart: "6%"
    },
    GuideTiptext: {
        marginStart: "18%"
    },
    GuideTiptextChnging: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "medium"
    },
    GuideTipIconView: {
        height: "60%",
        // backgroundColor: "red",
        // justifyContent:"center",
        alignItems:"center"
    },
    GuideTipIconborder: {
        height: "60%",
        width: "15%",
        backgroundColor: "#2F88FF",
        alignItems:"center",
        justifyContent:"center",
        borderWidth:5,
    },
    GuideTipspointView:{
        height:"80%",
        backgroundColor:"white",
        borderTopLeftRadius: 40, 
        borderTopRightRadius: 40,
    },
    GuideTipspointViewchart:{
        height:"70%",
        backgroundColor:"#e0e4f4",
        marginTop:"4%",
        borderRadius:50
    },
    GuideTipspoints:{
        height:"18%",
        width:"4%",
        backgroundColor:"#6997DD",
        marginTop:"1%",
        marginLeft:"3%"
    },
    GuideTipspointstwo:{
        height:"11%",
        width:"4%",
        backgroundColor:"#6997DD",
        marginTop:"1%",
        marginLeft:"3%"
    },
    GuideTipspointsthree:{
        height:"13%",
        width:"4%",
        backgroundColor:"#6997DD",
        marginTop:"1%",
        marginLeft:"3%"
    },
    GuideTipspointsalign:{
        flexDirection:"row",
        height:"16%",
        width:"93%",
        marginTop:"9%",
        marginLeft:"3%"
    },
    GuideTipspointstext:{
        fontSize:13,
        textAlign:"justify",
        paddingLeft:"5%",
    },
    GuideTipspointsaligntwo:{
        flexDirection:"row",
        height:"25%",
        maxWidth:"90%",
        marginLeft:"3%"
    },
    GuideTipspointsalignthree:{
        flexDirection:"row",
        height:"20%",
        maxWidth:"90%",
        marginTop:"-9%",
        marginLeft:"3%"
    },
});