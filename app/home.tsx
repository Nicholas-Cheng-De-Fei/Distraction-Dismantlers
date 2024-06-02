import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '@/assets/style';
import { auth } from '../firebaseConfig';
import Timer from '@/components/Timer';

interface AuthenticatedScreenProps {
    user: { email: string } | null;
    handleAuthentication: () => void;
}

const Home: React.FC<AuthenticatedScreenProps> = ({ user, handleAuthentication }) => {
    const { displayName } = auth.currentUser;
    return (
        <View>
            <View style={{justifyContent : "center", alignItems : "center", paddingBottom : 100}}>
                {/* <Text style={styles.title}>Greetings!</Text>
                {user && <Text style={styles.emailText}>{displayName}</Text>} */}
                <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
            </View>
            <View>
                <Timer/>
            </View>
        </View>

        
    );
};

export default Home;
