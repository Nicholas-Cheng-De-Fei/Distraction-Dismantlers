import React from "react";
import { View, Text, Dimensions, Button, Image } from "react-native";
import { auth, database } from "@/firebaseConfig";
import { signOut } from "@firebase/auth";
import { doc, collection, getDocs, query, where, getDoc, updateDoc, DocumentData } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { styles, width, height } from "@/assets/style";
import Tasks from "@/components/Tasks";

const yesterdayDate = new Date();
yesterdayDate.setDate(yesterdayDate.getDate() - 1);
yesterdayDate.setUTCHours(0,0,0,0);

const todayDate = new Date();
todayDate.setHours(23,59,59)


const startOfWeekDate = new Date();
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
      time.setHours(0,0,0,0);

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
    avg /= Math.max(todayDate.getDay() + 1);

    setAverage(avg);

  } catch (error) {
    console.log(error);
  }

}

export default function Profile() {

  const isFocused = useIsFocused();
  const user = auth!.currentUser;

  const logout = async () => {
    await signOut(auth);
    console.log('User logged out successfully!');
  }

  const [average, setAverage] = React.useState(0);
  const [streakCount, setStreakCount] = React.useState(0);

  React.useEffect(() => {
    if (isFocused) {
      if (user?.uid != null) {
        getUserStats(user!.uid, setAverage, setStreakCount);
      }
    }
  }, [isFocused])

  return (
    <View style={styles.background}>
      <View style={styles.ProfileHeader}>
        <Text style={styles.ProfileHeaderText}>Hello {user!.displayName}</Text>
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
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Avg Focus Time</Text>
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

      <View id="heatMap">

      </View>

      <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 80 }}>
        <Button title="Logout" onPress={logout} color="#e74c3c" />
      </View>
    </View>
  );
}