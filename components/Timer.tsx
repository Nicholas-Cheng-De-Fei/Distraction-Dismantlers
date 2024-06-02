import React from 'react';
import { View, Text, Button, Pressable} from 'react-native';
import { styles } from '@/assets/style';
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

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
    const [selectedMinute, setSelectedMinute] = React.useState(2);
    const [isTimerActive, setIsTimerActive] = React.useState(false);
    const [duration, setDuration] = React.useState(0);

    const startTimer = () => {

        console.log(selectedMinute);

        console.log(duration);

        setDuration(selectedHour * 60 * 60 + selectedMinute * 60);
        
        if (duration != 0) {
            setIsTimerActive(true);
            console.log("Timer Start");
        }
   
    }

    const endTimer = () => {
        setIsTimerActive(false);
        setSelectedMinute(selectedMinute)
        console.log("Timer Stoped");
        console.log(selectedMinute);
    }


    const renderCountdownTimer = () => (
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
            onValueChange={(selectedIndex) => {
                setSelectedHour(selectedIndex);
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
                onValueChange={(selectedIndex) => {
                    setSelectedMinute(selectedIndex);
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
        <View style = {styles.centerContentContainer}>
            {isTimerActive
                ? renderCountdownTimer()
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
    )
}