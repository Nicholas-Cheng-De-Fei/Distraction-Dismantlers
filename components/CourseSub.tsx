import React from "react";
import { View, Text, TextInput, Image, FlatList, Pressable } from "react-native";
import { auth, database } from "@/firebaseConfig";
import { width, height, styles } from "@/assets/style";
import { doc, getDoc, getDocs, query, collection, orderBy, where, updateDoc } from '@firebase/firestore';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

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

function goBack(setPannel: any, lastPage: string, setCanRender: any, subcriptions: any, currentUserId: string) {

    // Update the subcriptions
    updateSubcriptions(currentUserId, subcriptions);

    setPannel(lastPage);
    setCanRender(false);

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

export default function CourseSub({ setPannel, courseCode, lastPage }: any) {

    const user = auth!.currentUser;
    const [data, setData] = React.useState({});
    const [canRender, setCanRender] = React.useState(false);
    const [subcriptions, setSubcriptions] = React.useState([]);
    const [subscribed, setSubscribed] = React.useState(false);



    React.useEffect(() => {
        getData(user!.uid, courseCode, setData, setSubcriptions, setSubscribed).then(() => { setCanRender(true); });
    }, []);

    return (
        canRender
            ?
            <View>
                <View style={{ top: height * 0.05, paddingLeft: width * 0.05, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Pressable onPress={() => goBack(setPannel, lastPage, setCanRender, subcriptions, user!.uid)}>
                        <Image source={require("@/assets/images/back-button-icon.png")} style={{ width: 40, height: 40, tintColor: "#777777" }}></Image>
                    </Pressable>
                    <View style={{ paddingRight: width * 0.1 }}>
                        {subscribed
                            ?
                            <Pressable onPress={() => unsubcribe(courseCode, subcriptions, setSubscribed)}>
                                <View style={[styles.subscribeButton, { backgroundColor: "#777777" }]}>
                                    <   Text style={{ fontWeight: "bold" }}>Unsubcribe</Text>
                                </View>
                            </Pressable>
                            :
                            <Pressable onPress={() => subcribe(courseCode, subcriptions, setSubscribed)}>
                                <View style={[styles.subscribeButton, { backgroundColor: "red" }]}>
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
                                    <Image source={require("@/assets/images/empty-list-icon.png")} style={{ width: 400, height: 400 }}></Image>
                                    <Text style={{ fontSize: 24, fontWeight: "bold", flexWrap: 'wrap', textAlign: "center" }}>Start following courses and see them appear here!</Text>
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
                                                            <Pressable onPress={() => console.log("Function")}>
                                                                <View>
                                                                    <Text style={{ fontSize: 20, fontWeight: "bold" }} numberOfLines={1}>{post.course} - {post.title}</Text>
                                                                </View>
                                                            </Pressable>
                                                            <View>
                                                                <Pressable onPress={() => {console.log("Function")}}>
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
            <View>
                <Image source={require("@/assets/images/loading-icon.png")}></Image>
                <Text>Hello</Text>
            </View>
    )
}