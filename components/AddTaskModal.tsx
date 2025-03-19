import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAddTask: (text: string) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ visible, onClose, onAddTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    onAddTask(taskText);
    setTaskText('');
    onClose();
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
        <Button title="Adicionar" onPress={handleAddTask} />
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

export default AddTaskModal;