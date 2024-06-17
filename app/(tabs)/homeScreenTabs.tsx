import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Timer from "@/components/Timer";
import Profile from "../profile";
import Thread from "../thread";
import { styles } from "@/assets/style";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (
        <Tab.Navigator initialRouteName="Timer">
            <Tab.Screen name = "Thread" component = {Thread}></Tab.Screen>
            <Tab.Screen name = "Timer" component = {Timer}></Tab.Screen>
            <Tab.Screen name = "Profile" component = {Profile}></Tab.Screen>
        </Tab.Navigator>
    )
}

