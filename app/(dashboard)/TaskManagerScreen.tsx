// app/(dashboard)/TaskManagerScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, firestore } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import dashboardStyles from "../../components/styles/dashboardStyles";
import { Task } from "../../components/models/task.types";
import { taskStyles } from "../../components/styles/taskStyles";
import { useTasks } from "../../hooks/useTasks";
import TaskCard from "../../components/tasks/TaskCard";
import TaskModal from "../../components/tasks/TaskModal";
import UserDrawer from "../../components/ui/common/UserDrawer";

const TaskManagerScreen = () => {
  // State
  const [username, setUsername] = useState("User");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Custom hook for task operations
  const {
    filteredTasks,
    loading,
    filter,
    setFilter,
    fetchTasks,
    saveTask,
    toggleTaskCompletion,
    deleteTask
  } = useTasks();

  // Fetch username on mount
  useEffect(() => {
    fetchUserData();
    fetchTasks(); // tasks will come sorted by earliest deadline (useTasks does that)
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

  // Open modal to add a new task
  const openAddTaskModal = () => {
    setEditingTask(null);
    setModalVisible(true);
  };

  // Open modal to edit an existing task
  const openEditTaskModal = (task: Task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  // Handle task save from modal
  const handleSaveTask = async (taskData: Partial<Task>) => {
    return await saveTask(taskData, editingTask?.id);
  };

  // Confirm task deletion
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

  return (
    <View style={dashboardStyles.container}>
      {/* Header with rounded edges */}
      <View style={[dashboardStyles.header, taskStyles.roundedHeader]}>
        <Text style={dashboardStyles.usernameText}>
          {username.toUpperCase()}'S TASKS
        </Text>
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={taskStyles.filterContainer}>
        <TouchableOpacity
          style={[taskStyles.filterTab, filter === "all" && taskStyles.activeFilterTab]}
          onPress={() => setFilter("all")}
        >
          <Text style={[taskStyles.filterText, filter === "all" && taskStyles.activeFilterText]}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[taskStyles.filterTab, filter === "active" && taskStyles.activeFilterTab]}
          onPress={() => setFilter("active")}
        >
          <Text
            style={[taskStyles.filterText, filter === "active" && taskStyles.activeFilterText]}
          >
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[taskStyles.filterTab, filter === "completed" && taskStyles.activeFilterTab]}
          onPress={() => setFilter("completed")}
        >
          <Text
            style={[
              taskStyles.filterText,
              filter === "completed" && taskStyles.activeFilterText
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      {loading ? (
        <View style={taskStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#683AE7" />
        </View>
      ) : filteredTasks.length === 0 ? (
        <View style={taskStyles.emptyContainer}>
          <Ionicons name="document-text-outline" size={64} color="#d0d0d0" />
          <Text style={taskStyles.emptyText}>No tasks found</Text>
          <Text style={taskStyles.emptySubText}>Tap the + button to add a task</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onToggleComplete={toggleTaskCompletion}
              onEdit={openEditTaskModal}
              onDelete={confirmDeleteTask}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={taskStyles.taskList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Add Task Button */}
      <TouchableOpacity style={taskStyles.addButton} onPress={openAddTaskModal}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Task Edit/Add Modal */}
      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />

      {/* User Drawer */}
      {drawerVisible && (
        <UserDrawer isVisible={drawerVisible} onClose={() => setDrawerVisible(false)} />
      )}
    </View>
  );
};

export default TaskManagerScreen;