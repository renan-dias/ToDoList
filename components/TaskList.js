import React from 'react';
import { View, FlatList } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggle }) => {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <TaskItem task={item} onToggle={onToggle} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default TaskList;