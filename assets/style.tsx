import { Dimensions, StyleSheet } from "react-native";
export const { width, height } = Dimensions.get('window');
import * as Font from "expo-font"

// const getFonts = () => {
//   return (
//     Font.loadAsync({
//       'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
//       'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
//       'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
//     })
//   )
// }

// getFonts();

// Style sheet (CSS for the different components)
export const styles = StyleSheet.create({
  centerContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0FBE2'
  },

  background: {
    flex: 1,
    backgroundColor: '#E0FBE2'
  },

  /////////////////
  // Home Screen //
  /////////////////
  homeContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0FBE2',
  },

  ///////////////
  // For Timer //
  ///////////////

  startTimerButton: {
    borderRadius: 10,
    borderColor: "white",
    width: 150,
    height: 50,
    backgroundColor: '#41dc8e',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },

  stopTimerButton: {
    borderRadius: 10,
    borderColor: "white",
    width: 150,
    height: 50,
    backgroundColor: '#FF7F7F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },

  scrollerContainer: {
    width : width * 0.4,
    justifyContent : "center",
    alignItems : "center",
  },

  timerHeaderTextStyle: {
    // fontFamily : "Roboto-Bold",
    fontSize : 25,
    paddingBottom : 20,
  },

  scrollerOptionsTextStyle : {
    // fontFamily : "Roboto-Bold",
    fontSize : 50,
  },

  scrollerSelectedOptionTextStyle : {
    // fontFamily : "Roboto-Bold",
    fontSize : 50,
    color : "#EDB458",
  },

  timerProgressBar : {
    width : 200,
    height : 200,
    borderRadius : 200/2,
    borderWidth : 15,
    borderColor : "black",
    justifyContent : "center",
    alignItems : "center",
  },

  ////////////////////
  // For Login page //
  ////////////////////
  logincontainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#E0FBE2',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    // fontFamily: 'Roboto-Bold',
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    // fontFamily : 'Roboto-Medium',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    // fontFamily : 'Roboto-Medium',
    color: '#38868c',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  ///////////////////////////////
  // For onboarding pannel page//
  ///////////////////////////////

  onboardPannel: {
    alignItems: "center",
    width: width,
  },

  onboardTextTitle: {
    // fontFamily: 'Roboto-Bold',
    fontSize: 35,
    height: height * 0.06,
  },

  onboardTextContent: {
    // fontFamily: 'Roboto-Medium',
    fontSize: 25,
    textAlign: 'center',
    height: height * 0.1,
  },

  onboardImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.4,
  },

  onboardImage: {
    height: 350,
    width: 350,
    resizeMode: 'contain'
  },

  pageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    height: height * 0.2,
  },

  onboardingPageIndicator: {
    height: 5,
    width: 15,
    backgroundColor: 'grey',
    marginHorizontal: 4,
    borderRadius: 2,
  },

  onboardingButton: {
    borderRadius: 10,
    width: 200,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },

})