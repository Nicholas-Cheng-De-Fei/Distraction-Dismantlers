import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { styles } from '@/assets/style';
import { auth } from '../firebaseConfig';
import Home from './home'; // Import the new component
import { useNavigation } from '@react-navigation/native';

interface AuthScreenProps {
  username: string;
  setUsername: (username: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  handleAuthentication: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isLogin,
  setIsLogin,
  handleAuthentication,
}) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Let the Adventure Begin!' : 'Sign Up'}</Text>
      {!isLogin && (
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />
      )}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      {!isLogin && (
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Re-type Password"
          secureTextEntry
        />
      )}
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Login' : 'Sign Up'} onPress={handleAuthentication} color="#90C8AC" />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
}

export default function Login() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLogin, setIsLogin] = useState(true);

  // Need constant listener as even if auth.currentUser changes, react wouldnt update
  useEffect(() => {
    const listener  = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => listener ();
  }, []);

  const handleAuthentication = async () => {
    if (!isLogin) { // Sign up errors
      if (!email || !password || !confirmPassword || !username) {
        Alert.alert('Sign Up Error (Empty fields)', 'Please make sure all fields are filled.');
        return;
      }
      else if ((password !== confirmPassword)) {
        Alert.alert('Sign Up Error (Password)', 'Please make sure that you entered the same password in both fields.');
        return;
      }
    }
    else if (isLogin) {// Login Errors
      if (!email || !password) {
        Alert.alert('Sign In Error (Empty fields)', 'Please make sure all fields are filled.');
        return;
      }
    }
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
          // Signed in 
          const user3 = userCredential.user;
          console.log(user3);
        })
        console.log('User signed in successfully!');

      } else {
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, { displayName: username });
          console.log('User created successfully!');
        });

        // await signOut(auth); // User needs to login again
        // Alert.alert('Sign Up Successful!', 'Please Login with your new account');

      }

    } catch (error: any) { // Custom Error Messages
      var header = "Authentication Error";
      let errMsg: string = error.message;

      var invalidLogin = "Firebase: Error (auth/invalid-credential).";

      if (invalidLogin == (errMsg)) {
        errMsg = "Incorrect email or password"
      }
      else {
        // header = 'Authentication Error (Too many Attempts)';
        errMsg = errMsg.slice(10);
      }


      Alert.alert(header, errMsg);
    }
  };

  return (
    <View style={{ flexGrow: 1 }}>
      {isAuthenticated ? ( // If user successfully logs in then route to home page
        <View style={styles.homeContainer}>
          <Home />
        </View>
      ) : (
        <View style={styles.logincontainer}>
          <AuthScreen
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleAuthentication={handleAuthentication}
          />
        </View>
      )}
    </View>
  );
}
