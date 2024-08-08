// viewApi.js
import { getApiKey, setApiKey } from "../lib/apiKey.js";

export const modal = () => {
  const viewApi = document.createElement("section");
  viewApi.classList.add("modal-container");
  viewApi.id = "modal-section";

  viewApi.innerHTML = `
    <h1 itemprop="title" id="title-name"> Agrega la API key compartida </h1>
    <h2> ¡Comienza a chatear con tus series favoritas! </h2>
    <input type="text" name="input-key" value="" id="modal-input" />
    <button id="modal-button" value="save" class="button-modal">Guardar API key</button>
    <button id="close-button" value="close" class="close-modal">X</button>
  `;

  const closeButton = viewApi.querySelector('#close-button');
  const saveButton = viewApi.querySelector('#modal-button');
  const apiKeyInput = viewApi.querySelector('#modal-input');

  // Inicializar el valor del campo de entrada con la clave API existente
  apiKeyInput.value = getApiKey() || '';

  function closeModal() {
    viewApi.style.display = 'none';
  }

  function saveApiKey() {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
      setApiKey(apiKey);
      alert('Clave de API guardada correctamente.');
      closeModal();
    } else {
      alert('Por favor, ingresa una clave de API.');
    }
  }

  closeButton.addEventListener('click', closeModal);
  saveButton.addEventListener('click', saveApiKey);
  
  return viewApi;
};
