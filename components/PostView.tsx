import React from "react";
import { View, Text, TextInput, Image, FlatList, Pressable, Modal } from "react-native";
import { auth, database } from "@/firebaseConfig";
import { width, height, styles } from "@/assets/style";
import { doc, getDoc, getDocs, query, collection, orderBy } from '@firebase/firestore';
import { addDoc, updateDoc } from "firebase/firestore";

async function getPost(postId: string, setPost: any, setTime: any, setReplies: any) {
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

async function submitReply(postId: string, description: string, name: any, setModalVisible: any, setDescription: any) {
    const replyRef = collection(database, "thread", postId, "replies");
    const result = addDoc(replyRef, {
        "dateReplied": new Date(),
        "description": description,
        "author": name,
    });

    const postRef = doc(database, "thread", postId);
    const postSnap = await getDoc(postRef);
    const postData = postSnap.data();

    let num = postData!.noReplies;

    updateDoc(doc(database, "thread", postId), {
        noReplies: num + 1,
    }).then(() => {
        setModalVisible(false);
        setDescription(true);
    });
}


function goBack(setPannel: any, lastPage: any) {
    setPannel(lastPage);
}

export default function PostView({ setPannel, postId, lastPage }: any) {

    const user = auth!.currentUser;
    const [post, setPost] = React.useState([]);
    const [replies, setReplies] = React.useState([]);
    const [time, setTime] = React.useState(null);

    const [modalVisible, setModalVisible] = React.useState(false);

    const [description, setDescription] = React.useState("");

    const [canRender, setCanRender] = React.useState(false);

    React.useEffect(() => {
        getPost(postId, setPost, setTime, setReplies).then(() => {setCanRender(true);});
    }, []);

    return (
        <View>
            {
                canRender
                    ?
                    <View>
                        <View style={{ top: height * 0.05, paddingLeft: width * 0.05, paddingRight: width * 0.1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Pressable onPress={() => goBack(setPannel, lastPage)}>
                                <Image source={require("@/assets/images/back-button-icon.png")} style={{ width: 40, height: 40, tintColor: "#777777" }}></Image>
                            </Pressable>
                            <Pressable onPress={() => setModalVisible(true)}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#FF7F7F", borderRadius: 10, width: 100 }}>
                                    <Image source={require("@/assets/images/reply-post-icon.png")} style={{ width: 30, height: 30 }}></Image>
                                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>Reply</Text>
                                </View>
                            </Pressable>
                        </View>
                        <View>
                            <View style={{ paddingBottom: height * 0.02, paddingTop: height * 0.05, paddingLeft: width * 0.03, width: width * 0.95 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flex: 2 }}>
                                        <View>
                                            <Text style={{ fontSize: 35, fontWeight: "bold", flexWrap: "wrap" }}>{post.course} - {post.title}</Text>
                                        </View>
                                        <View>

                                            <Text style={{ fontSize: 20 }}>Date posted : {time}</Text>
                                            <Text style={{ fontSize: 20, top: height * 0.01, textAlign: "justify" }}>{post.description}</Text>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ borderTopWidth: 2 }}>
                            {
                                replies.length == 0
                                    ?
                                    <View style={{ justifyContent: "center", alignItems: "center", paddingTop: height * 0.1 }}>
                                        <Image source={require("@/assets/images/no-reply-icon.png")} style={{ width: 200, height: 200 }}></Image>
                                        <Text style={{ fontWeight: "bold", fontSize: 30, paddingTop: height * 0.05 }}>No Replies!</Text>
                                    </View>
                                    :
                                    <View style={{ paddingTop: 10 }}>
                                        <FlatList
                                            data={replies}
                                            renderItem={(item) => {
                                                const post = item.item.data();
                                                const time = new Date(post!.dateReplied.toDate().getTime() + 8 * 60 * 60 * 1000);
                                                return (
                                                    <View style={{ paddingBottom: height * 0.02, paddingLeft: width * 0.05, width: width, zIndex: 1 }}>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <View>
                                                                <Text style={{ fontSize: 20 }}>Date posted : {time.toDateString()}</Text>
                                                                <Text style={{ textAlign: "justify" }}>{post.description}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            }}
                                        />
                                    </View>
                            }
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={{ flex: 1, top: height * 0.2, alignItems: "center" }}>
                                <View style={{ backgroundColor: "white", width: width * 0.9, paddingTop: 20, paddingBottom: 20 }}>
                                    <View style={{ alignItems: "center" }}>

                                        <Text style={[styles.modalText, { fontWeight: "bold" }]}>Description</Text>
                                        <TextInput
                                            style={[styles.modalInput, { width: width * 0.8, height: height * 0.2 }]}
                                            multiline={true}
                                            placeholder="Post Description"
                                            value={description}
                                            onChangeText={setDescription}
                                        />
                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                        <Pressable onPress={() => { setModalVisible(false); setDescription("") }}>
                                            <View style={[styles.newPostButton, { backgroundColor: "#FF7F7F" }]}>
                                                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Go Back</Text>
                                            </View>
                                        </Pressable>
                                        <Pressable onPress={() => {
                                            submitReply(postId, description, user!.displayName, setModalVisible, setDescription);
                                            getPost(postId, setPost, setTime, setReplies);
                                        }}>
                                            <View style={[styles.newPostButton, { backgroundColor: "#41dc8e" }]}>
                                                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Reply!</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    :
                    <View style = {{justifyContent : "center", alignItems : "center", height : height}}>
                        <Image source={require("@/assets/images/loading-icon.png")} style = {{width : 400, height : 400}}></Image>
                        <Text style = {{fontWeight : "bold", fontSize : 20}}>Loading...</Text>
                    </View>
            }
        </View>
    )
} 