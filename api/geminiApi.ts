// geminiApi.ts
const GEMINI_API_KEY = 'AIzaSyDLeezSy4a5GIG7vi-41KbCnR0zCS1O5tY';

export async function chamarGemini(prompt: string): Promise<string> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const resposta = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Resposta não disponível.';
    return resposta;
  } catch (error) {
    console.error('Erro na API Gemini:', error);
    return 'Erro ao chamar a API.';
  }
}
