import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';
import { Task } from '../types';

interface EditTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onEditTask: (task: Task) => void;
  taskToEdit: Task | null;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ visible, onClose, onEditTask, taskToEdit }) => {
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTaskText(taskToEdit.text);
    }
  }, [taskToEdit]);

  const handleEditTask = () => {
    if (taskToEdit) {
      onEditTask({ ...taskToEdit, text: taskText });
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Digite a tarefa"
          value={taskText}
          onChangeText={setTaskText}
        />
        <Button title="Salvar" onPress={handleEditTask} />
        <Button title="Cancelar" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default EditTaskModal;