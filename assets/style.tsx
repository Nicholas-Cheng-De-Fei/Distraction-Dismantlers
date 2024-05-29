import { Dimensions, StyleSheet } from "react-native";
import * as Font from "expo-font";
const {width, height} = Dimensions.get('window');

const getFonts = () => {
  return (
    Font.loadAsync({
      'Avalon-Medium': require('../assets/fonts/Avalon-Medium.ttf'),
      'Avalon-Bold': require('../assets/fonts/Avalon-Bold.ttf')
    })
  )
}

getFonts();

// Style sheet (CSS for the different components)
export const styles = StyleSheet.create({
    centerContentContainer : {
      justifyContent : 'center',
      alignItems : 'center',
      backgroundColor : '#E0FBE2'
    },
  
    background : {
      flex: 1,
      backgroundColor : '#E0FBE2'
    },

    ///////////////////////////////
    // For onboarding pannel page//
    ///////////////////////////////

    onboardPannel : {
      alignItems : "center",
      width : width,
    },

    onboardTextTitle : {
      fontFamily : 'Avalon-Bold',
      fontSize : 35,
      height : height * 0.06,
    },

    onboardTextContent : {
      fontFamily : 'Avalon-Medium',
      fontSize : 25,
      textAlign: 'center',
      height : height * 0.1,
    },

    onboardImageContainer : {
      alignItems : 'center',
      justifyContent : 'center',
      height : height * 0.4,
    },

    onboardImage : {
      height : 350,
      width : 350,
      resizeMode : 'contain'
    },

    pageIndicatorContainer : {
      flexDirection : 'row',
      justifyContent : 'center',
      alignItems : "center",
      height : height * 0.2,
    },

    onboardingPageIndicator : {
      height : 5,
      width : 15,
      backgroundColor : 'grey',
      marginHorizontal : 4,
      borderRadius : 2,
    },

    onboardingButton : {
      borderRadius : 10,
      width : 200,
      height : 50,
      backgroundColor : 'white',
      alignItems : 'center',
      justifyContent : 'center',
      borderWidth: 2,
    },

  })