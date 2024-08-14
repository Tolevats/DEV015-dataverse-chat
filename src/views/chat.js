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
    const buttonSubmit = CardChat.querySelector('#buttonSubmit'); // Corregir la referencia al botón
    const userInput = CardChat.querySelector('#input-user'); // Obtener la referencia al input
    const responseTotal = document.createElement('div'); // Crear un contenedor para las respuestas

    viewEl.appendChild(responseTotal); // Agregar el contenedor al DOM

    backButton.addEventListener('click', () => {
      navigateTo("/"); 
    });

    buttonSubmit.addEventListener("click", () => {
      communicateWithOpenAI(selectedItem.name, userInput.value) 
      // .then((res) => res.json())
        .then((data) => {
          console.log(data);
          responseTotal.innerHTML = `
            <div class="answer">${userInput.value}</div>
            <div class="AnswerChat">${data.choices[0].message.content}</div>
          `;
            
          userInput.value = ""; // Limpiar el campo de entrada después de enviar
        });
    });
  }

  viewEl.appendChild(Footer());

  return viewEl;
};
