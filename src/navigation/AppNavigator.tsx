import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddAlertScreen from "../screens/AddAlert/AddAlertScreen";
import WatchlistScreen from "../screens/Watchlist/WatchlistScreen";
import GraphScreen from "../screens/Graph/GraphScreen";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen 
          name="Add Alert" 
          component={AddAlertScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="add-alert" color={color} size={size} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Watchlist" 
          component={WatchlistScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="list-ul" color={color} size={size} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Graph" 
          component={GraphScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-line" color={color} size={size} />
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
