import React, { useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Dimensions, Button } from "react-native";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";

const { width, height } = Dimensions.get('window');

const logout = async () => {
  await signOut(auth);
  console.log('User logged out successfully!');
}

export default function Profile() {
  console.log(auth.currentUser?.displayName); // User name
  return (
    <View style={{ height: height * 0.8, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Page</Text>
      <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 80 }}>
        <Button title="Logout" onPress={logout} color="#e74c3c" />
      </View>
    </View>
  );
}