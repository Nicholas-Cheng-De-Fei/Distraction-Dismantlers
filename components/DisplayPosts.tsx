import React from "react";
import { View, Text, Dimensions, Image, FlatList, Pressable} from "react-native";
import { auth, database } from "@/firebaseConfig";
import { width, height, styles } from "@/assets/style";
import { doc, getDoc, getDocs, query, collection, where} from '@firebase/firestore';



async function getUserSubcribedCourses (currentUserId: string, setData) {
    if (currentUserId != undefined) {
        try {
            const followedCoursesRef = doc(database, "subscriptions", currentUserId);
            const followedCoursesDataSnap = await getDoc(followedCoursesRef);
            const followedCoursesData = followedCoursesDataSnap.data();
    
            const q = query(collection(database, "thread"), where("course", "in", followedCoursesData!.courses));
            const querySnapshot = await getDocs(q);
            
            let posts = [];

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                posts.push(doc);
            });
            
            setData(posts);

        } catch (error) {
            console.log(error);
        }
    }
}

export default function DisplayPosts () {

    const user = auth!.currentUser;

    const [courseData, setData] = React.useState([]);

    React.useEffect(() => {
        getUserSubcribedCourses(user!.uid, setData);
    }, []);

    return (
        <View>
            {
                courseData.length == 0
                ? <View style = {{alignItems : "center"}}>
                    <Image source = {require("@/assets/images/empty-list-icon.png")} style  = {{width : 400, height : 400}}></Image>
                    <Text style = {{fontSize : 24, fontWeight : "bold", flexWrap : 'wrap', textAlign : "center"}}>Start following courses and see them appear here!</Text>
                </View>
                : <View>
                    <FlatList
                        data = {courseData}
                        renderItem = {(item) => {
                            const post = item.item.data();
                            const time = new Date(post!.datePosted.toDate().getTime() + 8 * 60 * 60 * 1000);
                            return (
                                <View style = {{paddingBottom : height * 0.02, paddingLeft : width * 0.05, width : width}}>
                                    <View style = {{flexDirection : "row"}}>
                                        <View style = {{flex : 2}}>
                                            <Pressable onPress = {() => {console.log(item.item.id)}}>
                                                <View>
                                                    <Text style = {{fontSize : 20}} numberOfLines={1}>{post.course} - {post.title}</Text>
                                                </View>                                                   
                                            </Pressable>
                                            <View>
                                                <Pressable onPress = {() => {console.log("you press description")}}>
                                                    <Text>Date posted : {time.toDateString()}</Text>
                                                    <Text numberOfLines={2}>{post.description}</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                        <View style = {{justifyContent : 'center', alignItems : "center", flex : 1}}>
                                            <View style = {{flexDirection : "row"}}>
                                                <Image source={require("@/assets/images/reply-icon.png")} style={{width : 50, height : 50}}></Image>
                                                <Text style = {{top : height * 0.01, fontSize : 20}}>{post.noReplies}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
            }
        </View>
    )
}