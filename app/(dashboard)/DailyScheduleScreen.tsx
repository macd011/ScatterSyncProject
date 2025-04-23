// app/(dashboard)/DailyScheduleScreen.tsx
import React, { useState, useEffect } from "react";
import {View, Text, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Image} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, firestore } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import EventModal from "../../components/calendar/EventModal";
import TaskCard from "../../components/tasks/TaskCard";
import { useCalendarEvents } from "../../hooks/useCalendarEvents";
import { useTasks } from "../../hooks/useTasks";
import { CalendarEvent } from "../../components/models/calendar.types";
import { Task } from "../../components/models/task.types";
import { dailyScheduleStyles } from "../../components/styles/dailyScheduleStyles";
import dashboardStyles from "../../components/styles/dashboardStyles";
import UserDrawer from "../../components/ui/common/UserDrawer";

// Sample avatar for events
const AVATAR_PLACEHOLDER = "https://via.placeholder.com/30";

// Helper function to get current time position
const getCurrentTimePosition = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Return both the hour and the fraction of the hour (0-1) for positioning
  return {
    hour: currentHour,
    fraction: currentMinute / 60
  };
};

// Helper to check if a task is due on a specific date
const isTaskDueOnDate = (task: Task, date: Date) => {
  if (!task.deadline) return false;
  
  const taskDate = task.deadline.toDate();
  const selectedDate = new Date(date);
  
  // Set both to midnight for date comparison only
  taskDate.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);
  
  return taskDate.getTime() === selectedDate.getTime();
};

const DailyScheduleScreen = () => {
  // Get calendar events
  const {
    events,
    loading: loadingEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDay
  } = useCalendarEvents();

  // Get tasks
  const {
    tasks,
    loading: loadingTasks,
    fetchTasks,
    toggleTaskCompletion,
    deleteTask
  } = useTasks();

  // State for user info
  const [username, setUsername] = useState("User");
  const [drawerVisible, setDrawerVisible] = useState(false);

  // State for calendar
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(getCurrentTimePosition);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTimePosition());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchUserData();
    fetchTasks();
  }, []);

  // Get username from Firestore
  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(firestore, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUsername(userData.username || "User");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Format date for display
  const monthName = selectedDate.toLocaleString('default', { month: 'long' });
  const year = selectedDate.getFullYear();
  const dayOfWeek = selectedDate.toLocaleString('default', { weekday: 'long' });
  const formattedDate = `${monthName} ${year}`;

  // Navigate between days
  const changeDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  // Get events for the selected day
  const dailyEvents = getEventsForDay(selectedDate);

  // Get tasks due on the selected day
  const tasksForSelectedDay = tasks.filter(task => isTaskDueOnDate(task, selectedDate));

  // Get events for a specific hour
  const getEventsForHour = (hour: number) => {
    return dailyEvents.filter(event => {
      const eventHour = event.startDate.toDate().getHours();
      return eventHour === hour;
    });
  };

  // Get all day events
  const allDayEvents = dailyEvents.filter(event => event.allDay);

  // Handle event click
  const handleEventPress = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  // Handle time slot click
  const handleTimeSlotPress = (hour: number) => {
    const newDate = new Date(selectedDate);
    newDate.setHours(hour, 0, 0, 0);
    
    setSelectedDate(newDate);
    setSelectedEvent(null);
    setSelectedHour(hour);
    setModalVisible(true);
  };

  // Handle save event
  const handleSaveEvent = async (partialEventData: Omit<CalendarEvent, "id">) => {
    if (selectedEvent) {
      // Update existing
      const success = await updateEvent(selectedEvent.id, partialEventData);
      if (!success) Alert.alert("Error", "Could not update event.");
      return success;
    } else {
      // Create new
      const success = await addEvent(partialEventData);
      if (!success) Alert.alert("Error", "Could not add event.");
      return success;
    }
  };

  // Delete event
  const handleDeleteEvent = async (id: string) => {
    const success = await deleteEvent(id);
    if (!success) {
      Alert.alert("Error", "Could not delete event.");
    }
    return success;
  };

  // Handle task deletion confirmation
  const confirmDeleteTask = (taskId: string) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            const success = await deleteTask(taskId);
            if (success) {
              Alert.alert("Success", "Task deleted successfully.");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  // Generate days of week
  const generateWeekDays = () => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = selectedDate.getDay();
    const currentDate = new Date();
    
    // Get dates for the week, starting with Sunday
    const weekDates = [];
    const firstDay = new Date(selectedDate);
    firstDay.setDate(firstDay.getDate() - today); // Go to Sunday
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDay);
      date.setDate(date.getDate() + i);
      weekDates.push({
        day: days[i],
        date: date.getDate(),
        isToday: date.toDateString() === selectedDate.toDateString(),
        isCurrentDate: date.toDateString() === currentDate.toDateString()
      });
    }
    
    return weekDates;
  };

  // Hours to display)
  const hours = Array.from({ length: 18 }, (_, i) => i + 7);

  // Loading state
  if (loadingEvents || loadingTasks) {
    return (
      <View style={dailyScheduleStyles.container}>
        <ActivityIndicator size="large" color="#683AE7" style={{ marginTop: 50 }} />
      </View>
    );
  }

  return (
    <View style={dailyScheduleStyles.container}>
      {/* Header */}
      <View style={[dashboardStyles.header, dailyScheduleStyles.roundedHeader]}>
        <Text style={dashboardStyles.usernameText}>
          {username.toUpperCase()}'S SCHEDULE
        </Text>
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Month Navigation Bar */}
      <View style={dailyScheduleStyles.monthNavigationBar}>
        <Text style={dailyScheduleStyles.currentMonthText}>{formattedDate}</Text>
        
        <View style={dailyScheduleStyles.navButtonsContainer}>
          <TouchableOpacity onPress={() => changeDate('prev')} style={dailyScheduleStyles.navButton}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => changeDate('next')} style={dailyScheduleStyles.navButton}>
            <Ionicons name="chevron-forward" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Week Days */}
      <View style={dailyScheduleStyles.weekDaysContainer}>
        {generateWeekDays().map((item) => (
          <View key={item.day} style={dailyScheduleStyles.weekDayItem}>
            <Text style={dailyScheduleStyles.weekDayText}>{item.day}</Text>
            <View style={[
              dailyScheduleStyles.dateCircle,
              item.isToday && dailyScheduleStyles.todayCircle
            ]}>
              <Text style={[
                dailyScheduleStyles.dateText,
                item.isToday && dailyScheduleStyles.todayText,
                item.isCurrentDate && !item.isToday && dailyScheduleStyles.currentDateText
              ]}>
                {item.date}
              </Text>
            </View>
          </View>
        ))}
      </View>
      
      {/* Day Schedule */}
      <ScrollView style={dailyScheduleStyles.scheduleContainer}>
        {/* Tasks Section */}
        {tasksForSelectedDay.length > 0 && (
          <View style={dailyScheduleStyles.tasksSectionContainer}>
            <Text style={dailyScheduleStyles.sectionTitle}>TASKS DUE TODAY</Text>
            
            {tasksForSelectedDay.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={toggleTaskCompletion}
                onDelete={confirmDeleteTask}
                variant="focus"
              />
            ))}
          </View>
        )}
        
        {/* All Day Events */}
        <View style={dailyScheduleStyles.timeRow}>
          <View style={dailyScheduleStyles.timeLabel}>
            <Text style={dailyScheduleStyles.timeLabelText}>ALL DAY</Text>
          </View>
          
          <View style={dailyScheduleStyles.eventsContainer}>
            {allDayEvents.map(event => (
              <TouchableOpacity
                key={event.id}
                style={[dailyScheduleStyles.eventCard, { backgroundColor: event.color || '#683AE7' }]}
                onPress={() => handleEventPress(event)}
              >
                <View style={dailyScheduleStyles.eventContent}>
                  <Text style={dailyScheduleStyles.eventTitle}>{event.title}</Text>
                  {event.location && (
                    <Text style={dailyScheduleStyles.eventLocation}>{event.location}</Text>
                  )}
                </View>
                
                {/* Avatar (placeholder) */}
                <View style={dailyScheduleStyles.eventAvatar}>
                  <Image
                    source={{ uri: AVATAR_PLACEHOLDER }}
                    style={dailyScheduleStyles.avatarImage}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Hourly Slots */}
        {hours.map(hour => {
          const hourEvents = getEventsForHour(hour);
          const ampm = hour >= 12 ? 'PM' : 'AM';
          const displayHour = hour > 12 ? hour - 12 : hour;
          const timeString = `${displayHour} ${ampm}`;
          
          return (
            <View key={hour} style={dailyScheduleStyles.timeRow}>
              <View style={dailyScheduleStyles.timeLabel}>
                <Text style={dailyScheduleStyles.timeLabelText}>{timeString}</Text>
              </View>
              
              <TouchableOpacity
                style={dailyScheduleStyles.eventsContainer}
                onPress={() => handleTimeSlotPress(hour)}
              >
                {/* Current time indicator */}
                {hour === currentTime.hour && (
                  <View 
                    style={[
                      dailyScheduleStyles.currentTimeLine,
                      { top: `${currentTime.fraction * 100}%` }
                    ]} 
                  />
                )}
                
                {hourEvents.map(event => (
                  <TouchableOpacity
                    key={event.id}
                    style={[dailyScheduleStyles.eventCard, { backgroundColor: event.color || '#683AE7' }]}
                    onPress={() => handleEventPress(event)}
                  >
                    <View style={dailyScheduleStyles.eventContent}>
                      <Text style={dailyScheduleStyles.eventTitle}>{event.title}</Text>
                      {event.location && (
                        <Text style={dailyScheduleStyles.eventLocation}>{event.location}</Text>
                      )}
                    </View>
                    
                    {/* Avatar (placeholder) */}
                    <View style={dailyScheduleStyles.eventAvatar}>
                      <Image
                        source={{ uri: AVATAR_PLACEHOLDER }}
                        style={dailyScheduleStyles.avatarImage}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      
      {/* Add Button */}
      <TouchableOpacity
        style={[dailyScheduleStyles.addButton, { backgroundColor: "#683AE7" }]}
        onPress={() => {
          setSelectedEvent(null);
          setSelectedHour(null);
          setModalVisible(true);
        }}
      >
        <Ionicons name="add" size={26} color="#fff" />
      </TouchableOpacity>
      
      {/* Event Modal */}
      <EventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        initialDate={selectedHour !== null ? 
          (() => {
            const date = new Date(selectedDate);
            date.setHours(selectedHour, 0, 0, 0);
            return date;
          })() : 
          selectedDate
        }
        event={selectedEvent}
      />
      
      {/* User Drawer */}
      {drawerVisible && (
        <UserDrawer
          isVisible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
        />
      )}
    </View>
  );
};

export default DailyScheduleScreen;