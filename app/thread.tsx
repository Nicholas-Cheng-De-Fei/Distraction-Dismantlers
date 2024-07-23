import React from "react";
import { View, Text, TextInput } from "react-native";
import { auth } from "@/firebaseConfig";
import { width, height, styles } from "@/assets/style";
import { Image } from "react-native";
import DisplayPosts from "@/components/DisplayPosts";

export default function Thread() {
  const user = auth!.currentUser;
  const [courseSpecfic, setCourseSpecfic] = React.useState(null);

  return (
    <View style={styles.background}>
      <View style = {{flex: 1}}>
        <View testID="search bar" style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", top: height * 0.05 }}>
          <Image source={require("@/assets/images/search-icon.png")} style={styles.searchBarIcon}></Image>
          <TextInput
            placeholder="Search"
            style={styles.searchBarStyle}
          >
          </TextInput>
        </View>
      </View>
      <View style = {{flex : 6, alignItems : "center"}}>
        <DisplayPosts />
      </View>
    </View>

  );
}