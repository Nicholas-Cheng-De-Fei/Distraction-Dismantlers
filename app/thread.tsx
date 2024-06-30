import React, { useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Dimensions} from "react-native";
import { auth } from "@/firebaseConfig";
import { width, height } from "@/assets/style";

const user = auth!.currentUser;
export default function Thread() {

  return (
    <View style = {{height : height * 0.8, justifyContent : "center", alignItems : "center"}}>
        <Text>Thread Page</Text>
        <Text>Hello</Text>
    </View>
  );
}