import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from "@/firebaseConfig";
import { doc, getDocs, query, collection, orderBy } from '@firebase/firestore';
import { styles, width, height } from "@/assets/style";
const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const currentUserUid = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = [];
      try {
        const q = query(collection(database, "points"), orderBy("Points", "desc"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(documentSnapshot => {
          userList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.leaderboardHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 0.1,top:height*0.025 }}>
          <Image source={require("@/assets/images/back-button-icon.png")} style={{ width: 40, height: 40, tintColor: "#777777" }}></Image>

        </TouchableOpacity>
        <Text style={styles.leaderboardHeaderTitle}>Leaderboard (1 point = 1 hr)</Text>
      </View>

      <FlatList
        data={users}
        keyExtractor={item => item.key}
        renderItem={({ item, index }) => (
          <View style={styles.leaderboardItem}>
            <Text style={styles.leaderboardRank}>{index + 1}</Text>
            <Text style={styles.leaderboardName}>
              {item.DisplayName} {currentUserUid === item.Uid ? <Text style={{ color: "purple", fontWeight: 'bold', }}>(You)</Text> : ""}
            </Text>
            <Text style={styles.points}>{parseFloat((item.Points / 3600).toFixed(2))}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Leaderboard;
