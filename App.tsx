import React from 'react';
import { View, FlatList } from 'react-native';
import TaskItem from './components/TaskItem';
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskList = ({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: number) => void }) => {
  return (
    <View>
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <TaskItem task={item} onToggle={onToggle} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
    </View>
  );
};

export default TaskList;
