import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreatePoll } from '../screens/CreatePoll';
import { Polls } from '../screens/Polls';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="CreatePool" component={CreatePoll} />

      <Screen name="Polls" component={Polls} />
    </Navigator>
  );
}
