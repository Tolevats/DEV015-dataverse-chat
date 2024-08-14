import { getApiKey } from './apiKey.js';

// Obtén la clave API de la función getApiKey
const OPENAI_API_KEY = getApiKey();
//console.log(OPENAI_API_KEY);

export const communicateWithOpenAI = (messageContent) => {
  return new Promise((resolve, reject) => {
    if (!OPENAI_API_KEY) {
      const error = new Error("No se ha ingresado contraseña de API");
      return reject(error);
    }

    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };
    const body = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: messageContent,
        },
      ],
    });

    fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    })
      .then((response) => {
        // Verifica si la respuesta es ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
        reject(error);
      });
  });
};
