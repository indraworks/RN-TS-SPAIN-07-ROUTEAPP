import 'react-native-gesture-handler';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Permission from '../screens/PermissionScreen';
import MapScreen from '../screens/MapScreen';
import { StackParamList } from '../@types/navigation';
import PermissionScreen from '../screens/PermissionScreen';

const Stack = createNativeStackNavigator<StackParamList>();

const NavigationApp = () => {
  return (
    <Stack.Navigator
      initialRouteName="PermissionScreen"
      
      screenOptions={{
        headerShown: false,
        
      }}>
      <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};

export default NavigationApp;
