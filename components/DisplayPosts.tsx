import React from "react";
import { View, Text, TextInput, Image, FlatList, Pressable } from "react-native";
import { auth, database } from "@/firebaseConfig";
import { width, height, styles } from "@/assets/style";
import { doc, getDoc, getDocs, query, collection, where, orderBy } from '@firebase/firestore';
import ThreadSearch from "./ThreadSearch";

async function getUserSubcribedCourses(currentUserId: string, setCommunityPost: any, setPersonalPost: any, setRenderData: any) {
    if (currentUserId != undefined) {
        try {
            const followedCoursesRef = doc(database, "subscriptions", currentUserId);
            const followedCoursesDataSnap = await getDoc(followedCoursesRef);
            const followedCoursesData = followedCoursesDataSnap.data();

            const q = query(collection(database, "thread"), where("course", "in", followedCoursesData!.courses), orderBy("datePosted", "desc"));
            const querySnapshot = await getDocs(q);

            let postsCommunity = [];

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                postsCommunity.push(doc);
            });

            setCommunityPost(postsCommunity);

            const q2 = query(collection(database, "thread"), where("uid", "==", currentUserId), orderBy("datePosted", "desc"));
            const querySnapshot2 = await getDocs(q2);

            let postsPersonal = [];

            querySnapshot2.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                postsPersonal.push(doc);
            });

            setPersonalPost(postsPersonal);

            setRenderData(postsCommunity);

        } catch (error) {
            console.log(error);
        }
    }
}

function changePannel(setPannel: any, setMod: any, setPost: any, pannel: string, item: string) {

    if (pannel == "Module") {
        setMod(item);
    } else if (pannel == "Post") {
        setPost(item);
    }
    setPannel(pannel);
}

export default function DisplayPosts({ setPannel, setMod, setPost }: any) {

    const user = auth!.currentUser;
    const [communityPosts, setCommunityPost] = React.useState([]);
    const [personalPost, setPersonalPost] = React.useState([]);

    const [renderData, setRenderData] = React.useState([]);

    const [canRender, setCanRender] = React.useState(false);

    const [communityFocus, setCommunityFocus] = React.useState(true);
    const [personalFocus, setPersonalFocus] = React.useState(false);

    React.useEffect(() => {
        getUserSubcribedCourses(user!.uid, setCommunityPost, setPersonalPost, setRenderData).then(() => { setCanRender(true) });
    }, []);

    return (
        <View>
            {
                canRender
                    ?
                    <View>
                        <View>
                            <ThreadSearch setPannel={setPannel} setMod={setMod} />
                        </View>
                        <View style={{ top: height * 0.085, flexDirection: "row", justifyContent: "space-evenly" }}>
                            <Pressable onPress={() => { setCommunityFocus(true); setPersonalFocus(false); setRenderData(communityPosts) }}>
                                <View style={{ backgroundColor: "white", borderRadius: 10, width: width * 0.3, alignItems: "center" }}>
                                    <Text style={{ fontSize: 20, color: communityFocus ? '#FF7F7F' : '#8e918f', fontWeight: communityFocus ? 'bold' : 'normal' }}>Community</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => { setCommunityFocus(false); setPersonalFocus(true), setRenderData(personalPost) }}>
                                <View style={{ backgroundColor: "white", borderRadius: 10, width: width * 0.3, alignItems: "center" }}>
                                    <Text style={{ fontSize: 20, color: personalFocus ? '#FF7F7F' : '#8e918f', fontWeight: personalFocus ? 'bold' : 'normal' }}>Your Post</Text>
                                </View>
                            </Pressable>
                        </View>
                        <View style={{ top: height * 0.1 }}>
                            {
                                renderData.length == 0
                                    ?

                                    <View style={{ alignItems: "center" }}>
                                        {personalFocus ?
                                            <View>
                                                <Image source={require("@/assets/images/write-post-icon.png")} style={{ width: 300, height: 300, display: "block", margin: "auto" }}></Image>

                                                <Text style={{ fontSize: 24, fontWeight: "bold", flexWrap: 'wrap', textAlign: "center" }}>Post something and see them appear here!</Text>

                                            </View>
                                            :
                                            <View>
                                                <Image source={require("@/assets/images/empty-list-icon.png")} style={{ width: 400, height: 400 }}></Image>

                                                <Text style={{ fontSize: 24, fontWeight: "bold", flexWrap: 'wrap', textAlign: "center" }}>Start following courses and see them appear here!</Text>
                                            </View>
                                        }
                                    </View>
                                    : <View style={{ height: height * 0.75 }}>
                                        <FlatList
                                            data={renderData}
                                            showsHorizontalScrollIndicator={false}
                                            bounces={false}
                                            renderItem={(item) => {
                                                const post = item.item.data();
                                                const time = new Date(post!.datePosted.toDate().getTime() + 8 * 60 * 60 * 1000);
                                                return (
                                                    <View style={{ paddingBottom: height * 0.02, paddingLeft: width * 0.05, width: width, zIndex: 1 }}>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <View style={{ flex: 2 }}>
                                                                <Pressable onPress={() => changePannel(setPannel, setMod, setPost, "Module", post.course)}>
                                                                    <View>
                                                                        <Text style={{ fontSize: 20, fontWeight: "bold" }} numberOfLines={1}>{post.course} - {post.title}</Text>
                                                                    </View>
                                                                </Pressable>
                                                                <View>
                                                                    <Pressable onPress={() => { changePannel(setPannel, setMod, setPost, "Post", item.item.id) }}>
                                                                        <Text>Date posted : {time.toDateString()}</Text>
                                                                        <Text numberOfLines={2}>{post.description}</Text>
                                                                    </Pressable>
                                                                </View>
                                                            </View>
                                                            <View style={{ justifyContent: 'center', alignItems: "center", flex: 1 }}>
                                                                <Pressable onPress={() => { changePannel(setPannel, setMod, setPost, "Post", item.item.id) }}>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        <Image source={require("@/assets/images/reply-icon.png")} style={{ width: 50, height: 50 }}></Image>
                                                                        <Text style={{ top: height * 0.01, fontSize: 20 }}>{post.noReplies}</Text>
                                                                    </View>
                                                                </Pressable>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            }}
                                        />
                                    </View>
                            }
                        </View>
                    </View>
                    :
                    <View style={{ justifyContent: "center", alignItems: "center", height: height }}>
                        <Image source={require("@/assets/images/loading-icon.png")} style={{ width: 400, height: 400 }}></Image>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Loading...</Text>
                    </View>
            }
        </View>
    )
}