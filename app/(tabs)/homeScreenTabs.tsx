import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Timer from "@/components/Timer";
import Profile from "../profile";
import Thread from "../thread";
import Leaderboard from "@/components/LeaderBoard";
import { styles, NavHomeButton } from "@/assets/style";
import { View, Text, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

 function App(){
    return(
            <Stack.Navigator  initialRouteName="Profile"  screenOptions={{
                headerShown: false,}}>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Leaderboard" component={Leaderboard}/>
            </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Timer"
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.navContainer,
                headerShadowVisible: true,
                tabBarShowLabel: false,
            }}
        >
         
            <Tab.Screen name="Thread" component={Thread}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={require('@/assets/images/Navbar-icon/thread.png')}
                                resizeMode='contain'
                                style={{
                                    width: 40,
                                    height: 40,
                                    tintColor: focused ? '#FF7F7F' : '#8e918f',
                                }}
                            ></Image>
                            <Text style={{ top: 5, color: focused ? '#FF7F7F' : '#8e918f', }}>Thread</Text>
                        </View>
                    ),
                }}
            ></Tab.Screen>
            <Tab.Screen name="Timer" component={Timer}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('@/assets/images/Navbar-icon/book.png')}
                            resizeMode='contain'
                            style={{
                                width: 40,
                                height: 40,
                                tintColor: 'white',
                            }}
                        ></Image>
                    ),
                    tabBarButton: (props) => <NavHomeButton {...props} />
                }}
            ></Tab.Screen>
            <Tab.Screen name="Profile" component={App}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={require('@/assets/images/Navbar-icon/profile.png')}
                                resizeMode='contain'
                                style={{
                                    width: 40,
                                    height: 40,
                                    tintColor: focused ? '#FF7F7F' : '#8e918f',
                                }}
                            ></Image>
                            <Text style={{ top: 5, color: focused ? '#FF7F7F' : '#8e918f', }}>Profile</Text>
                        </View>
                    ),
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    )
}

