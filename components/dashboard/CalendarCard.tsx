import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { auth, firestore } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import dashboardStyles from "../styles/dashboardStyles";

interface MarkedDates {
  [date: string]: {
    marked?: boolean;
    dotColor?: string;
    selected?: boolean;
    selectedColor?: string;
    note?: string;
    customStyles?: {
      container?: object;
      text?: object;
    };
  };
}

const CalendarCard = () => {
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [selectedDate, setSelectedDate] = useState("");
  const [note, setNote] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [addNoteMode, setAddNoteMode] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    if (user?.uid) fetchUserNotes();
  }, []);

  const fetchUserNotes = async () => {
    if (!user?.uid) return;

    try {
      const userRef = doc(firestore, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const notes = data.notes || {};
        const newMarked: MarkedDates = {};

        Object.entries(notes).forEach(([date, content]) => {
          newMarked[date] = {
            marked: true,
            dotColor: "#FFD700",
            note: content as string,
          };
        });

        setMarkedDates({
          ...newMarked,
          [getToday()]: {
            ...(newMarked[getToday()] || {}),
            selected: true,
            selectedColor: "#683AE7",
          },
        });
      }
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    const existingNote = markedDates[day.dateString]?.note || "";
    setNote(existingNote);
    setModalVisible(true);
  };

  const handleAddNote = () => {
    const today = getToday();
    setSelectedDate(today);
    setNote(markedDates[today]?.note || "");
    setAddNoteMode(true);
    setModalVisible(true);
  };

  const saveNote = async () => {
    if (!user?.uid) return;

    const userRef = doc(firestore, "users", user.uid);
    const docSnap = await getDoc(userRef);
    let currentNotes: { [key: string]: string } = {};

    if (docSnap.exists()) {
      const data = docSnap.data();
      currentNotes = data.notes || {};
    }

    const updatedNotes = {
      ...currentNotes,
      [selectedDate]: note,
    };

    await setDoc(userRef, { notes: updatedNotes }, { merge: true });
    setModalVisible(false);
    setAddNoteMode(false);
    fetchUserNotes();
    Alert.alert("Note saved!");
  };

  const deleteNote = async () => {
    if (!user?.uid) return;

    const userRef = doc(firestore, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) return;

    const data = docSnap.data();
    const notes = data.notes || {};

    delete notes[selectedDate];

    await setDoc(userRef, { notes }, { merge: true });
    setModalVisible(false);
    setAddNoteMode(false);
    fetchUserNotes();
    Alert.alert("Note deleted.");
  };

  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <View style={dashboardStyles.calendarCard}>
      <View style={dashboardStyles.calendarHeader}>
        <Text style={dashboardStyles.calendarTitle}>Your Calendar</Text>
        <TouchableOpacity 
          style={dashboardStyles.addNoteButton}
          onPress={handleAddNote}
        >
          <Ionicons name="add-circle-outline" size={24} color="#683AE7" />
          <Text style={dashboardStyles.addNoteText}>Add Note</Text>
        </TouchableOpacity>
      </View>
      
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        style={{ borderRadius: 14, overflow: "hidden" }}
        theme={{
          todayTextColor: "#683AE7",
          selectedDayBackgroundColor: "#683AE7",
          arrowColor: "#683AE7",
          monthTextColor: "#333",
        }}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={() => {
          setModalVisible(false);
          setAddNoteMode(false);
        }}>
          <View style={dashboardStyles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={dashboardStyles.modalContainer}>
                <Text style={dashboardStyles.modalTitle}>
                  {addNoteMode ? "Add Note for Today" : `Add Note - ${selectedDate}`}
                </Text>
                <TextInput
                  style={dashboardStyles.modalInput}
                  placeholder="Write something..."
                  value={note}
                  onChangeText={setNote}
                  multiline
                />

                <TouchableOpacity
                  style={dashboardStyles.saveNoteBtn}
                  onPress={saveNote}
                >
                  <Text style={dashboardStyles.saveNoteText}>
                    {markedDates[selectedDate]?.note
                      ? "Update Note"
                      : "Save Note"}
                  </Text>
                </TouchableOpacity>

                {markedDates[selectedDate]?.note && (
                  <TouchableOpacity
                    style={[
                      dashboardStyles.saveNoteBtn,
                      { backgroundColor: "#FF3B30", marginTop: 10 },
                    ]}
                    onPress={deleteNote}
                  >
                    <Text style={dashboardStyles.saveNoteText}>Delete Note</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CalendarCard;