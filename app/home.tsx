import React from 'react';
import { View, Text, Button, Image, Pressable, Dimensions} from 'react-native';
import { styles } from '@/assets/style';
import { auth } from '../firebaseConfig';
import Timer from '@/components/Timer';

import Thread from '@/app/thread';
import Profile from '@/app/profile';

const { width, height } = Dimensions.get('window');

interface AuthenticatedScreenProps {
    user: { email: string } | null;
    handleAuthentication: () => void;
}

const Home: React.FC<AuthenticatedScreenProps> = ({ user, handleAuthentication}) => {
    const [page, setPage] = React.useState("Timer")

    const { displayName } = auth.currentUser;
    return (
        <View>
            <View style={{justifyContent : "center", alignItems : "center", paddingTop: 80}}>
                <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
            </View>

            {page == "Timer"
                ?<Timer/>
                :<View>
                    {page == "Thread"
                        ?<Thread/>
                        :<Profile/>
                    }
                </View>
            }   

    
            <View style = {{backgroundColor : "white", width : width, height : 70, justifyContent : "space-around", alignItems : "center", flexDirection : "row"}}>
                    <View style = {{alignItems : "center", justifyContent : "center"}}>
                        <Image source = {require('../assets/images/Navbar-icon/communication.png')} style = {{height: 40,width: 40, resizeMode: 'contain'}}></Image>
                        <Pressable onPress={() => setPage("Thread")}>
                            <Text>Thread</Text>
                        </Pressable>
                    </View>
                    <View style = {{alignItems : "center", justifyContent : "center"}}>
                        <Image source = {require('../assets/images/Navbar-icon/home.png')} style = {{height: 40,width: 40, resizeMode: 'contain'}}></Image>
                        <Pressable onPress={() => setPage("Timer")}>
                            <Text>Home</Text>
                        </Pressable>
                    </View>
                    <View style = {{alignItems : "center", justifyContent : "center"}}>
                        <Image source = {require('../assets/images/Navbar-icon/user.png')} style = {{height: 40,width: 40, resizeMode: 'contain'}}></Image>
                        <Pressable onPress={() => setPage("Profile")}>
                            <Text>Home</Text>
                        </Pressable>
                    </View>
            </View>

        </View>

        
    );
};

export default Home;
