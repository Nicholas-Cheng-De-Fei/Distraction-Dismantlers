import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
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

// Custom Props
export const NavHomeButton = ({children, onPress}) => (
  <TouchableOpacity
    style = {{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowOpacity: 0.60,
      shadowRadius: 16.0,
    }}
    onPress={onPress}
  >
    <View style = {{
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#FF7F7F',
    }}>
      {children}
    </View>
  </TouchableOpacity>
)

// Style sheet (CSS for the different components)
export const styles = StyleSheet.create({
  centerContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:20
  },

  background: {
    flex: 1,
    backgroundColor: '#bcdaec'
  },

  /////////////////
  // Home Screen //
  /////////////////
  homeContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bcdaec',
  },

  /////////////
  // Nav Bar //
  /////////////

  navContainer : {
    position : "absolute",
    bottom : 25,
    left : 40,
    right : 40,
    borderRadius : 25,
    height : height * 0.08,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.60,
    shadowRadius: 16.0,
    backgroundColor: '#e4e4e4',
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
    width: width * 0.4,
    justifyContent: "center",
    alignItems: "center",
  },

  timerHeaderTextStyle: {
    // fontFamily : "Roboto-Bold",
    fontSize: 25,
    paddingBottom: 20,
  },

  scrollerOptionsTextStyle: {
    // fontFamily : "Roboto-Bold",
    fontSize: 50,
  },

  scrollerSelectedOptionTextStyle: {
    // fontFamily : "Roboto-Bold",
    fontSize: 50,
    color: "#EDB458",
  },

  timerProgressBar: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    borderWidth: 15,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },

  ////////////////////
  // For Login page //
  ////////////////////
  logincontainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#bcdaec',
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
  ////////////////////////////////
  // For onboarding pannel page //
  ////////////////////////////////

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
    height: 300,
    width: 300,
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

  //////////////////////
  // For profile page //
  //////////////////////

  streakBoxHeader : {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.3,
    height: height * 0.04,
    left: width * 0.05,
    zIndex: 2,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: 'white',
  },

  streakInfoBox : {
    width: width * 0.45,
    height: width * 0.25,
    backgroundColor: 'white',
    left: width * 0.04,
    bottom: 15,
    zIndex: 1,
    borderWidth: 2,
    borderRadius: 20,
    alignItems : 'center', 
    flexDirection: 'row',
  },

  focusBoxHeader : {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.37,
    height: height * 0.04,
    left: width * 0.05,
    zIndex: 2,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: 'white',
  },

  focusInfoBox : {
    width: width * 0.45,
    height: width * 0.25,
    left: width * 0.02,
    backgroundColor: 'white',
    bottom: 15,
    zIndex: 1,
    borderWidth: 2,
    borderRadius: 20,
    alignItems : 'center', 
    flexDirection: 'row',
  },
})