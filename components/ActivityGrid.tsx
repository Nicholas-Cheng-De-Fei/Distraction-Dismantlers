import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '@/assets/style';
import { auth, database } from "@/firebaseConfig";
import { collection, getDocs, query } from '@firebase/firestore';

export default function ActivityGrid() {
  const [actData, setActData] = useState<number[]>([]);
  const [selectedInfo, setSelectedInfo] = useState<{ day: string | null, hours: number | null }>({ day: null, hours: null });
  let tdy = new Date();
  let dayInMth = new Date(tdy.getFullYear(), tdy.getMonth() + 1, 0).getDate();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(database, "stats", auth.currentUser!.uid, "studySessions"));
      const querySnapshot = await getDocs(q);

      let currentMonth = tdy.getMonth();
      let currentDate = 0;
      let totalDuration = 0;

      let tempData: number[] = [];

      querySnapshot.forEach((doc) => {


        let date = new Date(doc.id);
        if (date == null) {
          return;
        }
        if (date.getMonth() === currentMonth) {
          if (currentDate == date.getDate()) {
            totalDuration += doc.data()!.Duration;
          } else {
            let hrs = parseFloat((totalDuration / 3600).toFixed(2));
            let len = tempData.length;
            for (let index = len; index < currentDate; index++) {
              tempData[index] = 0;
            }
            tempData[currentDate - 1] = hrs;
            currentDate = date.getDate();
            totalDuration = doc.data()!.Duration;
          }
        }
      });
      tempData[currentDate - 1] = parseFloat((totalDuration / 3600).toFixed(2));;

      for (let index = 0; index < dayInMth; index++) {
        if (!tempData[index]) tempData[index] = 0;
      }

      setActData(tempData);
    };

    fetchData();
  }, []);


  const getColor = (duration: number) => {
    if (duration > 2.0) {
      return "green";
    } else if (duration > 1.4) {
      return "#7CFC00";
    }
    else if(duration > 0){
      return "#8FBC8F";
    }
    else if(duration == 0){
      return "grey";
    }
  };


  const handlePress = (day: number, hours: number) => {
    setSelectedInfo({ day: `Day ${day}`, hours });
    Alert.alert(`Hours Studied`, `Day: ${day}\nHours: ${hours}`);
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const firstDay = (new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() + 6) % 7; // Adjusting to make Monday as the first day
    const weeks = [];
    let dayCount = 0;

    for (let week = 0; week < Math.ceil((daysInMonth + firstDay) / 7); week++) {
      weeks.push([]);
      for (let day = 0; day < 7; day++) {
        if (week === 0 && day < firstDay) {
          weeks[week].push(0); // Representing days outside the current month
        } else if (dayCount < daysInMonth) {
          weeks[week].push(actData[dayCount] || 0);
          dayCount++;
        } else {
          weeks[week].push(0); // Representing days after the last day of the month
        }
      }
    }

    return weeks.map((week, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {week.map((hours, colIndex) => {
          const dayNumber = rowIndex * 7 + colIndex - firstDay + 1;
          const isCurrentMonthDay = rowIndex > 0 || colIndex >= firstDay;

          return (
            (dayNumber > 0 && dayNumber <= dayInMth) ?
              <TouchableOpacity
                key={colIndex}
                style={[styles.cell, { backgroundColor: isCurrentMonthDay && hours > 0 ? getColor(hours) : 'white' }]}
                onPress={() => handlePress(dayNumber, hours)}
              >
                <Text style={styles.dayText}>
                  {isCurrentMonthDay && dayNumber <= daysInMonth ? dayNumber : ''}
                </Text>
              </TouchableOpacity> :
              <View>
                <Text style={[styles.cell, { backgroundColor: "grey" }]}
                ></Text>
              </View>
          );
        })}
      </View>
    ));
  };

  return (
    <View>
      <View style={styles.taskBoxHeader}>
        <Text style={styles.taskHeader}>Activity Log</Text>
      </View>
      <View style={styles.taskInfoBox}>
        <View style={styles.weekdaysRow}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <Text key={index} style={styles.weekdayText}>
              {day}{" "} 
            </Text>
          ))}
        </View>
        {renderCalendar()}
      </View>
    </View>
  );
};
