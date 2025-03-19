import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import TaskList from '../components/TaskList';
import AddTaskModal from '../components/AddTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);
  const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error);
    }
  };

  const addTask = (text: string) => {
    const newTask: Task = {
      id: String(Date.now()),
      text,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsEditTaskModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TaskList tasks={tasks} onDelete={deleteTask} onEdit={openEditModal} />
      <Button title="Adicionar Tarefa" onPress={() => setIsAddTaskModalVisible(true)} />
      <Button title="Assistente AI" onPress={() => navigation.navigate('Chat', { tasks })} />
      <AddTaskModal
        visible={isAddTaskModalVisible}
        onClose={() => setIsAddTaskModalVisible(false)}
        onAddTask={addTask}
      />
      <EditTaskModal
        visible={isEditTaskModalVisible}
        onClose={() => setIsEditTaskModalVisible(false)}
        onEditTask={editTask}
        taskToEdit={taskToEdit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default HomeScreen;