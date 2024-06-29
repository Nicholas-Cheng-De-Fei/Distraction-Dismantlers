import React from 'react';
import { Text, View, Button, Dimensions } from 'react-native';
import { styles, width, height } from '@/assets/style';
import { NavigationContainer } from '@react-navigation/native';
import { Tabs } from './(tabs)/homeScreenTabs';


export default function Home() {
    const [page, setPage] = React.useState("Timer")

    return (
        <View>
            <View style={{ width: width }}></View>
            <NavigationContainer independent={true}>
                <Tabs />
            </NavigationContainer>
        </View>
    );
};