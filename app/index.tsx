import React, { useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";


import Onboarding from "../components/Onboarding";
import Login from "./Login";
import { Text, View } from "react-native";
import { styles } from "@/assets/style";
import Leaderboard from "@/components/LeaderBoard";

export default function Index() {

  const Stack = createNativeStackNavigator(); 

  const [hasLaunchedFirstTime, setHasLaunchedFirstTime] = React.useState(true);

  const checkFirstLaunched = async () => {
    try {
      const value = await AsyncStorage.getItem('hasLaunchedFirstTime');
      if (value != null) {
        setHasLaunchedFirstTime(false);
      }
    } catch (error) {
      console.log('Error hasLaunchedFirstTime: ', error);
    }
  }

  useEffect(() => {
    checkFirstLaunched();
  }, [])

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      }}>
      {hasLaunchedFirstTime ? <Stack.Screen name = "Onboarding" component = {Onboarding}></Stack.Screen> 
      : null}
      <Stack.Screen name = "Login" component = {Login}></Stack.Screen>
      <Stack.Screen name="Leaderboard" component={Leaderboard} />
    </Stack.Navigator>    
  );
}