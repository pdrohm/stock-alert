import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddAlertScreen from '../screens/AddAlert/AddAlertScreen';
import WatchlistScreen from '../screens/Watchlist/WatchlistScreen';
import GraphScreen from '../screens/Graph/GraphScreen';
import {colors} from '../styles/colors';

const Tab = createBottomTabNavigator();

const AddAlertIcon = ({color, size}: {color: string; size: number}) => (
  <MaterialIcons name="add-alert" color={color} size={size} />
);

const WatchlistIcon = ({color, size}: {color: string; size: number}) => (
  <FontAwesome name="list-ul" color={color} size={size} />
);

const GraphIcon = ({color, size}: {color: string; size: number}) => (
  <MaterialCommunityIcons name="chart-line" color={color} size={size} />
);

const navigatorOptions = {
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: colors.primary,
  },
  tabBarActiveTintColor: colors.blue,
  tabBarInactiveTintColor: colors.quaternal,
};

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={navigatorOptions}>
      <Tab.Screen
        name="Add Alert"
        component={AddAlertScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: colors.primary},
          headerTintColor: colors.white,
          headerTitleStyle: {fontWeight: 'bold'},
          headerTitle: 'Add Alert',
          tabBarIcon: ({color, size}) => (
            <AddAlertIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: colors.primary},
          headerTintColor: colors.white,
          headerTitleStyle: {fontWeight: 'bold'},
          headerTitle: 'Watchlist',
          tabBarIcon: ({color, size}) => (
            <WatchlistIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Stock Graphs"
        component={GraphScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: colors.primary},
          headerTintColor: colors.white,
          headerTitleStyle: {fontWeight: 'bold'},
          headerTitle: 'Stock Graphs',
          tabBarIcon: ({color, size}) => (
            <GraphIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
