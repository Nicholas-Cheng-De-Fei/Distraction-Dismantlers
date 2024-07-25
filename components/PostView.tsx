import React from "react";
import { View, Text, TextInput, Image, FlatList, Pressable } from "react-native";
import { auth, database } from "@/firebaseConfig";
import { width, height, styles } from "@/assets/style";
import { doc, getDoc, getDocs, query, collection, orderBy } from '@firebase/firestore';

let time : Date = new Date();

async function getPost(postId : string, setPost : any, setTime : any, setReplies : any) {
    const postRef = doc(database, "thread", postId);
    const postSnap = await getDoc(postRef);
    const postData = postSnap.data();

    setPost(postData);
    setTime(postData!.datePosted.toDate().toDateString());

    const q = query(collection(database, "thread", postId, "replies"), orderBy("dateReplied", "desc"));
    const querySnapshot = await getDocs(q);

    let replies = [];

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        replies.push(doc);
    });

    setReplies(replies);
}


function goBack(setPannel : any) {
    setPannel("Personal");    
}

export default function PostView({ setPannel, postId }: any) {

    const [post, setPost] = React.useState([]);
    const [replies, setReplies] = React.useState([]);
    const [time, setTime] = React.useState(null);

    React.useEffect(() => {
        getPost(postId, setPost, setTime, setReplies);
    }, []);    

    return (
        <View>
            <View style={{ top: height * 0.05, left: width * 0.05 }}>
                <Pressable onPress={() => goBack(setPannel)}>
                    <Image source={require("@/assets/images/back-button-icon.png")} style={{ width: 40, height: 40, tintColor: "#777777" }}></Image>
                </Pressable>
            </View>
            <View>
                <View style={{ paddingBottom: height * 0.02, paddingTop: height * 0.05, paddingLeft : width * 0.03, width : width * 0.95 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 2 }}>
                            <View>
                                <Text style={{ fontSize: 35, fontWeight: "bold", flexWrap : "wrap" }}>{post.course} - {post.title}</Text>
                            </View>
                            <View>

                                <Text style = {{fontSize : 20}}>Date posted : {time}</Text>
                                <Text numberOfLines={2} style = {{fontSize : 20, top : height * 0.01}}>{post.description}</Text>

                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style = {{borderTopWidth : 2}}>
                {
                    replies.length == 0
                    ? <Text> Empty </Text>
                    : <Text> Not </Text>
                }
            </View>
        </View>
    )
} 