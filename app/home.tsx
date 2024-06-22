import React from 'react';
import { Text, View, Button, Dimensions } from 'react-native';
import { styles, width, height } from '@/assets/style';
import { auth } from '../firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';

import Timer from '@/components/Timer';
import Thread from '@/app/thread';
import Profile from '@/app/profile';
import { Tabs } from './(tabs)/homeScreenTabs';


export default function Home() {
    const [page, setPage] = React.useState("Timer")

    console.log(auth.currentUser?.displayName);

    return (
        <View>
            <View style={{ width: width }}></View>
            <NavigationContainer independent={true}>
                <Tabs />
            </NavigationContainer>
        </View>
    );
};