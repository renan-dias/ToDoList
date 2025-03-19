import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TaskList from '../components/TaskList';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Comprar mantimentos', completed: false },
    { id: 2, text: 'Ligar para o encanador', completed: false },
    // ... adicione mais tarefas
  ]);

  const handleToggle = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (  
    <View style={styles.container}>
      <TaskList tasks={tasks} onToggle={handleToggle} />
      <Button mode="contained" onPress={() => navigation.navigate('Settings')}>
        Configurações
      </Button>
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