import { Dimensions, StyleSheet } from "react-native";
import * as Font from "expo-font";
const { width, height } = Dimensions.get('window');

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
  centerContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0FBE2'
  },

  background: {
    flex: 1,
    backgroundColor: '#E0FBE2'
  },

  ///////////////////////////////
  // For Login page//
  ///////////////////////////////
  container: {
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
    fontFamily: 'Avalon-Bold',
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    fontFamily : 'Avalon-Medium',
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
    fontFamily : 'Avalon-Medium',
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
    fontFamily: 'Avalon-Bold',
    fontSize: 35,
    height: height * 0.06,
  },

  onboardTextContent: {
    fontFamily: 'Avalon-Medium',
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