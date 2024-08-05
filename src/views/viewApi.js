import { getApiKey, setApiKey } from "../lib/apiKey.js";

const modal = () => {
  const viewApi = document.createElement("section");
  viewApi.classList.add("modal-container");
  viewApi.id= "modal-section";

  viewApi.innerHTML=`
  <section id= "modal-section">
  <h1 itemprop="title" id="title-name"> Agrega la API key compartida </h1>
  <h2> ¡Comienza a chatear con tus series favoritas! </h2>
  <input type="text" name="input-key" value="" id="modal-input" />
  <button id="modal-button" value="save" class="button-modal">Guardar API key</button>
    `;
  return viewApi;
}
