import { Header } from "../components/header.js";
import { Footer } from "../components/footer.js";
import { navigateTo } from "../router.js";
import dataset from "../data/dataset.js"; 
import { communicateWithOpenAI } from "../lib/openAIApi.js";

export const Chat = () => {
  const viewEl = document.createElement('section');
  viewEl.setAttribute("class", "view");

  viewEl.appendChild(Header());

  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get('id'); // Obtener el ID del objeto desde la URL

  const selectedItem = dataset.find(item => item.id === itemId);

  if (selectedItem) {
    const CardChat = document.createElement('div');
    CardChat.innerHTML = `
      <section>
        <div class="HomeContainer">
          <button id="BACK">←</button>
          <p>Volver a home</p>
        </div>
        
        <section class="box">
          <div class="DescriptionChat">
            <img src="${selectedItem.imageUrl}" alt="${selectedItem.name}" itemprop="image">
            <p itemprop="description">${selectedItem.description}</p>
          </div>
          <div class="ChatContainer">
            <input type="text" id="input-user" placeholder="Interactua con el chat aqui">
            <input type="submit" value="→" id="buttonSubmit">
          </div>
        </section>
      </section>
    `;

    viewEl.appendChild(CardChat);

    const backButton = CardChat.querySelector('#BACK');
    const buttonSubmit = CardChat.querySelector('#buttonSubmit');
    const userInput = CardChat.querySelector('#input-user');
    const responseTotal = document.createElement('div');

    viewEl.appendChild(responseTotal);

    backButton.addEventListener('click', () => {
      navigateTo("/"); 
    });

    buttonSubmit.addEventListener("click", () => {
      const userMessage = userInput.value;

      // Crear un prompt personalizado usando los datos del personaje seleccionado
      const characterPrompt = `You are now chatting with ${selectedItem.name}, a character known for being ${selectedItem.description}. They respond in a ${selectedItem.personality} manner. User says: "${userMessage}"`;

      communicateWithOpenAI(characterPrompt)
        .then((data) => {
          responseTotal.innerHTML = `
              <div class="answer">${userMessage}</div>
              <div class="AnswerChat">${data.choices[0].message.content}</div>
            `;
          userInput.value = ""; // Limpiar el campo de entrada después de enviar
        })
        .catch((error) => {
          console.error("Error en la comunicación con OpenAI:", error);
        });
    });
  }

  viewEl.appendChild(Footer());

  return viewEl;
};
