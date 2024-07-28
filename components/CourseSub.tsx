import React from "react";
import { View, Text, TextInput, Image, FlatList, Pressable, Modal } from "react-native";
import { auth, database } from "@/firebaseConfig";
import { width, height, styles } from "@/assets/style";
import { doc, getDoc, getDocs, query, collection, orderBy, where, updateDoc, addDoc } from '@firebase/firestore';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { press } from "@testing-library/react-native/build/user-event/press";

async function getData(currentUserId: string, courseCode: string, setData: any, setSubcriptions: any, setSubscribed: any) {
    const courseRef = doc(database, "courses", courseCode);
    const courseRefSnap = await getDoc(courseRef);
    const courseData = courseRefSnap.data();

    let info = {};
    info.moduleInfo = courseData;

    const q = query(collection(database, "thread"), where("course", "==", courseCode), orderBy("datePosted", "desc"));
    const querySnapshot = await getDocs(q);

    let postsData = [];

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        postsData.push(doc);
    });

    info.posts = postsData;

    if (currentUserId != undefined) {
        try {
            const followedCoursesRef = doc(database, "subscriptions", currentUserId);
            const followedCoursesDataSnap = await getDoc(followedCoursesRef);
            const followedCoursesData = followedCoursesDataSnap.data();

            let courses = followedCoursesData!.courses;

            setSubcriptions(courses);

            if (courses.includes(courseCode)) {
                setSubscribed(true);
            }
            ;

        } catch (error) {
            console.log(error);
        }
    }
    setData(info);

}

function goBack(setPannel: any, setCanRender: any, subcriptions: any, currentUserId: string, setLastPage: any) {

    // Update the subcriptions
    updateSubcriptions(currentUserId, subcriptions);

    setLastPage("Personal");
    setPannel("Personal");
    setCanRender(false);

}

function goToPost(setPannel: any, setLastPage: any, setPost: any, postId: string) {
    setLastPage("Module");
    setPost(postId);
    setPannel("Post");
}

function updateSubcriptions(currentUserId: string, subcriptions: any) {
    updateDoc(doc(database, "subscriptions", currentUserId), {
        courses: subcriptions,
    }).then(() => { console.log("Subcription Updated") });
}

function subcribe(moduleCode: string, subcriptions: any, setSubscribed: any) {
    setSubscribed(true);
    subcriptions.push(moduleCode);
}

function unsubcribe(moduleCode: string, subcriptions: any, setSubscribed: any) {
    setSubscribed(false);
    const index = subcriptions.indexOf(moduleCode);
    if (index > -1) { // only splice array when item is found
        subcriptions.splice(index, 1); // 2nd parameter means remove one item only
    }
}

function showModal(setModalVisible: any) {
    setModalVisible(true);
}

async function submitPost(courseCode: string, title: string, description: string, name: any, setModalVisible: any, setTitle: any, setDescription: any) {
    const threadRef = collection(database, "thread");
    const result = addDoc(threadRef, {
        "course": courseCode,
        "datePosted": new Date(),
        "description": description,
        "noReplies": 0,
        "title": title,
        "author": name,
    })

    const docId = ((await result).id);

    const result2 = await addDoc(collection(database, "thread", docId, "replies"), {}).then(() => {
        setTitle("");
        setDescription("");
        setModalVisible(false);
    })
}

export default function CourseSub({ setPannel, courseCode, lastPage, setLastPage, setPost }: any) {

    const user = auth!.currentUser;
    const [data, setData] = React.useState({});
    const [canRender, setCanRender] = React.useState(false);
    const [subcriptions, setSubcriptions] = React.useState([]);
    const [subscribed, setSubscribed] = React.useState(false);

    const [modalVisible, setModalVisible] = React.useState(false);

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        getData(user!.uid, courseCode, setData, setSubcriptions, setSubscribed).then(() => { setCanRender(true); });
    }, []);

    return (
        <View>
            {
                canRender
                    ?
                    <View>
                        <View style={{ top: height * 0.05, paddingLeft: width * 0.05, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Pressable onPress={() => goBack(setPannel, setCanRender, subcriptions, user!.uid, setLastPage)}>
                                <Image source={require("@/assets/images/back-button-icon.png")} style={{ width: 40, height: 40, tintColor: "#777777" }}></Image>
                            </Pressable>
                            <View style={{ paddingRight: width * 0.1 }}>
                                {subscribed
                                    ?
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Pressable onPress={() => showModal(setModalVisible)}>
                                            <Image source={require("@/assets/images/write-post-icon.png")} style={{ width: 35, height: 35 }}></Image>
                                        </Pressable>
                                        <Pressable onPress={() => unsubcribe(courseCode, subcriptions, setSubscribed)}>
                                            <View style={[styles.subscribeButton, { backgroundColor: "#777777", left: width * 0.02 }]}>
                                                <Text style={{ fontWeight: "bold" }}>Unsubcribe</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    :
                                    <Pressable onPress={() => subcribe(courseCode, subcriptions, setSubscribed)}>
                                        <View style={[styles.subscribeButton, { backgroundColor: "red", left: width * 0.02 }]}>
                                            <Text style={{ fontWeight: "bold" }}>Subcribe</Text>
                                        </View>
                                    </Pressable>
                                }
                            </View>
                        </View>
                        <View testID="course infomation" style={{ top: height * 0.08, paddingLeft: width * 0.03, paddingRight: width * 0.03, borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 25, fontWeight: "bold", flexWrap: "wrap" }}>{data.moduleInfo.moduleCode} - {data.moduleInfo.title}</Text>
                            <Text style={{ textAlign: "justify" }}>{data.moduleInfo.description}</Text>
                        </View>
                        <View>
                            <View style={{ top: height * 0.1 }}>
                                {
                                    data.posts.length == 0
                                        ? <View style={{ alignItems: "center" }}>
                                            <Image source={require("@/assets/images/no-post-icon.png")} style={{ width: 300, height: 300 }}></Image>
                                            <Text style={{ fontSize: 24, fontWeight: "bold", flexWrap: 'wrap', textAlign: "center" }}>So quiet here post something to start something!</Text>
                                        </View>
                                        : <View>
                                            <FlatList
                                                data={data.posts}
                                                renderItem={(item) => {
                                                    const post = item.item.data();
                                                    const time = new Date(post!.datePosted.toDate().getTime() + 8 * 60 * 60 * 1000);
                                                    return (
                                                        <View style={{ paddingBottom: height * 0.02, paddingLeft: width * 0.05, width: width }}>
                                                            <View style={{ flexDirection: "row" }}>
                                                                <View style={{ flex: 2 }}>
                                                                    <View>
                                                                        <Text style={{ fontSize: 20, fontWeight: "bold" }} numberOfLines={1}>{post.course} - {post.title}</Text>
                                                                    </View>
                                                                    <View>
                                                                        <Pressable onPress={() => { goToPost(setPannel, setLastPage, setPost, item.item.id) }}>
                                                                            <Text>Date posted : {time.toDateString()}</Text>
                                                                            <Text numberOfLines={2}>{post.description}</Text>
                                                                        </Pressable>
                                                                    </View>
                                                                </View>
                                                                <View style={{ justifyContent: 'center', alignItems: "center", flex: 1 }}>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        <Image source={require("@/assets/images/reply-icon.png")} style={{ width: 50, height: 50 }}></Image>
                                                                        <Text style={{ top: height * 0.01, fontSize: 20 }}>{post.noReplies}</Text>
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
                        </View>
                    </View>
                    :
                    <View style={{ justifyContent: "center", alignItems: "center", height: height }}>
                        <Image source={require("@/assets/images/loading-icon.png")} style={{ width: 400, height: 400 }}></Image>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Loading...</Text>
                    </View>
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, top: height * 0.2, alignItems: "center" }}>
                    <View style={styles.modalBox}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.modalText}>Post Title</Text>
                            <TextInput
                                style={styles.modalInput}
                                placeholder="Post Name"
                                value={title}
                                onChangeText={setTitle}
                            />

                            <Text style={styles.modalText}>Description</Text>
                            <TextInput
                                style={[styles.modalInput, { height: height * 0.2 }]}
                                multiline={true}
                                placeholder="Post Description"
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                            <Pressable onPress={() => { setModalVisible(false); setTitle(""); setDescription("") }}>
                                <View style={[styles.newPostButton, { backgroundColor: "#FF7F7F" }]}>
                                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>Go Back</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => {
                                submitPost(courseCode, title, description, user!.displayName, setModalVisible, setTitle, setDescription);
                                getData(user!.uid, courseCode, setData, setSubcriptions, setSubscribed);
                            }}>
                                <View style={[styles.newPostButton, { backgroundColor: "#41dc8e" }]}>
                                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>Post!</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

    )
}