import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreatePool } from '../screens/CreatePool';
import { Pools } from '../screens/Pools';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="CreatePool" component={CreatePool} />

      <Screen name="Pools" component={Pools} />
    </Navigator>
  );
}
