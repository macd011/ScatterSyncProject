// In TaskModal.tsx
import React, { useState, useEffect } from "react";
import {
  View, 
  Text, 
  Modal, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Timestamp } from "firebase/firestore";
import { Task, CATEGORIES, Category } from "../models/task.types";
import { taskStyles } from "../styles/taskStyles";

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (taskData: Partial<Task>) => Promise<boolean>;
  editingTask: Task | null;
}

const TaskModal = ({ visible, onClose, onSave, editingTask }: TaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [saving, setSaving] = useState(false);

  // Reset form when modal opens with a task to edit
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setCategoryId(editingTask.category);
      setDeadline(editingTask.deadline ? editingTask.deadline.toDate() : null);
    } else {
      setTitle("");
      setDescription("");
      setCategoryId(CATEGORIES[0].id);
      setDeadline(null);
    }
  }, [editingTask, visible]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Task title cannot be empty");
      return;
    }

    setSaving(true);
    
    const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);
    if (!selectedCategory) return;

    const taskData: Partial<Task> = {
      title: title.trim(),
      description: description.trim(),
      category: selectedCategory.id,
      categoryColor: selectedCategory.color,
      deadline: deadline ? Timestamp.fromDate(deadline) : null,
    };

    const success = await onSave(taskData);
    
    setSaving(false);
    if (success) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={taskStyles.modalOverlay}
      >
        <View style={taskStyles.modalContainer}>
          <View style={taskStyles.modalHeader}>
            <Text style={taskStyles.modalTitle}>
              {editingTask ? "Edit Task" : "Add New Task"}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={taskStyles.closeButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Form fields with lighter placeholder text */}
          <TextInput
            style={taskStyles.titleInput}
            placeholder="Task title"
            placeholderTextColor="#bbb" // Lighter placeholder color
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />

          <TextInput
            style={taskStyles.descriptionInput}
            placeholder="Description (optional)"
            placeholderTextColor="#bbb" // Lighter placeholder color
            value={description}
            onChangeText={setDescription}
            multiline
            maxLength={500}
          />

          <Text style={taskStyles.inputLabel}>Category</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={taskStyles.categoryScrollContainer}
          >
            {CATEGORIES.map((category: Category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  taskStyles.categoryButton,
                  categoryId === category.id && { 
                    backgroundColor: `${category.color}20`, // Add transparency to color
                    borderColor: category.color,
                    borderWidth: 2
                  }
                ]}
                onPress={() => setCategoryId(category.id)}
              >
                <View style={[taskStyles.categoryDot, { backgroundColor: category.color }]} />
                <Text style={taskStyles.categoryButtonText}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={taskStyles.inputLabel}>Deadline (Optional)</Text>
          <TouchableOpacity
            style={taskStyles.deadlineButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text 
              style={[
                taskStyles.deadlineButtonText,
                !deadline && { color: "#bbb" } // Lighter text for placeholder
              ]}
            >
              {deadline
                ? deadline.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Select a deadline"}
            </Text>
            {deadline && (
              <TouchableOpacity
                style={taskStyles.clearDeadlineButton}
                onPress={() => setDeadline(null)}
              >
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          {/* Date picker that shows when needed */}
          {showDatePicker && (
            <DateTimePicker
              value={deadline || new Date()}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios'); // Keep visible on iOS
                if (selectedDate) setDeadline(selectedDate);
                if (Platform.OS === 'android') setShowDatePicker(false); // Auto-close on Android
              }}
            />
          )}

          <View style={taskStyles.modalButtonContainer}>
            <TouchableOpacity
              style={taskStyles.cancelButton}
              onPress={onClose}
              disabled={saving}
            >
              <Text style={taskStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[taskStyles.saveButton, saving && taskStyles.disabledButton]}
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={taskStyles.saveButtonText}>
                {saving ? "Saving..." : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default TaskModal;