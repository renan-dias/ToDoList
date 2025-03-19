import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    loadUserName();
  }, []);

  const loadUserName = async () => {
    try {
      const storedUserName = await AsyncStorage.getItem('userName');
      if (storedUserName) {
        setUserName(storedUserName);
      }
    } catch (error) {
      console.error('Erro ao carregar nome de usuário:', error);
    }
  };

  const saveUserName = async () => {
    try {
      await AsyncStorage.setItem('userName', userName);
    } catch (error) {
      console.error('Erro ao salvar nome de usuário:', error);
    }
  };

  const clearUserName = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      setUserName('');
    } catch (error) {
      console.error('Erro ao limpar nome de usuário:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome de Usuário:</Text>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
        placeholder="Digite seu nome"
      />
      <Button title="Salvar" onPress={saveUserName} />
      <Button title="Limpar" onPress={clearUserName} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default SettingsScreen;