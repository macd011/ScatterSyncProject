// components/focus/FocusTaskList.tsx
/// Not Implemeted ----//
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { focusTimerStyles } from './../styles/focusTimerStyles';

interface Task {
  id: string;
  title: string;
  icon: string;
  color: string;
}

interface FocusTaskListProps {
  tasks: Task[];
  selectedTaskId: string | null;
  onSelectTask: (taskId: string) => void;
}

const FocusTaskList: React.FC<FocusTaskListProps> = ({ 
  tasks, 
  selectedTaskId, 
  onSelectTask 
}) => {
  return (
    <View style={focusTimerStyles.tasksContainer}>
      {/* Show only top 4 tasks */}
      {tasks.slice(0, 4).map((task) => (
        <TouchableOpacity 
          key={task.id} 
          style={[
            focusTimerStyles.taskItem, 
            selectedTaskId === task.id && focusTimerStyles.selectedTask
          ]}
          onPress={() => onSelectTask(task.id)}
        >
          <View style={[
            focusTimerStyles.radioOuter,
            selectedTaskId === task.id && { borderColor: '#683AE7' }
          ]}>
            {selectedTaskId === task.id ? (
              <View style={focusTimerStyles.radioInner} />
            ) : null}
          </View>
          <Text style={focusTimerStyles.taskLabel}>{task.title}</Text>
          <View 
            style={[
              focusTimerStyles.taskIcon, 
              { backgroundColor: task.color }
            ]}
          >
            <Ionicons name={task.icon as any} size={24} color="white" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FocusTaskList;