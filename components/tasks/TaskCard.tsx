// components/tasks/TaskCard.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Task, CATEGORIES } from "./../models/task.types";
import { taskStyles } from "./../styles/taskStyles";
import { formatDeadline, getDaysRemaining } from "./taskUtils";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) => {
  return (
    <View style={taskStyles.taskCard}>
      <View style={taskStyles.taskHeader}>
        <View 
          style={[
            taskStyles.categoryBadge, 
            { backgroundColor: task.categoryColor }
          ]} 
        />
        <Text style={taskStyles.taskCategory}>
          {CATEGORIES.find(cat => cat.id === task.category)?.name}
        </Text>
        
        <TouchableOpacity
          style={taskStyles.taskCheckbox}
          onPress={() => onToggleComplete(task)}
        >
          <Ionicons
            name={task.completed ? "checkmark-circle" : "ellipse-outline"}
            size={24}
            color={task.completed ? "#4CAF50" : "#9e9e9e"}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={taskStyles.taskContent}
        onPress={() => onEdit(task)}
      >
        <Text 
          style={[
            taskStyles.taskTitle, 
            task.completed && taskStyles.completedTaskText
          ]}
        >
          {task.title}
        </Text>
        
        {task.description ? (
          <Text 
            style={[
              taskStyles.taskDescription, 
              task.completed && taskStyles.completedTaskText
            ]}
            numberOfLines={2}
          >
            {task.description}
          </Text>
        ) : null}
        
        {task.deadline && (
          <View style={taskStyles.deadlineContainer}>
            <Ionicons name="calendar-outline" size={16} color="#666" style={taskStyles.deadlineIcon} />
            <Text style={taskStyles.deadlineText}>{formatDeadline(task.deadline)}</Text>
            <Text style={taskStyles.daysRemainingText}>{getDaysRemaining(task.deadline)}</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={taskStyles.deleteButton}
        onPress={() => onDelete(task.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskCard;