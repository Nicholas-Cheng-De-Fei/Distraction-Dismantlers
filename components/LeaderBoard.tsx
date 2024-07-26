import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from "@/firebaseConfig";
import { doc, getDocs, query, collection, orderBy } from '@firebase/firestore';

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
    <View >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require("@/assets/images/back-button-icon.png")} style={{ width: 40, height: 40, tintColor: "#777777" }}></Image>
                   
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leaderboard (1 point = 1 hr)</Text>
      </View>
      
      <FlatList
        data={users}
        keyExtractor={item => item.key}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.name}>
              {item.DisplayName} {currentUserUid === item.Uid ? "(You)" : ""}
            </Text>
            <Text style={styles.points}>{ parseFloat((item.Points / 3600).toFixed(2))}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rank: {
    width: 50,
    fontWeight: 'bold',
  },
  name: {
    flex: 1,
  },
  points: {
    width: 50,
    textAlign: 'right',
  },
});

export default Leaderboard;
