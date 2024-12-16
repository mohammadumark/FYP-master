import { StyleSheet, Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './login'
import Registration from './registration';
import ForgetPassword from './forget_password';
import Otpverification from './otpverification';
import Resetpassword from './reset';
import Doctor_one from './doctor_one_information';
import TopSpecialist from './top_specialist';
import GuideTip from './GuideAndTips';
import HomePage from './Homepage';
import PatientHistory from './patientHistory';
import CustomDrawerContent from './CustomDrawerContent';
import OtpverificationReset from './otpverification_reset';
import SplashScreen from './splashscreen';
import SymptomsScreen from './SymptomScreen';
import SymptomsMatched from './SymptomMatched';
import Settings from './Settings';
import PasswordSetting from './PasswordSetting';
import ProfileSetting from './ProfileSetting';
import Alert from './Alerts';
import SymptomsNotMatched from './symptomNotMatch';

const Drawer = createDrawerNavigator();
const stack =createNativeStackNavigator();

function DrawerNavigator() {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="HOME" component={HomePage} options={{ headerShown: false }} />
        <Drawer.Screen name="Guides and Tips" component={GuideTip} options={{ headerShown: false }} />
        <Drawer.Screen name="Patient History" component={PatientHistory} options={{ headerShown: false }} />
        <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      </Drawer.Navigator>
    );
  }
export default function Navigation({ }) {
    return(
    <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <stack.Screen
            name="SymptomCheck" 
            component={SymptomsScreen}>
        </stack.Screen>
        <stack.Screen
            name="SymptomMatch" 
            component={SymptomsMatched}>
        </stack.Screen>
        <stack.Screen
            name="SymptomNotMatch" 
            component={SymptomsNotMatched}>
        </stack.Screen>
        <stack.Screen 
            name='Login' 
            component={Login}>
        </stack.Screen>
        <stack.Screen
            name='Register' 
            component={Registration}>
        </stack.Screen>
        <stack.Screen
            name='forgetpassword' 
            component={ForgetPassword}>
        </stack.Screen>
        <stack.Screen
            name='Otpverify' 
            component={Otpverification}>
        </stack.Screen>
        <stack.Screen
            name='ResetPassword' 
            component={Resetpassword}>
        </stack.Screen>
        <stack.Screen
            name='OtpverifyReset' 
            component={OtpverificationReset}>
        </stack.Screen>
        <stack.Screen
            name='Home' 
            component={DrawerNavigator}>
        </stack.Screen>
        <stack.Screen
            name='specialists' 
            component={TopSpecialist}>
        </stack.Screen>
        <stack.Screen
            name="doctor" 
            component={Doctor_one}>
        </stack.Screen>
        <stack.Screen
            name="guide" 
            component={GuideTip}>
        </stack.Screen>
        <stack.Screen
            name="setting" 
            component={Settings}>
        </stack.Screen>
        <stack.Screen
            name="PasswordSetting" 
            component={PasswordSetting}>
        </stack.Screen>
        <stack.Screen
            name="ProfileSetting" 
            component={ProfileSetting}>
        </stack.Screen>
        <stack.Screen
            name="Alert" 
            component={Alert}>
        </stack.Screen>
        <stack.Screen
            name="CustomDrawer" 
            component={CustomDrawerContent}>
        </stack.Screen>
    </stack.Navigator>
    );
}
