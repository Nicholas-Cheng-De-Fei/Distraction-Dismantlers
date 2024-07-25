import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { styles } from '@/assets/style';
// Sample data for demonstration
const activityData = [
  [{ color: 'green', hours: 2 }, { color: 'orange', hours: 1 }, { color: 'red', hours: 0 }, { color: 'green', hours: 2 }, { color: 'green', hours: 3 }, { color: 'red', hours: 0 }, { color: 'green', hours: 2 }],
  [{ color: 'red', hours: 0 }, { color: 'red', hours: 0 }, { color: 'green', hours: 2 }, { color: 'orange', hours: 1 }, { color: 'red', hours: 0 }, { color: 'red', hours: 0 }, { color: 'orange', hours: 1 }],
  [{ color: 'orange', hours: 1 }, { color: 'green', hours: 2 }, { color: 'red', hours: 0 }, { color: 'red', hours: 0 }, { color: 'orange', hours: 1 }, { color: 'green', hours: 2 }, { color: 'red', hours: 0 }],
  [{ color: 'red', hours: 0 }, { color: 'red', hours: 0 }, { color: 'orange', hours: 1 }, { color: 'green', hours: 2 }, { color: 'red', hours: 0 }, { color: 'green', hours: 2 }, { color: 'green', hours: 3 }],
  // Add more weeks if needed
];

const getColor = (color: string) => {
  switch (color) {
    case 'green':
      return '#00ff00';
    case 'orange':
      return '#ffa500';
    case 'red':
      return '#ff0000';
    default:
      return '#fff';
  }
};

const ActivityGrid = ({ data = activityData }) => {
  const [selectedInfo, setSelectedInfo] = useState({ day: null, hours: null });

  const handlePress = (day: string, hours: number) => {
    setSelectedInfo({ day, hours });
    Alert.alert(`Hours Studied`, `Day: ${day}\nHours: ${hours}`);
  };

  return (
    <View>
      <View style={styles.taskBoxHeader}>
        <Text style={styles.taskHeader}>Activites</Text>
      </View>
      <View style={styles.taskInfoBox}>
      <View style={styles.weekdaysRow}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <Text key={index} style={styles.weekdayText}>
            {day}
          </Text>
        ))}
      </View>
      {data.map((week, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {week.map((item, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              style={[styles.cell, { backgroundColor: getColor(item.color) }]}
              onPress={() => handlePress(`Week ${rowIndex + 1}, Day ${colIndex + 1}`, item.hours)}
            />
          ))}
        </View>
      ))}
      {selectedInfo.day && (
        <View style={styles.selectedInfo}>
          <Text>{`Selected: ${selectedInfo.day}`}</Text>
          <Text>{`Hours: ${selectedInfo.hours}`}</Text>
        </View>
      )}
    </View>
    </View>
  );
};

export default ActivityGrid;
