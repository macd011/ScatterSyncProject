// hooks/useTasks.ts
import { useState, useEffect } from "react";
import { auth, firestore } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { Task } from "../components/models/task.types";
import { Alert } from "react-native";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch tasks from Firestore
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) return;

      const tasksQuery = query(
        collection(firestore, "tasks"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(tasksQuery);
      const tasksList: Task[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tasksList.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          category: data.category,
          categoryColor: data.categoryColor,
          deadline: data.deadline || null,
          completed: data.completed || false,
          createdAt: data.createdAt,
        });
      });

      setTasks(tasksList);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      Alert.alert("Error", "Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter tasks based on selected filter and search query
  useEffect(() => {
    let result = [...tasks];

    // Apply status filter
    if (filter === "active") {
      result = result.filter((task) => !task.completed);
    } else if (filter === "completed") {
      result = result.filter((task) => task.completed);
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    setFilteredTasks(result);
  }, [tasks, filter, searchQuery]);

  // Add or update task
  const saveTask = async (taskData: Partial<Task>, taskId?: string) => {
    try {
      const user = auth.currentUser;
      if (!user) return false;

      const data = {
        ...taskData,
        userId: user.uid,
        updatedAt: serverTimestamp(),
      };

      if (taskId) {
        // Update existing task
        await setDoc(doc(firestore, "tasks", taskId), data, { merge: true });
      } else {
        // Create new task
        await addDoc(collection(firestore, "tasks"), {
          ...data,
          createdAt: serverTimestamp(),
        });
      }
      
      fetchTasks();
      return true;
    } catch (error) {
      console.error("Error saving task:", error);
      return false;
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = async (task: Task) => {
    try {
      await setDoc(
        doc(firestore, "tasks", task.id),
        { completed: !task.completed, updatedAt: serverTimestamp() },
        { merge: true }
      );

      setTasks(tasks.map((t) => (t.id === task.id ? {...t, completed: !task.completed} : t)));
      return true;
    } catch (error) {
      console.error("Error toggling task completion:", error);
      return false;
    }
  };

  // Delete a task
  const deleteTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(firestore, "tasks", taskId));
      setTasks(tasks.filter((task) => task.id !== taskId));
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      return false;
    }
  };

  return {
    tasks,
    filteredTasks,
    loading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    fetchTasks,
    saveTask,
    toggleTaskCompletion,
    deleteTask
  };
};