
// import Otpverification from './src/screens/otpverification';
import Login from './src/screens/login';
import Otpverification from './src/screens/otpverification';
import { Alert, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import GuideTip from './src/screens/GuideAndTips';
import ForgetPassword from './src/screens/forget_password';
import Registration from './src/screens/registration';
import TopSpecialist from './src/screens/top_specialist';
import PatientHistory from './src/screens/patientHistory';
import Navigation from './src/screens/navigation';
import HomePage from './src/screens/Homepage';
import Doctor_one from './src/screens/doctor_one_information';
import SplashScreen from './src/screens/splashscreen';
import SymptomsScreen from './src/screens/SymptomScreen';
import SymptomsMatched from './src/screens/SymptomMatched';
import SymptomsNotMatched from './src/screens/symptomNotMatch';
import Settings from './src/screens/Settings';
import PasswordSetting from './src/screens/PasswordSetting';
import Alerts from './src/screens/Alerts';
import ProfileSetting from './src/screens/ProfileSetting';
import { Provider } from 'react-redux';
import { ProfileImageProvider } from './src/screens/ProfileImageUpdation'
import UserRegistrationStore from './RTKBackend/Stores/UserRegistrationStore';
import { EmailProvider,NameProvider } from './src/screens/DataContext';
export default function App() {

  return (
    <Provider store={UserRegistrationStore}>
      <EmailProvider>
      <NameProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      </NameProvider>
      </EmailProvider>
     
    </Provider>
  );
}
