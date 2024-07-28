import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Image, Modal, TextInput, Button, Pressable } from 'react-native';
import CheckBox from 'expo-checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { collection, getDocs, setDoc, doc, updateDoc, deleteDoc } from "@firebase/firestore";
import { auth, database } from "@/firebaseConfig";
import { height, styles, width } from '@/assets/style';
import { onSnapshot } from '@firebase/firestore';

async function write(taskName: string, dueDate: Date, userID: string) {
  try {
    let taskCreationDate = new Date().toUTCString();
    await setDoc(doc(database, "tasks", userID, "taskList", taskCreationDate), {
      id: taskCreationDate,
      TaskName: taskName,
      DueDateTime: dueDate,
      isComplete: false
    });
    // read(setTasks); // Refresh the tasks list after addition
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function compareDates(task1, task2) {
  const taskA = task1.DueDateTime.seconds;
  const taskB = task2.DueDateTime.seconds;
  if (taskA < taskB) {
    return -1;
  }
  if (taskA > taskB) {
    return 1;
  }
  return 0;
}


async function read(setTasks, userID: string) {

  const querySnapshot = await getDocs(collection(database, "tasks", userID, "taskList"));
  const tasks = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().id != null || typeof doc.data().id != "undefined") // make sure to not use empty doc
      tasks.push(doc.data());
    // console.log("P");
  }
  );

  tasks.sort(compareDates);
  setTasks(tasks);

}
async function updateTaskCompletion(taskId, isCompleted: boolean, userID: string) {
  const taskRef = doc(database, "tasks", userID, "taskList", taskId);
  try {
    await updateDoc(taskRef, { isComplete: isCompleted });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}
async function deleteTask(taskId, userID: string) {
  const taskRef = doc(database, "tasks", userID, "taskList", taskId);
  try {
    await deleteDoc(taskRef);
    // read(setTasks); // Refresh the tasks list after deletion
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}

export default function Task() {

  const userID = auth!.currentUser!.uid;

  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // console.log(userID);
  // read(setTasks);
  useEffect(() => {
    // Updates view whenever taskList in db changes
    const listener = onSnapshot(collection(database, "tasks", userID, "taskList"), (snapshot) => {
      read(setTasks, userID);
    });
    return () => listener();
  }, []);
  const handleConfirm = (date: Date) => {
    setDueDate(date);
    setDatePickerVisibility(false);
  };

  function addTask(userID: string) {
    if (newTask.trim()) {
      write(newTask, dueDate, userID);
      read(setTasks, userID); // Refresh the tasks list
      setNewTask('');
      setDueDate(new Date());
      setModalVisible(false);
    }
  };
  const toggleTaskCompletion = async (taskId, currentStatus) => {
    await updateTaskCompletion(taskId, !currentStatus, userID);
  };
  const deleteT = async (taskId) => {
    await deleteTask(taskId, userID);
    read(setTasks, userID); // Refresh the tasks list
  };
  function formatDate(date: Date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let mth = months[date.getMonth()];
    let day = String(date.getDate());
    // console.log(day);

    var hr = date.getHours();
    var min = date.getMinutes();
    var minutes = String(date.getMinutes());

    if (min < 10) {
      minutes = "0" + min;
    }
    var ampm = "am";
    if (hr == 0) {
      hr = 12;
    }
    else if (hr > 12) {
      hr -= 12;
      ampm = "pm";
    }
    var timing = String(hr) + ":" + minutes + ampm;

    return mth + " " + day + " - " + timing;
  }
  return (
    <View >
      <View style={styles.taskBoxHeader}>
        <Text style={styles.taskHeader}>Tasks</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Image source={require('@/assets/images/Profile-icon/plus.png')} style={styles.addButtonImage} />
      </TouchableOpacity>
      {tasks ?
        <View style={styles.taskInfoBox}>
          <ScrollView style={styles.taskScrollView}>
            {tasks.map((task, index) => (
              <View key={index} style={styles.taskBox}>
                <CheckBox
                  value={task.isComplete}
                  onValueChange={() => toggleTaskCompletion(task.id, task.isComplete, userID)}
                />
                <View style={styles.taskContentBox}>
                  <Text style={[styles.taskName, task.isComplete && styles.completedTask]}>{task.TaskName}</Text>
                  <Text style={[styles.taskDueDate, task.isComplete && styles.completedTask]}>Due: {formatDate(task.DueDateTime.toDate())}</Text>
                </View>
                <TouchableOpacity onPress={() => deleteT(task.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View> : <View />}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, top: height * 0.3, alignItems: "center", }}>
          <View style={styles.modalBox}>

            <View style={{ alignItems: "center" }}>
              <Text style={styles.modalText}>New Task</Text>
              <TextInput
                style={[styles.modalInput]}
                placeholder="Task Name"
                value={newTask}
                onChangeText={setNewTask}
              />

              <Text style={styles.modalText}>Due Date</Text>
              <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.datePickerButton}>
                <Text style={[styles.modalInput, { width: width * 0.4 }]}>{dueDate.toLocaleDateString()} @ {dueDate.toLocaleTimeString()}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
              <Pressable onPress={() => { setModalVisible(false) }}>
                <View style={[styles.newPostButton, { backgroundColor: "#FF7F7F" }]}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>Cancel</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => addTask(userID)} >
                <View style={[styles.newPostButton, { backgroundColor: "#41dc8e" }]}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>Add Task</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
