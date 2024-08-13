import { Header } from "../components/header.js";
import { Footer } from "../components/footer.js";
import { navigateTo } from "../router.js";
import dataset from "../data/dataset.js"; // Asegúrate de importar la data

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
        
        <section class=box>
        <div class="DescriptionChat">
          <img src="${selectedItem.imageUrl}" alt="${selectedItem.name}" itemprop="image">
          <p itemprop="description">${selectedItem.description}</p>
        </div>
        <div class="ChatContainer">
          <input type="text" id="input-user" placeholder="Interactua con el chat aqui">
          <input type="submit" value="→" id="button-submit">
        </div>
        </section>
      </section>
    `;

    viewEl.appendChild(CardChat);

    const backButton = CardChat.querySelector('#BACK');
    backButton.addEventListener('click', () => {
      navigateTo("/"); // Navega a la página principal
    });
  }

  viewEl.appendChild(Footer());

  return viewEl;
};
