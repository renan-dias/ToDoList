import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';
import { generateContent } from '../api/geminiApi'; // Importe a função da API

const ChatScreen = ({ route }) => {
  const { tasks } = route.params;
  const [userName, setUserName] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [inputText, setInputText] = useState('');

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

  const sendMessage = async () => {
    if (inputText.trim()) {
      const newMessage = { text: inputText, sender: 'user' as 'user' };
      setMessages([...messages, newMessage]);
      setInputText('');

      const context = tasks.map((task) => task.text).join('\n');
      const prompt = `Olá <span class="math-inline">\{userName\}, aqui estão suas tarefas\:\\n</span>{context}\n\n${inputText}`;

      try {
        const response = await generateContent(prompt);
        if (response && response.candidates && response.candidates.length > 0) {
          const botMessage = { text: response.candidates[0].content.parts[0].text, sender: 'bot' as 'bot' };
          setMessages([...messages, newMessage, botMessage]);
        } else {
          console.error('Resposta da API inválida:', response);
          setMessages([...messages, newMessage, { text: 'Erro ao obter resposta da API.', sender: 'bot' as 'bot' }]);
        }
      } catch (error) {
        console.error('Erro ao chamar a API Gemini:', error);
        setMessages([...messages, newMessage, { text: 'Erro ao chamar a API Gemini.', sender: 'bot' as 'bot' }]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite sua mensagem"
        />
        <Button title="Enviar" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  botMessage: {
    backgroundColor: '#E8E8E8',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
});

export default ChatScreen;