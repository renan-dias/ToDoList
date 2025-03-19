import axios from 'axios';

const API_KEY = 'YOUR_GEMINI_API_KEY'; // Substitua pela sua chave de API
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY;

export const generateContent = async (prompt) => {
  try {
    const response = await axios.post(API_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Erro ao chamar a API Gemini:', error);
    return null;
  }
};