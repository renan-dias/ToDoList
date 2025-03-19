import React, { useState } from 'react';
import { View, StyleSheet, Modal, TextInput } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import TaskList from '../components/TaskList';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  reminder?: Date;
}

const HomeScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Comprar mantimentos', completed: false },
    { id: 2, text: 'Ligar para o encanador', completed: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [reminder, setReminder] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleToggle = (id: number) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleAddTask = () => {
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: tasks.length + 1,
      text: newTaskText,
      completed: false,
      reminder,
    };
    setTasks(prev => [...prev, newTask]);
    setNewTaskText('');
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TaskList tasks={tasks} onToggle={handleToggle} />
      <Button mode="contained" onPress={() => setModalVisible(true)} style={styles.button}>
        Nova Tarefa
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('Settings')} style={styles.button}>
        Configurações
      </Button>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text variant="titleMedium">Adicionar Tarefa</Text>
            <TextInput
              placeholder="Digite a tarefa"
              style={[styles.input, { color: colors.onSurface }]}
              placeholderTextColor={colors.onSurface}
              value={newTaskText}
              onChangeText={setNewTaskText}
            />
            <Button onPress={() => setShowDatePicker(true)} mode="outlined" style={styles.button}>
              Definir Lembrete
            </Button>
            {showDatePicker && (
              <DateTimePicker
                value={reminder}
                mode="datetime"
                display="default"
                onChange={(_, date) => {
                  if (date) setReminder(date);
                  setShowDatePicker(false);
                }}
              />
            )}
            <Button mode="contained" onPress={handleAddTask} style={styles.button}>
              Adicionar
            </Button>
            <Button onPress={() => setModalVisible(false)} style={styles.button}>
              Cancelar
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
    padding: 20,
  },
  modalContent: {
    borderRadius: 8,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default HomeScreen;
