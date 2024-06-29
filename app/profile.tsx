import React from "react";
import { View, Text, Dimensions, Button, Image } from "react-native";
import { auth, database } from "@/firebaseConfig";
import { signOut } from "@firebase/auth";
import { doc, collection, getDocs, query, where, getDoc, updateDoc, DocumentData } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { styles, width, height } from "@/assets/style";

export default function Profile() {

  const isFocused = useIsFocused();
  const currentUserId = auth.currentUser!.uid;
  
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const todayDate = new Date();
  todayDate.setHours(23, 59, 59);

  const startOfWeekDate = new Date();
  startOfWeekDate.setDate( startOfWeekDate.getDate() - startOfWeekDate.getDay() + 1);
  startOfWeekDate.setHours(0, 0, 0);


  const logout = async () => {
    await signOut(auth);
    console.log('User logged out successfully!');
  }

  const [average, setAverage] = React.useState(0);
  const [streakCount, setStreakCount] = React.useState(0);

  function resetStreak (currentData : DocumentData, currentUserId: string) {
    updateDoc(doc(database, "streak", currentUserId), {
      Days : 0,
      lastStudied : currentData.lastStudied,
    }).then(() => {console.log("Streak Reset")});
  }
  
  async function getUserStats (currentUserId : string) {
  
    const statsRef = collection(database, "stats", currentUserId, "studySessions");
    const queryStats = query(statsRef,  where("Date", "<=", todayDate), where("Date", ">=", startOfWeekDate));
    const streakRef = doc(database, "streak", currentUserId);
  
    let count : number = 0;
  
    try {
      const streakDataSnap = await getDoc(streakRef);
      const streakData = streakDataSnap.data();
  
      const time = new Date(streakData!.lastStudied.toDate().getTime()  + 8 * 60 * 60 * 1000);
      if (time.toDateString() == yesterdayDate.toDateString() || time.toDateString() == new Date().toDateString()) {
        count = streakData!.Days;
      } else {
        count = 0;
        if (streakData!.Days != 0) {
          resetStreak(streakData!, currentUserId);
        }
      }
  
      setStreakCount(count);
  
      let avg : number = 0;
  
      const sessionsDataSnap = await getDocs(queryStats);
      sessionsDataSnap.forEach((doc) => {
        avg += doc.data().Duration/60/60;
      });
  
      avg /= todayDate.getDay();
  
      setAverage(avg);
  
    } catch (error) {
      console.log(error);
    }
  
  }

  React.useEffect(() => {
    if (isFocused) {
      getUserStats(currentUserId);
    }
  }, [isFocused])

  return (
    <View style = {styles.background}>
      <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 80 }}>
        <Button title="Logout" onPress={logout} color="#e74c3c" />
      </View>

      <View style = {{flexDirection: 'row'}}>

        <View id="streak" style = {{flex : 1}}>
          <View style = {styles.streakBoxHeader}>
            <Text style = {{fontSize : 20, fontWeight: 'bold'}}>Streak</Text>
          </View>
          <View style = {styles.streakInfoBox}>
            <Image 
              source={require('@/assets/images/Profile-icon/streak.png')}
              style = {{
                width: 55,
                height: 55,
              }}
              ></Image>
              <Text style = {{fontSize: 27}}>{streakCount} Days</Text>
          </View>
        </View>

        <View id = "average time" style = {{flex : 1}}>
          <View style = {styles.focusBoxHeader}>
            <Text style = {{fontSize : 20, fontWeight: 'bold'}}>Avg Focus Time</Text>
          </View>
          <View style = {styles.focusInfoBox}>
          <Image 
              source={require('@/assets/images/Profile-icon/time.png')}
              style = {{
                width: 55,
                height: 55,
              }}
              ></Image>
              <Text style = {{fontSize: 27}}>{average.toFixed(2)} hrs/wk</Text>
          </View>
        </View>

        <View id = "to-do List">

        </View>

        <View id = "heatMap">
          
        </View>


      </View>
    </View>
  );
}