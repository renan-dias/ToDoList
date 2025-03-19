import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

interface TaskItemProps {
  task: {
    id: number;
    text: string;
    completed: boolean;
  };
  onToggle: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <View style={styles.container}>
      <Checkbox
        status={task.completed ? 'checked' : 'unchecked'}
        onPress={() => onToggle(task.id)}
      />
      <Text style={styles.text}>{task.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default TaskItem;
