import { Header } from "../components/header.js";
import { main } from "../components/main.js";
import { Footer } from "../components/footer.js";
import { navigateTo } from "../router.js";

export const Chat =(item) => {
  const viewEl = document.createElement('section');
  viewEl.setAttribute("class","view");
    
  viewEl.appendChild(Header());
  const mainEl = main ();
  viewEl.appendChild(mainEl);

  const CardChat = document.createElement('section');
  CardChat.innerHTML = `
  <section>
    <button id="BACK">HOME</button>
    <img src="${item.imageUrl}" alt="${item.name}" itemprop="image">
    <p itemprop="description">${item.description}</p>

  </section>
  `;
  viewEl.appendChild(CardChat);
  viewEl.appendChild(Footer());

  const backButton = CardChat.querySelector('#BACK');
  backButton.addEventListener('click', () => {
    navigateTo("/"); // Navega a la página principal
  });

  return viewEl;
}