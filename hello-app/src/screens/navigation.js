import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './login';
import Registration from './registration';
import ForgetPassword from './forget_password';
import Otpverification from './otpverification';
import Resetpassword from './reset';
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
import DoctorDetailsScreen from './DoctorDetailsScreen'; // New screen for doctor details

const Drawer = createDrawerNavigator();
const stack = createNativeStackNavigator();

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

export default function Navigation() {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <stack.Screen name="SymptomCheck" component={SymptomsScreen} />
      <stack.Screen name="SymptomMatch" component={SymptomsMatched} />
      <stack.Screen name="SymptomNotMatch" component={SymptomsNotMatched} />
      <stack.Screen name="Login" component={Login} />
      <stack.Screen name="Register" component={Registration} />
      <stack.Screen name="forgetpassword" component={ForgetPassword} />
      <stack.Screen name="Otpverify" component={Otpverification} />
      <stack.Screen name="ResetPassword" component={Resetpassword} />
      <stack.Screen name="OtpverifyReset" component={OtpverificationReset} />
      <stack.Screen name="Home" component={DrawerNavigator} />
      <stack.Screen name="specialists" component={TopSpecialist} />
      <stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} />
      <stack.Screen name="guide" component={GuideTip} />
      <stack.Screen name="setting" component={Settings} />
      <stack.Screen name="PasswordSetting" component={PasswordSetting} />
      <stack.Screen name="ProfileSetting" component={ProfileSetting} />
      <stack.Screen name="Alert" component={Alert} />
      <stack.Screen name="CustomDrawer" component={CustomDrawerContent} />
    </stack.Navigator>
  );
}
