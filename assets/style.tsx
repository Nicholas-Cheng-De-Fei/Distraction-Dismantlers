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
export const NavHomeButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
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
    <View style={{
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

  navContainer: {
    position: "absolute",
    bottom: 25,
    left: 40,
    right: 40,
    borderRadius: 25,
    height: height * 0.1,
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
  ProfileHeader: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.06,
  },
  ProfileHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5, // Adjusted spacing
    textDecorationLine: 'underline',
  },
  RankHeaderText: {
    fontSize: 18,
    color: 'black', textDecorationLine: 'underline',
  },
  streakBoxHeader: {
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

  streakInfoBox: {
    width: width * 0.45,
    height: width * 0.25,
    backgroundColor: 'white',
    left: width * 0.04,
    bottom: 15,
    zIndex: 1,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },

  focusBoxHeader: {
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

  focusInfoBox: {
    width: width * 0.45,
    height: width * 0.25,
    left: width * 0.02,
    backgroundColor: 'white',
    bottom: 15,
    zIndex: 1,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },

  logoutButton: {
    borderRadius: 10,
    borderColor: "white",
    width: width * 0.2,
    height: 40,
    bottom: 5,
    backgroundColor: '#FF7F7F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },

  ///////////////////
  // For Task page //
  ///////////////////
  addButton: {
    position: 'absolute',
    top: height * 0.025,
    right: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  addButtonImage: {
    width: 18,
    height: 18,
    zIndex: 1,
  },

  taskBoxHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.3,
    height: height * 0.04,
    left: width * 0.05,
    zIndex: 20,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: 'white',
  },

  taskInfoBox: {
    width: width * 0.95,
    height: height * 0.23,
    backgroundColor: 'white',
    left: 10,
    bottom: 15,
    zIndex: 2,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',

  },
  taskHeader: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 0,
    // zIndex:30,
  },

  taskScrollView: {
    marginTop: 10,
    width: width * 0.9,
    zIndex: 0,
  },
  taskBox: {
    marginBottom: 15,
    padding: 10,
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 100,
    elevation: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 0,
  },
  taskDueDate: {
    fontSize: 16,
    margin: 0,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#d3d3d3',
  },
  taskName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
    textDecorationLine: 'none',
  },
  taskContentBox: {
    margin: 0,
    paddingTop: height * 0.01,
    paddingRight: width * 0.3,
  },

  ///////////////////////////
  // For Task page (Modal) //
  ///////////////////////////
  modalView: {
    flex: 1,
    height: 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalBox: {
    backgroundColor: "#F0F8FF",
    width: width * 0.9,
    paddingTop: height * 0.1,
    paddingBottom: height * 0.1,
    borderRadius: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold",
  },
  modalInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: width * 0.8,
    borderRadius: 10,
  },

  datePickerButton: {
    marginBottom: 10,
  },
  datePickerText: {
    color: '#1e90ff',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.4,
    gap: 0,
  },

  deleteButton: {
    backgroundColor: '#ff0000',
    padding: 5,
    borderRadius: 5,
    left : -30
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: "center",
    width: width * 0.11,
  },

  /////////////////////
  // For Profile (Activity Tracker) //
  /////////////////////

  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: height * 0.01,
    marginTop: height * 0.015,
  },
  weekdayText: {
    fontWeight: 'bold',

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 0,
  },
  cell: {
    width: 25,
    height: 25,
    margin: 2,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 12,
    color: '#000',
  },
  selectedInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  /////////////////////
  // For Leaderboard //
  /////////////////////

  leaderboardHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // height:0,
    margin:"auto",
    // bottom:height*0.23,
    // top:0,
    // left:auto,
  },
  leaderboardItem: {
    position: 'relative',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingLeft: 60, // Space for rank and name
    paddingRight: 60, // Space for points
  },
  leaderboardRank: {
    position: 'absolute',
    left: 10,
    fontWeight: 'bold',
    width: 50,
    fontSize: 18,
  },
  leaderboardName: {
    position: 'absolute',
    left: 70, // Adjust based on rank width and padding
    right: 60, // Leave space for points
    fontWeight: 'normal',
    
    fontSize: 18,
  },
  points: {
    position: 'absolute',
    right: 10,
    width: 50,
    textAlign: 'right',
    
    fontSize: 18,
  },
  /////////////////////
  // For Thread page //
  /////////////////////
  subscribeButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: height * 0.03,
    width: width * 0.2,
  },

  newPostButton: {
    width: width * 0.25,
    height: height * 0.03,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  ////////////////////////////////////
  // For Thread page (AutoComplete) //
  ////////////////////////////////////
  searchBarStyle: {
    width: width * 0.95,
    height: height * 0.05,
    borderRadius: 12,
    backgroundColor: "white",
    paddingLeft: width * 0.1,
    paddingTop: 0,
    // right: 20,
    fontSize: 18,
    // zIndex:20,
    position: 'absolute',
  },

  searchBarIcon: {
    position: 'absolute',
    width: width * 0.1,
    height: height * 0.04,

    left: width * 0.035,
    zIndex: 1,
  },

  searchContainer: {
    // position: 'absolute',
    // flexDirection: "row", 
    alignItems: "center",
    justifyContent: "center",
    top: height * 0.05,
    zIndex: 1,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: height * 0.07, // Adjust to position the list below the search bar
    left: width * 0.03,
    right: 0,
    bottom: 0,
    backgroundColor: '#F0F8FF',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    height: height * 0.25,
    width: width * 0.95,
    zIndex: 3,
  },
  suggestionItem: {
    // color:"purple",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    zIndex: 40,
  },

})