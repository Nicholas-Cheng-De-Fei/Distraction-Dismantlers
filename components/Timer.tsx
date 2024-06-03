import React from 'react';
import { Dimensions, Image ,View, Text, Button, Pressable, BackHandler} from 'react-native';
import { styles } from '@/assets/style';
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
const { width, height } = Dimensions.get('window');

const createArray = (length: number, type : String) => {
    const arr = [];

    if (type == "Hour") {
        for (let i = 0; i <= length; i++) {
            arr.push(i);
        }
    } else {
        for (let i = 0; i <= length; i+= 5) {
            arr.push(i);
        }
    }


    return arr
};

export default function Timer () {

    const hours = createArray(24, "Hour");
    const minutes = createArray(60, "Minute");

    const [selectedHour, setSelectedHour] = React.useState(0);
    const [selectedMinute, setSelectedMinute] = React.useState(5);
    const [isTimerActive, setIsTimerActive] = React.useState(false);
    const [duration, setDuration] = React.useState(0);

    const startTimer = () => {

        let val = selectedHour * 60 * 60 + selectedMinute * 60

        setDuration(val);

        setTimeout (() => {
            if (duration == val && val != 0) {
                setIsTimerActive(true);
            }
        },0)
    }

    const endTimer = () => {
        setIsTimerActive(false);
        setSelectedMinute(selectedMinute)
    }


    const renderCountdownTimer = (duration : number) => (
        <CountdownCircleTimer
          isPlaying
          duration={duration}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[7, 5, 2, 0]}
          isGrowing = {true}
          onComplete={() => endTimer()}
          children= {
            (remainingTime)  => {
                const hours = Math.floor(remainingTime.remainingTime/ 3600)
                const minutes = Math.floor((remainingTime.remainingTime % 3600) / 60)
                const seconds = remainingTime.remainingTime % 60

                return <Text style = {{fontFamily : "Avalon-Medium", fontSize : 30}}>{hours}:{minutes}:{seconds}</Text>
            }
          }
        >
        </CountdownCircleTimer>
    )

    const renderPicker = () => (
        <View style = {{height : 350, flexDirection : "row"}}>
            <View style = {styles.scrollerContainer}>
            <Text style = {styles.timerHeaderTextStyle}>Hour</Text>
            <ScrollPicker
            dataSource={hours}
            onValueChange={(selectedHour) => {
                setDuration(selectedHour * 60 * 60 + selectedMinute * 60)
                setSelectedHour(selectedHour)
              }}
              selectedIndex={selectedHour}
              highlightBorderWidth = {2}
              highlightColor="black"
              wrapperBackground='#E0FBE2'
              itemTextStyle={styles.scrollerOptionsTextStyle}
              activeItemTextStyle={styles.scrollerSelectedOptionTextStyle}
              itemHeight={60}
            />
            </View>
            <View style = {styles.scrollerContainer}>
                <Text style = {styles.timerHeaderTextStyle}>Minutes</Text>
                <ScrollPicker
                dataSource={minutes}
                onValueChange={(selectedMinute) => {
                    console.log(selectedMinute)
                    setDuration(selectedHour * 60 * 60 + selectedMinute * 60)
                    setSelectedMinute(selectedMinute)
                }}
                selectedIndex={selectedMinute / 5}
                highlightBorderWidth = {2}
                highlightColor="black"
                wrapperBackground='#E0FBE2'
                itemTextStyle={styles.scrollerOptionsTextStyle}
                activeItemTextStyle={styles.scrollerSelectedOptionTextStyle}
                itemHeight={60}
                />
            </View>
            
        </View>
    )

    return (
        <View>
            <View style = {[styles.centerContentContainer, {height : height * 0.8}]}>
                {isTimerActive
                    ? renderCountdownTimer(duration)
                    : renderPicker()
                }
                <View style = {{paddingTop : 30}}>
                    {isTimerActive
                        ? <Pressable style = {styles.stopTimerButton} onPress={() => endTimer()}>
                            <Text style = {{color:"white", fontFamily: "Avalon-Bold", fontSize: 20}}>Stop Timer</Text>
                        </Pressable>

                        : <Pressable style = {styles.startTimerButton} onPress={() => startTimer()}>
                            <Text style = {{color:"white", fontFamily: "Avalon-Bold", fontSize: 20}}>Start Timer</Text>
                        </Pressable>
                    }
                </View>
            </View>
            <View style = {{backgroundColor : "white", width : width, height : 70, justifyContent : "space-around", alignItems : "center", flexDirection : "row"}}>
                    <View style = {{alignItems : "center", justifyContent : "center"}}>
                        <Image source = {require('../assets/images/Navbar-icon/communication.png')} style = {{height: 40,width: 40, resizeMode: 'contain'}}></Image>
                        <Text>Thread</Text>
                    </View>
                    <View style = {{alignItems : "center", justifyContent : "center"}}>
                        <Image source = {require('../assets/images/Navbar-icon/home.png')} style = {{height: 40,width: 40, resizeMode: 'contain'}}></Image>
                        <Text>Home</Text>
                    </View>
                    <View style = {{alignItems : "center", justifyContent : "center"}}>
                        <Image source = {require('../assets/images/Navbar-icon/user.png')} style = {{height: 40,width: 40, resizeMode: 'contain'}}></Image>
                        <Text>Profile</Text>
                    </View>
            </View>
        </View>
    )
}