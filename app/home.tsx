import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../assets/style';
import { auth } from '../firebaseConfig';

interface AuthenticatedScreenProps {
    user: { email: string } | null;
    handleAuthentication: () => void;
}

const AuthenticatedScreen: React.FC<AuthenticatedScreenProps> = ({ user, handleAuthentication }) => {
    const { displayName } = auth.currentUser;
    return (
        <View style={styles.authContainer}>
            <Text style={styles.title}>Greetings!</Text>
            {user && <Text style={styles.emailText}>{displayName}</Text>}
            <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
        </View>
    );
};

export default AuthenticatedScreen;
