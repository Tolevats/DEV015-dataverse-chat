import { getApiKey } from './apiKey.js';

const OPENAI_API_KEY = getApiKey();
console.log(OPENAI_API_KEY);
export const communicateWithOpenAI = (messages) => {
  return new Promise((resolve, reject) => { // retorna una nueva promesa
    if (!OPENAI_API_KEY) { // si OPENAI_API_KEY no está definida
      const error = new Error("No se ha ingresado contraseña de API");
      return reject(error);
    }

    const url = "https://api.openai.com/v1/chat/completions"; // URL correcta de la API de OpenAI
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };
    const body = JSON.stringify({
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    // HACER SOLICITUD
    fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    })
    // MANEJAR LAS RESPUESTAS
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Verificar clave API");
          } else {
            throw new Error("No se puede realizar la solicitud");
          }
        }
        return response.json();
      })
    // RESUELVE LA PROMESA
      .then((data) => {
        resolve(data.choices[0].message.content);
      })
    // MANEJO DE ERRORES
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
        reject(error);
      });
  });
};
