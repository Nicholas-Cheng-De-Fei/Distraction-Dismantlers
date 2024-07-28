import React from "react";
import { View, Text, Dimensions, Button, Image, Pressable, SafeAreaView } from "react-native";
import { auth, database } from "@/firebaseConfig";
import { signOut } from "@firebase/auth";
import { doc, collection, getDocs, query, where, getDoc, updateDoc, DocumentData, orderBy } from "firebase/firestore";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { styles, width, height } from "@/assets/style";
import Tasks from "@/components/Tasks";
import ActivityGrid from "@/components/ActivityGrid";

const yesterdayDate = new Date();
const hoursToAdd = 8 * 60 * 60 * 1000;
yesterdayDate.setTime(yesterdayDate.getTime() + hoursToAdd);
yesterdayDate.setDate(yesterdayDate.getDate() - 1);

const todayDate = new Date();
todayDate.setTime(todayDate.getTime() + hoursToAdd);
todayDate.setHours(23, 59, 59)


const startOfWeekDate = new Date();
startOfWeekDate.setTime(startOfWeekDate.getTime() + hoursToAdd);
startOfWeekDate.setDate(startOfWeekDate.getDate() - startOfWeekDate.getDay());
startOfWeekDate.setUTCHours(0, 0, 0, 0);

function resetStreak(currentData: DocumentData, currentUserId: string) {
  updateDoc(doc(database, "streak", currentUserId), {
    Days: 0,
    lastStudied: currentData.lastStudied,
  }).then(() => { console.log("Streak Reset") });
}

async function getUserStats(currentUserId: string, setAverage: React.Dispatch<React.SetStateAction<number>>, setStreakCount: React.Dispatch<React.SetStateAction<number>>) {

  const statsRef = collection(database, "stats", currentUserId, "studySessions");
  const queryStats = query(statsRef, where("Date", "<=", todayDate), where("Date", ">=", startOfWeekDate));
  const streakRef = doc(database, "streak", currentUserId);

  let count: number = 0;

  try {
    const streakDataSnap = await getDoc(streakRef);
    const streakData = streakDataSnap.data();

    if (streakData?.lastStudied != null) {
      const time = new Date(streakData!.lastStudied.toDate().getTime() + 8 * 60 * 60 * 1000);
      time.setHours(0, 0, 0, 0);

      if (time.toDateString() == yesterdayDate.toDateString() || time.toDateString() == todayDate.toDateString()) {
        count = streakData!.Days;
      } else {
        count = 0;
        if (streakData!.Days != 0) {
          resetStreak(streakData!, currentUserId);
        }
      }

      setStreakCount(count);
    }


    let avg: number = 0;

    const sessionsDataSnap = await getDocs(queryStats);
    sessionsDataSnap.forEach((doc) => {
      avg += doc.data().Duration / 60 / 60;
    });
    let day = todayDate.getDay();
    if (day == 0) {
      day = 7
    }
    avg /= Math.max(day);

    setAverage(avg);

  } catch (error) {
    console.log(error);
  }

}
async function getRank(uid: string, setRank: React.Dispatch<React.SetStateAction<number>>, setPoints: React.Dispatch<React.SetStateAction<number>>) {
  try {
    const q = query(collection(database, "points"), orderBy("Points", "desc"));
    const querySnapshot = await getDocs(q);
    let position: number = 1;
    let final: number = 0;
    let points: number = 0;

    querySnapshot.forEach(documentSnapshot => {
      let data = documentSnapshot.data();
      // console.log(data.DisplayName);
      // console.log(uid == data.Uid);
      if (data.Uid === uid) {
        final = position;
        points = data.Points;
        return;
      } else {
        position += 1;
      }
    });

    // console.warn(final);
    if (final != 0) {
      setRank(final);
      setPoints((points / 3600));
    }
    else {
      setRank(position);
    }
  } catch (error) {
    console.error("Error Getting Rank: ", error);
  }
}

export default function Profile({ }) {

  const user = auth!.currentUser;
  const isFocused = useIsFocused();

  const logout = async () => {
    await signOut(auth);
    console.log('User logged out successfully!');
  }

  const [average, setAverage] = React.useState(0);
  const [streakCount, setStreakCount] = React.useState(0);
  const [rank, setRank] = React.useState(0);
  const [points, setPoints] = React.useState(0);

  React.useEffect(() => { getRank(user!.uid, setRank, setPoints); })

  React.useEffect(() => {
    if (isFocused) {
      if (user?.uid != null) {
        getUserStats(user!.uid, setAverage, setStreakCount);
      }
    }
  }, [isFocused])
  // <Button title="Logout" onPress={logout} color="#e74c3c"/>
  const navigation = useNavigation();
  return (
    <View style={styles.background}>
      <View style={[styles.ProfileHeader, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
        <View style={{ flexDirection: 'column', flex: 2, paddingLeft: width * 0.1 }}>
          <Text style={styles.ProfileHeaderText}>Hello {user!.displayName}</Text>
          <Pressable onPress={() => navigation.navigate("Leaderboard")}>
            <Text style={[styles.RankHeaderText, { fontWeight: 'black', fontSize: 18, color: "green", }]}>Points: {points.toFixed(2)} (#{rank})</Text>
            <Text style={[styles.RankHeaderText, { fontWeight: 'black', fontSize: 18, color: "green", }]}>Click for more info</Text>
          </Pressable>
        </View>
        <View style={{ paddingRight: width * 0.1 }}>
          <Pressable onPress={logout} style={styles.logoutButton}>
            <Text style={{ fontWeight: 'black', fontSize: 18 }}>Logout</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>

        <View id="streak" style={{ flex: 1 }}>
          <View style={styles.streakBoxHeader}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Streak</Text>
          </View>
          <View style={styles.streakInfoBox}>
            <Image
              source={require('@/assets/images/Profile-icon/streak.png')}
              style={{
                width: 55,
                height: 55,
              }}
            ></Image>
            <Text style={{ fontSize: 27 }}>{streakCount} Days</Text>
          </View>
        </View>

        <View id="average time" style={{ flex: 1 }}>
          <View style={styles.focusBoxHeader}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }} numberOfLines={1}>Avg Focus Time</Text>
          </View>
          <View style={styles.focusInfoBox}>
            <Image
              source={require('@/assets/images/Profile-icon/time.png')}
              style={{
                width: 55,
                height: 55,
              }}
            ></Image>
            <Text style={{ fontSize: 20 }}>{average.toFixed(2)} hrs/wk</Text>
          </View>
        </View>
      </View>

      <View id="to-do List">
        <Tasks />
      </View>
      <View id="ActivityGrid">
        <ActivityGrid />
      </View>

    </View>
  );
}