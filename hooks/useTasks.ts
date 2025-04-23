// hooks/useTasks.ts
import { useState, useEffect, useCallback } from "react";
import { auth, firestore } from "../firebaseConfig";
import {
  doc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  setDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Task } from "../components/models/task.types";
import { Alert } from "react-native";

// Create a shared state across hook instances
const globalState = {
  tasks: [] as Task[],
  listeners: new Set<() => void>(),
  notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(globalState.tasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Subscribe to global state changes
  useEffect(() => {
    const updateLocalState = () => {
      setTasks([...globalState.tasks]);
    };
    
    // Add listener
    globalState.listeners.add(updateLocalState);
    
    // Remove listener on cleanup
    return () => {
      globalState.listeners.delete(updateLocalState);
    };
  }, []);

  //Fetch tasks from the user's subcollection
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) return;

      
      const userDocRef = doc(firestore, "users", user.uid);
      const tasksRef = collection(userDocRef, "tasks");
      const tasksQuery = query(tasksRef, orderBy("deadline", "asc"));

      const snapshot = await getDocs(tasksQuery);
      const tasksList: Task[] = [];

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        tasksList.push({
          id: docSnap.id,
          title: data.title,
          description: data.description,
          category: data.category,
          categoryColor: data.categoryColor,
          deadline: data.deadline || null,
          completed: data.completed || false,
          createdAt: data.createdAt,
        });
      });

      // Update global state
      globalState.tasks = tasksList;
      globalState.notifyListeners();
      
      // Local state will be updated through the listener
    } catch (error) {
      console.error("Error fetching tasks:", error);
      Alert.alert("Error", "Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter tasks for the UI
  useEffect(() => {
    let result = [...tasks];

    if (filter === "active") {
      result = result.filter((task) => !task.completed);
    } else if (filter === "completed") {
      result = result.filter((task) => task.completed);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(q) ||
          task.description.toLowerCase().includes(q)
      );
    }

    setFilteredTasks(result);
  }, [tasks, filter, searchQuery]);

  //Add or update a task in /users/{uid}/tasks
  const saveTask = async (taskData: Partial<Task>, taskId?: string) => {
    try {
      const user = auth.currentUser;
      if (!user) return false;

      // references
      const userDocRef = doc(firestore, "users", user.uid);
      const tasksRef = collection(userDocRef, "tasks");

      const data = {
        ...taskData,
        updatedAt: serverTimestamp(),
      };

      if (taskId) {
        // /users/{uid}/tasks/{taskId}
        const taskDocRef = doc(tasksRef, taskId);
        await setDoc(taskDocRef, data, { merge: true });
        
        // Update in global state
        const updatedTasks = globalState.tasks.map(task => 
          task.id === taskId ? { ...task, ...taskData } : task
        );
        globalState.tasks = updatedTasks;
        globalState.notifyListeners();
      } else {
        const docRef = await addDoc(tasksRef, {
          ...data,
          createdAt: serverTimestamp(),
          completed: false, 
        });
        
        await fetchTasks();
      }

      return true;
    } catch (error) {
      console.error("Error saving task:", error);
      return false;
    }
  };

  // completion
  const toggleTaskCompletion = async (task: Task) => {
    try {
      const user = auth.currentUser;
      if (!user) return false;

      const userDocRef = doc(firestore, "users", user.uid);
      const tasksRef = collection(userDocRef, "tasks");
      const taskDocRef = doc(tasksRef, task.id);

      await setDoc(
        taskDocRef,
        { completed: !task.completed, updatedAt: serverTimestamp() },
        { merge: true }
      );

      // Update global state
      const updatedTasks = globalState.tasks.map(t => 
        t.id === task.id ? { ...t, completed: !t.completed } : t
      );
      globalState.tasks = updatedTasks;
      globalState.notifyListeners();
      
      return true;
    } catch (error) {
      console.error("Error toggling task completion:", error);
      return false;
    }
  };

  // Delete a task
  const deleteTask = async (taskId: string) => {
    try {
      const user = auth.currentUser;
      if (!user) return false;

      const userDocRef = doc(firestore, "users", user.uid);
      const tasksRef = collection(userDocRef, "tasks");
      const taskDocRef = doc(tasksRef, taskId);

      await deleteDoc(taskDocRef);
      
      // Update global state
      const updatedTasks = globalState.tasks.filter(t => t.id !== taskId);
      globalState.tasks = updatedTasks;
      globalState.notifyListeners();
      
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
    deleteTask,
  };
};