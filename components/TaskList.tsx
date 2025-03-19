import React from 'react';
import { View, FlatList } from 'react-native';
import TaskItem from './TaskItem';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  reminder?: Date;
}

interface Props {
  tasks: Task[];
  onToggle: (id: number) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onToggle }) => {
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
