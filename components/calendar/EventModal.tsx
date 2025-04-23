// components/calendar/EventModal.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity ,Switch, ScrollView, Platform, KeyboardAvoidingView, Alert, StyleSheet} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Timestamp } from "firebase/firestore";
import { CalendarEvent } from "../models/calendar.types";
import { dailyScheduleStyles } from "../styles/dailyScheduleStyles";

interface EventModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (eventData: Omit<CalendarEvent, "id">) => Promise<boolean>;
  onDelete?: (id: string) => Promise<boolean>;
  initialDate?: Date;
  event?: CalendarEvent | null;
}

const EventModal: React.FC<EventModalProps> = ({
  visible,
  onClose,
  onSave,
  onDelete,
  initialDate = new Date(),
  event,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(initialDate);
  const [endDate, setEndDate] = useState(() => {
    const date = new Date(initialDate);
    date.setHours(date.getHours() + 1);
    return date;
  });
  const [allDay, setAllDay] = useState(false);
  const [color, setColor] = useState("#683AE7");

  // State for inline date/time pickers
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [activePicker, setActivePicker] = useState<"date" | "time" | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || "");
      setLocation(event.location || "");
      setStartDate(event.startDate.toDate());
      setEndDate(event.endDate.toDate());
      setAllDay(event.allDay);
      setColor(event.color || "#683AE7");
    } else {
      resetForm();
    }
  }, [event, initialDate, visible]);

  const resetForm = () => {
    const defaultStart = new Date(initialDate);
    const defaultEnd = new Date(defaultStart);
    defaultEnd.setHours(defaultStart.getHours() + 1);

    setTitle("");
    setDescription("");
    setLocation("");
    setStartDate(defaultStart);
    setEndDate(defaultEnd);
    setAllDay(false);
    setColor("#683AE7");
    
    // Reset picker states
    setShowStartPicker(false);
    setShowEndPicker(false);
    setActivePicker(null);
  };

  const handleDateChange = (isStartDate: boolean, selectedDate?: Date) => {
    if (selectedDate) {
      if (isStartDate) {
        setStartDate(selectedDate);
        if (selectedDate > endDate) {
          const newEnd = new Date(selectedDate);
          newEnd.setHours(selectedDate.getHours() + 1);
          setEndDate(newEnd);
        }
      } else {
        if (selectedDate >= startDate) {
          setEndDate(selectedDate);
        } else {
          Alert.alert("Invalid Dates", "End time cannot be before start time");
        }
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleToggleStartPicker = (mode?: "date" | "time") => {
    setShowStartPicker(!showStartPicker);
    setShowEndPicker(false);
    setActivePicker(mode || null);
  };

  const handleToggleEndPicker = (mode?: "date" | "time") => {
    setShowEndPicker(!showEndPicker);
    setShowStartPicker(false);
    setActivePicker(mode || null);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Missing Title", "Please enter a title for the event");
      return;
    }
    setSaving(true);

    const eventData: Omit<CalendarEvent, "id"> = {
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      startDate: Timestamp.fromDate(startDate),
      endDate: Timestamp.fromDate(endDate),
      allDay,
      color,
    };

    const success = await onSave(eventData);
    setSaving(false);

    if (success) onClose();
  };

  const handleDelete = async () => {
    if (!event || !onDelete) return;
    setSaving(true);
    const success = await onDelete(event.id);
    setSaving(false);
    if (success) onClose();
  };

  const colorOptions = [
    "#683AE7",
    "#FF5733",
    "#33A8FF",
    "#33FF57",
    "#FF33F5",
    "#F5B700",
    "#FF336E",
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={dailyScheduleStyles.modalOverlay}>
          <View style={dailyScheduleStyles.modalContainer}>
            <View style={dailyScheduleStyles.modalHandle} />

            {/* Title bar with Edit Event, New Event, Save */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text style={[dailyScheduleStyles.modalTitle, { marginBottom: 0 }]}>
                {event ? "Edit Event" : "New Event"}
              </Text>
              <TouchableOpacity
                onPress={handleSave}
                disabled={saving}
                style={{
                  backgroundColor: "#683AE7",
                  borderRadius: 6,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "500" }}>
                  {saving ? "Saving..." : "Save"}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView>
              {/* Title */}
              <View style={dailyScheduleStyles.formGroup}>
                <Text style={dailyScheduleStyles.label}>Title</Text>
                <TextInput
                  style={dailyScheduleStyles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Add title"
                  placeholderTextColor="#999"
                />
              </View>

              {/* Location */}
              <View style={dailyScheduleStyles.formGroup}>
                <Text style={dailyScheduleStyles.label}>Location</Text>
                <TextInput
                  style={dailyScheduleStyles.input}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Add location"
                  placeholderTextColor="#999"
                />
              </View>

              {/* All-day switch */}
              <View style={dailyScheduleStyles.switchContainer}>
                <Text style={dailyScheduleStyles.switchLabel}>All-day</Text>
                <Switch
                  value={allDay}
                  onValueChange={setAllDay}
                  trackColor={{ false: "#ddd", true: "#683AE7" }}
                  thumbColor={Platform.OS === "android" ? "#fff" : undefined}
                />
              </View>

              {/* Start date/time */}
              <View style={dailyScheduleStyles.formGroup}>
                <Text style={dailyScheduleStyles.label}>Starts</Text>
                <View style={styles.dateTimeContainer}>
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => handleToggleStartPicker("date")}
                  >
                    <Text style={styles.dateText}>{formatDate(startDate)}</Text>
                  </TouchableOpacity>
                  {!allDay && (
                    <TouchableOpacity
                      style={styles.timeButton}
                      onPress={() => handleToggleStartPicker("time")}
                    >
                      <Text style={[styles.timeText, { color: '#FF3B30' }]}>{formatTime(startDate)}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Inline Start DateTime Picker */}
              {showStartPicker && (
                <View style={styles.inlinePickerContainer}>
                  <DateTimePicker
                    value={startDate}
                    mode={activePicker || "date"}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(e, date) => {
                      if (date) handleDateChange(true, date);
                    }}
                    style={styles.inlinePicker}
                    textColor="#000000"
                    themeVariant="light"
                  />
                </View>
              )}

              {/* End date/time */}
              <View style={dailyScheduleStyles.formGroup}>
                <Text style={dailyScheduleStyles.label}>Ends</Text>
                <View style={styles.dateTimeContainer}>
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => handleToggleEndPicker("date")}
                  >
                    <Text style={styles.dateText}>{formatDate(endDate)}</Text>
                  </TouchableOpacity>
                  {!allDay && (
                    <TouchableOpacity
                      style={styles.timeButton}
                      onPress={() => handleToggleEndPicker("time")}
                    >
                      <Text style={[styles.timeText, { color: '#FF3B30' }]}>{formatTime(endDate)}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Inline End DateTime Picker */}
              {showEndPicker && (
                <View style={styles.inlinePickerContainer}>
                  <DateTimePicker
                    value={endDate}
                    mode={activePicker || "date"}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(e, date) => {
                      if (date) handleDateChange(false, date);
                    }}
                    style={styles.inlinePicker}
                    textColor="#000000"
                    themeVariant="light"
                  />
                </View>
              )}

              {/* Description */}
              <View style={dailyScheduleStyles.formGroup}>
                <Text style={dailyScheduleStyles.label}>Description</Text>
                <TextInput
                  style={[dailyScheduleStyles.input, { height: 80, textAlignVertical: "top" }]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Add description"
                  placeholderTextColor="#999"
                  multiline
                />
              </View>

              {/* Color */}
              <View style={dailyScheduleStyles.formGroup}>
                <Text style={dailyScheduleStyles.label}>Color</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {colorOptions.map((co) => (
                    <TouchableOpacity
                      key={co}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        backgroundColor: co,
                        margin: 5,
                        borderWidth: co === color ? 2 : 0,
                        borderColor: "#333"
                      }}
                      onPress={() => setColor(co)}
                    />
                  ))}
                </View>
              </View>

              {/* Bottom row for Cancel / Delete */}
              <View
                style={[
                  dailyScheduleStyles.buttonRow,
                  { marginTop: 30, justifyContent: "space-evenly" }
                ]}
              >
                <TouchableOpacity
                  style={[
                    dailyScheduleStyles.cancelButton,
                    { width: "35%", minHeight: 40 }
                  ]}
                  onPress={onClose}
                  disabled={saving}
                >
                  <Text style={dailyScheduleStyles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                {event && onDelete && (
                  <TouchableOpacity
                    style={[
                      dailyScheduleStyles.cancelButton,
                      {
                        width: "35%",
                        minHeight: 40,
                        backgroundColor: "#FF3B30"
                      }
                    ]}
                    onPress={handleDelete}
                    disabled={saving}
                  >
                    <Text style={dailyScheduleStyles.saveButtonText}>Delete</Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dateButton: {
    flex: 2,
  },
  timeButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  inlinePickerContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  inlinePicker: {
    height: 180,
    marginHorizontal: Platform.OS === 'ios' ? -10 : 0,
    alignSelf: 'center',
    width: '100%', 
  },
});

export default EventModal;