import {Dimensions, FlatList, Text, Pressable, View} from "react-native";
import OnboardingPannel from "./OnboardingPannel";
import { styles } from "../assets/style";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Data for the index pages
import { pannelData } from "../assets/OnboardingInfo";


// Function to return the HTML(View) for the index page
export default function Onboarding({navigation} : {navigation : any}) {

  const {width, height} = Dimensions.get('window');

  //Keep Track on which slide/pannel the onboarding page is in
  const [currentPannelIndex, setPannelIndex] = React.useState(0);

  // Update the index of the slide/pannel
  const updateCurrentSlideIndex = async (e: { nativeEvent: { contentOffset: { x: any; }; }; })=> {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width)
    setPannelIndex(currentIndex);

    try {
      await AsyncStorage.setItem('hasLaunchedFirstTime', 'true');
    } catch (error) {
      console.log('Error setItem: ', error);
    }
  }

  return (
    <View style = {[styles.centerContentContainer, styles.background]}>
        <FlatList data = {pannelData}
        horizontal
        showsHorizontalScrollIndicator = {false}
        pagingEnabled
        bounces = {false}
        renderItem={({item}) => <OnboardingPannel item={item}/>}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        />
        <View>
          {
            currentPannelIndex == pannelData.length - 1 ? 
            <Pressable style = {[styles.onboardingButton]} onPress={() => navigation.navigate("Login")}>
            <Text style = {{fontFamily : 'Avalon-Medium', fontSize : 25,}}>Let's get started!</Text>
            </Pressable> 
            :
            <Text></Text>
          }
        </View>
        <View style = {styles.pageIndicatorContainer}>
            {pannelData.map((_,index) =>(
                <View 
                key = {index} 
                style = {[
                    styles.onboardingPageIndicator, 
                    currentPannelIndex == index && 
                    {backgroundColor : "#B8293D", width : 25}
                    ]}>
                </View>
            ))}
        </View>
        
    </View>
  );
}
