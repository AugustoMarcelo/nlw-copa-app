import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { Platform } from 'react-native';
import { CreatePoll } from '../screens/CreatePoll';
import { FindPoll } from '../screens/FindPoll';
import { PollDetails } from '../screens/PollDetails';
import { Polls } from '../screens/Polls';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: 'absolute',
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'ios' ? -10 : 0,
        },
      }}
    >
      <Screen
        name="CreatePool"
        component={CreatePoll}
        options={{
          tabBarIcon: ({ color }) => (
            <PlusCircle color={color} size={sizes[6]} />
          ),
          tabBarLabel: 'Create Poll',
        }}
      />

      <Screen
        name="Polls"
        component={Polls}
        options={{
          tabBarIcon: ({ color }) => (
            <SoccerBall color={color} size={sizes[6]} />
          ),
          tabBarLabel: 'Polls',
        }}
      />

      <Screen
        name="FindPoll"
        component={FindPoll}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Screen
        name="PollDetails"
        component={PollDetails}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
