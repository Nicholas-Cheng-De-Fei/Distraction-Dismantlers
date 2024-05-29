import { Text, View, Image} from "react-native";
import { styles } from "../assets/style";

export default function OnboardingPannel({item} : {item:any}) {
    return (
        <View style = {styles.onboardPannel}>
            <View style = {styles.onboardImageContainer}>
                <Image source={item.image} style = {styles.onboardImage}></Image>
            </View>
            <Text style = {styles.onboardTextTitle}>{item.title}</Text>
            <Text style = {styles.onboardTextContent}>{item.content}</Text>
        </View>
    );
  }