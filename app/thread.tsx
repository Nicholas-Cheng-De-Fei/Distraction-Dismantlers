import React from "react";
import { View, Text, TextInput } from "react-native";
import { auth } from "@/firebaseConfig";
import { width, height, styles } from "@/assets/style";
import DisplayPosts from "@/components/DisplayPosts";
import PostView from "@/components/PostView";
import CourseSub from "@/components/CourseSub";

export default function Thread() {
  const user = auth!.currentUser;
  const [pannel, setPannel] = React.useState("Personal");
  const [lastPage, setLastPage] = React.useState("Personal");
  const [mod, setMod] = React.useState(null);
  const [post, setPost] = React.useState(null);

  return (
    <View style={styles.background}>
      {pannel == "Personal"
      ? <DisplayPosts setPannel={setPannel} setMod={setMod} setPost={setPost}/>
      : pannel == "Post"
        ? <PostView setPannel = {setPannel} postId={post} lastPage = {lastPage}/>
        : <CourseSub setPannel = {setPannel} courseCode = {mod} lastPage = {lastPage} setLastPage = {setLastPage} setPost={setPost}/>
      }
    </View>

  );
}