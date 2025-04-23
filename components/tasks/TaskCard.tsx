// components/tasks/TaskCard.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Task, CATEGORIES, Category } from "../models/task.types";
import { taskStyles } from "../styles/taskStyles";
import { formatDeadline, getDaysRemaining } from "./taskUtils";

interface TaskCardProps {
  task: Task;
  onToggleComplete?: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  variant?: "default" | "focus";
}

const TaskCard = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  variant = "default",
}: TaskCardProps) => {
  //  normal style + optional focus variant
  const containerStyle = [
    taskStyles.taskCard,
    variant === "focus" && taskStyles.focusTaskCard,
  ];

  return (
    <View style={containerStyle}>
      {/* Category Badge - Top Left */}
      <View style={taskStyles.taskHeader}>
        <View style={taskStyles.categoryContainer}>
          <View
            style={[
              taskStyles.categoryDot,
              { backgroundColor: task.categoryColor },
            ]}
          />
          <Text style={taskStyles.taskCategory}>
            {CATEGORIES.find((cat: Category) => cat.id === task.category)?.name ||
              task.category}
          </Text>
        </View>

        {/* Delete Button - Top Right */}
        {onDelete && (
          <TouchableOpacity
            style={taskStyles.deleteButton}
            onPress={() => onDelete(task.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
          </TouchableOpacity>
        )}
      </View>

      {/* Main Task */}
      <TouchableOpacity
        style={taskStyles.taskContent}
        onPress={() => onEdit && onEdit(task)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            taskStyles.taskTitle,
            task.completed && taskStyles.completedTaskText,
          ]}
        >
          {task.title}
        </Text>

        {task.description ? (
          <Text
            style={[
              taskStyles.taskDescription,
              task.completed && taskStyles.completedTaskText,
            ]}
            numberOfLines={2}
          >
            {task.description}
          </Text>
        ) : null}

        {/* Bottom Info Row */}
        <View style={taskStyles.taskFooter}>
          {/* Deadline Info */}
          {task.deadline && (
            <View style={taskStyles.deadlineContainer}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color="#666"
                style={taskStyles.deadlineIcon}
              />
              <Text style={taskStyles.deadlineText}>
                {formatDeadline(task.deadline)}
              </Text>
              <Text style={taskStyles.daysRemainingText}>
                {getDaysRemaining(task.deadline)}
              </Text>
            </View>
          )}

          {/* Completion Checkbox */}
          {onToggleComplete && (
            <TouchableOpacity
              style={taskStyles.taskCheckbox}
              onPress={() => onToggleComplete(task)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={task.completed ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={task.completed ? "#4CAF50" : "#9e9e9e"}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TaskCard;