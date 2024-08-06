//import { Header } from "../components/header.js";
//import { Footer } from "../components/footer.js";
//import dataset from "../data/dataset.js";
import { navigateTo } from "../router.js";
//import { Footer } from "../components/footer.js";
//import { communicateWithOpenAI } from '../lib/openAIApi.js';

export const chatGrupal = () => { 
  const viewEl = document.createElement('section');
  /*   viewEl.setAttribute("class","view");
    
  viewEl.appendChild(Header());
  const mainEl = main ();
  viewEl.appendChild(mainEl); */
  const viewChatGroup = document.createElement('section');
  viewChatGroup.innerHTML = `
  <section class='viewChatGroup'>
    <button id='goBack'>Home</button>
    <div class='chat-container'>
      <div class='navbar-chatGroup'>
        <div class='series'></div>
      <div>
      <div class='form-chatGroup'>
        <div class="text-message">
          <input id='input-chatGroup' type='text' placeholder='Escribe aquí para iniciar tu chat'>
          <button class='btn-send' id='btn-ChatGroup'>Send</button>
        </div>
      <div>
    </div>
  </section>
  `;
  /*   viewEl.appendChild(viewChatGroup);
  viewEl.appendChild(Footer()); */

  const btnBackHome = viewEl.querySelector('#goBack');
  btnBackHome.addEventListener("click", () => {
    navigateTo("/");
  });

  return viewEl;
}