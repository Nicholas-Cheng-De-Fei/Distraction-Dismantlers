import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles, width, height } from '@/assets/style';
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { auth, database } from '@/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';

export function createArray(length: number, type: String) {
    const arr = [];

    if (type == "Hour") {
        for (let i = 0; i <= length; i++) {
            arr.push(i);
        }
    } else {
        for (let i = 0; i <= length; i += 5) {
            arr.push(i);
        }
    }
    return arr
};

const hours = createArray(24, "Hour");
const minutes = createArray(60, "Minute");

const todaysDate = new Date();
todaysDate.setHours(0, 0, 0);

// To store the remaining time from the timer (in seconds)
const currentUserId = auth.currentUser?.uid
let remainder = 0;
let time = 0;
let s: number;
let t: Date;


async function getStreakData(currentUserId : string) {
    if (currentUserId != undefined) {
        const streakRef = doc(database, "streak", currentUserId);
        const streakDataSnap = await getDoc(streakRef);
        const streakData = streakDataSnap.data();
    
        s = streakData!.Days;
        t = new Date(streakData!.lastUpdated.toDate().getTime() + 8 * 60 * 60 * 1000);
        t.setHours(0, 0, 0);
    }
}

getStreakData(currentUserId!);

export default function Timer() {


    const [selectedHour, setSelectedHour] = React.useState(0);
    const [selectedMinute, setSelectedMinute] = React.useState(5);
    const [isTimerActive, setIsTimerActive] = React.useState(false);
    const [duration, setDuration] = React.useState(0);

    const startTimer = () => {

        time = selectedHour * 60 * 60 + selectedMinute * 60

        setDuration(time);

        setTimeout(() => {
            if (duration == time && time != 0) {
                setIsTimerActive(true);
            }
        }, 0)
    }

    const endTimer = () => {
        if (remainder == 0) {

            setDoc(doc(database, "stats", auth.currentUser!.uid, "studySessions", new Date().toUTCString()), {
                Date: new Date(),
                Duration: duration,
            }
            );
            if (t.toDateString() != todaysDate.toDateString()) {
                s += 1;
                updateDoc(doc(database, "streak", auth.currentUser!.uid), {
                    Days: s,
                    lastUpdated: new Date(),
                });
            }
        }

        setIsTimerActive(false);
        setSelectedMinute(selectedMinute)
    }


    const renderCountdownTimer = (duration: number) => (
        <CountdownCircleTimer
            isPlaying
            duration={duration}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            isGrowing={true}
            onComplete={() => endTimer()}
            children={
                (remainingTime) => {
                    const hours = Math.floor(remainingTime.remainingTime / 3600);
                    const minutes = Math.floor((remainingTime.remainingTime % 3600) / 60);
                    const seconds = remainingTime.remainingTime % 60;

                    remainder = remainingTime.remainingTime;

                    return <Text style={{ fontSize: 30 }}>{hours}:{minutes}:{seconds}</Text>
                }
            }
        >
        </CountdownCircleTimer>
    )

    const renderPicker = () => (
        <View testID = "Time Selector" style={{ height: 350, flexDirection: "row" }}>
            <View style={styles.scrollerContainer}>
                <Text style={styles.timerHeaderTextStyle}>Hour</Text>
                <ScrollPicker
                    dataSource={hours}
                    onValueChange={(selectedHour) => {
                        setDuration(selectedHour * 60 * 60 + selectedMinute * 60)
                        setSelectedHour(selectedHour)
                    }}
                    selectedIndex={selectedHour}
                    highlightBorderWidth={2}
                    highlightColor="black"
                    wrapperBackground='#bcdaec'
                    itemTextStyle={styles.scrollerOptionsTextStyle}
                    activeItemTextStyle={styles.scrollerSelectedOptionTextStyle}
                    itemHeight={60}
                />
            </View>
            <View style={styles.scrollerContainer}>
                <Text style={styles.timerHeaderTextStyle}>Minutes</Text>
                <ScrollPicker
                    dataSource={minutes}
                    onValueChange={(selectedMinute) => {
                        setDuration(selectedHour * 60 * 60 + selectedMinute * 60)
                        setSelectedMinute(selectedMinute)
                    }}
                    selectedIndex={selectedMinute / 5}
                    highlightBorderWidth={2}
                    highlightColor="black"
                    wrapperBackground='#bcdaec'
                    itemTextStyle={styles.scrollerOptionsTextStyle}
                    activeItemTextStyle={styles.scrollerSelectedOptionTextStyle}
                    itemHeight={60}
                />
            </View>

        </View>
    )

    return (
        <View style={styles.background}>
            <View style={[styles.centerContentContainer, { height: height }]}>
                {isTimerActive
                    ? renderCountdownTimer(duration)
                    : renderPicker()
                }
                <View style={{ paddingTop: 30 }}>
                    {isTimerActive
                        ? <Pressable testID = 'Stop Button' style={styles.stopTimerButton} onPress={() => endTimer()}>
                            <Text style={{ color: "white", fontSize: 20 }}>Stop Timer</Text>
                        </Pressable>

                        : <Pressable testID = 'Start Button' style={styles.startTimerButton} onPress={() => startTimer()}>
                            <Text style={{ color: "white", fontSize: 20 }}>Start Timer</Text>
                        </Pressable>
                    }
                </View>
            </View>
        </View>
    )
}