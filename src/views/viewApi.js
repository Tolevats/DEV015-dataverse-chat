import { getApiKey, setApiKey } from "../lib/apiKey.js";

export const modal = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const viewApi = document.createElement('section');
  viewApi.classList.add('modal-container');
  viewApi.id = 'modal-section';

  viewApi.innerHTML = `
    <div id="API" >
    <button id="close-button" value="close" class="close-modal">X</button>
    <h1 itemprop="title modal" id="title-name"> Agrega la API key compartida </h1>
    <h2 itemprop="title2 modal"> ¡Comienza a chatear con tus series favoritas! </h2>
    <input type="text" name="input-key" value="" id="modal-input" />
    <button id="modal-button" value="save" class="button-modal">Guardar API key</button>
    </div>
  `;

  const closeButton = viewApi.querySelector('#close-button');
  const saveButton = viewApi.querySelector('#modal-button');
  const apiKeyInput = viewApi.querySelector('#modal-input');

  // Inicializar el valor del campo de entrada con la clave API existente
  apiKeyInput.value = getApiKey() || '';

  function closeModal() {
    overlay.style.display = 'none';
  }

  /*   function saveApiKey() {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
      setApiKey(apiKey);
      alert('¡Felicitaciones! Ahora puedes disfrutar de nuestros chats.');
      closeModal();
    } else {
      alert('Por favor, ingresa una clave de API.');
    }
  } */
  function saveApiKey() {
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
      alert('Por favor, ingresa una clave API.');
    } else {
      // Intentar obtener la API key y manejar posibles errores
      try {
        setApiKey(apiKey);
        alert('¡Felicitaciones! Ahora puedes disfrutar de nuestros chats.');
        closeModal();
      } catch (error) { //para que salga este error habría que guardar la apikey que nos compartieron?
        alert('API key no válida. Por favor, verifica la clave e inténtalo nuevamente.');
      }
    }
  }


  closeButton.addEventListener('click', closeModal);
  saveButton.addEventListener('click', saveApiKey);

  window.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });

  overlay.appendChild(viewApi);
  document.body.appendChild(overlay);
  return { overlay, viewApi };
};
