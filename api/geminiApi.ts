import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDLeezSy4a5GIG7vi-41KbCnR0zCS1O5tY'; // Substitua pela sua chave de API

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateContent(prompt: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response;
  } catch (error) {
    console.error('Erro ao chamar a API Gemini:', error);
    return null;
  }
}