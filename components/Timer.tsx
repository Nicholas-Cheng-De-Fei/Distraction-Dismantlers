import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles, width, height } from '@/assets/style';
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { auth, database } from '@/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from '@firebase/firestore';

let remainder = 0;
let time = 0;
let s: number;
let t: Date;

const hours = createArray(24, "Hour");
const minutes = createArray(60, "Minute");

const todaysDate = new Date();


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

async function getStreakData(currentUserId: string) {
    if (currentUserId != undefined) {
        const streakRef = doc(database, "streak", currentUserId);
        const streakDataSnap = await getDoc(streakRef);
        const streakData = streakDataSnap.data();

        s = streakData!.Days;
        t = new Date(streakData!.lastStudied.toDate().getTime() + 8 * 60 * 60 * 1000);
        t.setUTCHours(0, 0, 0, 0);
    }
}

function startTimer(selectedHour: number, selectedMinute: number, duration: number, setDuration: React.Dispatch<React.SetStateAction<number>>, setIsTimerActive: React.Dispatch<React.SetStateAction<boolean>>) {

    time = selectedHour * 60 * 60 + selectedMinute * 60

    setDuration(time);

    setTimeout(() => {
        if (duration == time && time != 0) {
            setIsTimerActive(true);
        }
    }, 0)
}

function endTimer(duration: number, selectedMinute: number, setSelectedMinute: React.Dispatch<React.SetStateAction<number>>, setIsTimerActive: React.Dispatch<React.SetStateAction<boolean>>) {

    if (remainder == 0) {

        setDoc(doc(database, "stats", auth.currentUser!.uid, "studySessions", new Date().toUTCString()), {
            Date: new Date(),
            Duration: duration,
        }).then(() => { console.log("Recorded the study session into the database") });
        
        if (t == null || t.toDateString() != todaysDate.toDateString()) {
            s += 1;
            updateDoc(doc(database, "streak", auth.currentUser!.uid), {
                Days: s,
                lastStudied: new Date(),
            }).then(() => { console.log("Updated Streak record for the user") });
        }
    }

    setIsTimerActive(false);
    setSelectedMinute(selectedMinute)
}



function renderPicker(selectedHour: number, selectedMinute: number, setDuration: React.Dispatch<React.SetStateAction<number>>, setSelectedHour: React.Dispatch<React.SetStateAction<number>>, setSelectedMinute: React.Dispatch<React.SetStateAction<number>>) {
    return (
        <View testID="Time Selector" style={{ height: 350, flexDirection: "row" }}>
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
}

function renderCountdownTimer(duration: number, selectedMinute: number, setSelectedMinute: React.Dispatch<React.SetStateAction<number>>, setIsTimerActive: React.Dispatch<React.SetStateAction<boolean>>) {
    return (
        <CountdownCircleTimer
            isPlaying
            duration={10}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[60, 30, 10, 0]}
            isGrowing={false}
            size={380}
            onComplete={() => endTimer(duration, selectedMinute, setSelectedMinute, setIsTimerActive)}
            trailColor={'#FFFFFF'}
            children={
                (remainingTime) => {
                    const hours = Math.floor(remainingTime.remainingTime / 3600);
                    const minutes = Math.floor((remainingTime.remainingTime % 3600) / 60);
                    const seconds = remainingTime.remainingTime % 60;

                    remainder = remainingTime.remainingTime;

                    return <Text style={{ fontSize: 25 }}>{hours} Hours {minutes} Minutes {seconds} Seconds</Text>
                }
            }
        >
        </CountdownCircleTimer>
    )
}

export default function Timer() {

    const currentUserId = auth.currentUser?.uid

    const [selectedHour, setSelectedHour] = React.useState(0);
    const [selectedMinute, setSelectedMinute] = React.useState(5);
    const [isTimerActive, setIsTimerActive] = React.useState(false);
    const [duration, setDuration] = React.useState(0);

    getStreakData(currentUserId!);

    return (
        <View style={styles.background}>
            <View style={[styles.centerContentContainer, { height: height }]}>
                {isTimerActive
                    ? renderCountdownTimer(duration, selectedMinute, setSelectedMinute, setIsTimerActive)
                    : renderPicker(selectedHour, selectedMinute, setDuration, setSelectedHour, setSelectedMinute)
                }
                <View style={{ paddingTop: 30 }}>
                    {isTimerActive
                        ? <Pressable testID='Stop Button' style={styles.stopTimerButton} onPress={() => endTimer(duration, selectedMinute, setSelectedMinute, setIsTimerActive)}>
                            <Text style={{ color: "white", fontSize: 20 }}>Stop Timer</Text>
                        </Pressable>

                        : <Pressable testID='Start Button' style={styles.startTimerButton} onPress={() => startTimer(selectedHour, selectedMinute, duration, setDuration, setIsTimerActive)}>
                            <Text style={{ color: "white", fontSize: 20 }}>Start Timer</Text>
                        </Pressable>
                    }
                </View>
            </View>
        </View>
    )
}