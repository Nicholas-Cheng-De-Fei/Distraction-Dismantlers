import React, { useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

export default function Profile() {

  return (
    <View style = {{height : height * 0.8, justifyContent : "center", alignItems : "center"}}>
        <Text>Profile Page</Text>
    </View>
  );
}