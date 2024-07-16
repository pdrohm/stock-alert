import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddAlertScreen from '../screens/AddAlert/AddAlertScreen';
import WatchlistScreen from '../screens/Watchlist/WatchlistScreen';
import GraphScreen from '../screens/Graph/GraphScreen';

const Tab = createBottomTabNavigator();

// Definição das constantes para os ícones
const AddAlertIcon = ({color, size}: {color: string; size: number}) => (
  <MaterialIcons name="add-alert" color={color} size={size} />
);

const WatchlistIcon = ({color, size}: {color: string; size: number}) => (
  <FontAwesome name="list-ul" color={color} size={size} />
);

const GraphIcon = ({color, size}: {color: string; size: number}) => (
  <MaterialCommunityIcons name="chart-line" color={color} size={size} />
);

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Add Alert"
          component={AddAlertScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <AddAlertIcon color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Watchlist"
          component={WatchlistScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <WatchlistIcon color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Graph"
          component={GraphScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <GraphIcon color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
