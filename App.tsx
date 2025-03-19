// App.tsx
import React, { useState } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { PaperProvider, MD3LightTheme, MD3DarkTheme, FAB, Button, ActivityIndicator } from 'react-native-paper';
import { chamarGemini } from './api/geminiApi';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  const [modalVisible, setModalVisible] = useState(false);
  const [tarefa, setTarefa] = useState('');
  const [resposta, setResposta] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleGerarLembrete = async () => {
    setCarregando(true);
    const resultado = await chamarGemini(`Crie um lembrete para a tarefa: ${tarefa}`);
    setResposta(resultado);
    setCarregando(false);
  };

  return (
    <PaperProvider theme={theme}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>Minhas Tarefas</Text>

        {resposta ? (
          <View style={styles.respostaContainer}>
            <Text style={{ color: theme.colors.onBackground, fontStyle: 'italic' }}>
              Lembrete: {resposta}
            </Text>
          </View>
        ) : null}

        <FAB icon="plus" style={styles.fab} onPress={() => setModalVisible(true)} />

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>Nova Tarefa</Text>

              <TextInput
                placeholder="Digite a tarefa..."
                value={tarefa}
                onChangeText={setTarefa}
                style={[styles.input, { color: theme.colors.onSurface, borderColor: theme.colors.primary }]}
                placeholderTextColor={theme.colors.onSurface}
              />

              {carregando ? (
                <ActivityIndicator animating color={theme.colors.primary} />
              ) : (
                <>
                  <Button mode="contained" onPress={handleGerarLembrete} style={styles.botao}>
                    Gerar Lembrete
                  </Button>
                  <Button onPress={() => setModalVisible(false)} textColor="#d32f2f">
                    Fechar
                  </Button>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  botao: {
    marginBottom: 10,
  },
  respostaContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
  },
});
