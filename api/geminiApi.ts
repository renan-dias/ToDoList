import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'YOUR_API_KEY'; // Substitua pela sua chave de API

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateContent(prompt: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response;
  } catch (error) {
    console.error('Erro ao chamar a API Gemini:', error);
    return null;
  }
}