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
    <link rel="stylesheet" href="assets/CSS/styleChat.css">
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
            <div id="response-container"></div> <!-- el contenedor para las respuestas -->
            <input type="text" id="input-user" placeholder="Interactúa con la serie aquí">
            <input type="submit" value="→" id="buttonSubmit">
          </div>
        </section>
      </section>
    `;

    viewEl.appendChild(CardChat);

    const backButton = CardChat.querySelector('#BACK');
    const buttonSubmit = CardChat.querySelector('#buttonSubmit'); // Corregir la referencia al botón
    const userInput = CardChat.querySelector('#input-user'); // Obtener la referencia al input
    const responseContainer = CardChat.querySelector('#response-container'); //contenedor para las respuestas

    backButton.addEventListener('click', () => {
      navigateTo("/"); 
    });

    buttonSubmit.addEventListener("click", () => {
      const userMessage = userInput.value;
      if (userMessage.trim() !== "") {
        communicateWithOpenAI(userMessage)
          .then((data) => {
            //console.log(data);
            responseContainer.innerHTML = `
              <div class="answer">${userMessage}</div>
              <div class="AnswerChat">${data.choices[0].message.content}</div>
            `;
            
            userInput.value = ""; // Limpiar el campo de entrada después de enviar
          })
          .catch((error) => {
            //console.error("Error en la comunicación con OpenAI:", error);
            responseContainer.innerHTML += `
              <div class="error">Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.</div>
            `;
          });
      }
    });
  }
  viewEl.appendChild(Footer());

  return viewEl;
};