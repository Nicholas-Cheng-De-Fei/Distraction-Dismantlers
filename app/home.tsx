import React from 'react';
import { Text, View, Button, Dimensions} from 'react-native';
import { styles, width, height } from '@/assets/style';
import { auth } from '../firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';

import Timer from '@/components/Timer';
import Thread from '@/app/thread';
import Profile from '@/app/profile';
import { Tabs } from './(tabs)/homeScreenTabs';

interface AuthenticatedScreenProps {
    user: { email: string } | null;
    handleAuthentication: () => void;
}

const Home: React.FC<AuthenticatedScreenProps> = ({ user, handleAuthentication}) => {
    const [page, setPage] = React.useState("Timer")

    const { displayName } = auth.currentUser;

    return (
        <View>
            <View style = {{width : width}}></View>
            <View style={{justifyContent : "center", alignItems : "center", paddingTop: 80}}>
                <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
            </View>
            <NavigationContainer independent = {true}>
                <Tabs/>
            </NavigationContainer>
        </View>
    );
};

export default Home;