import { Principal } from './views/home.js';
import { Chat } from './views/chat.js'; 
import { chatGrupal } from './views/groupChat.js';
import { Fail } from './views/error.js';
import { setRootEl, setRoutes, onURLChange } from './router.js';
//import dataset from './data/dataset.js';
//import { filterData, sortData, computeStats } from './lib/dataFunctions.js'
//import { renderItems } from './components/cards.js'
//import data from './data/dataset.js'
//import { main } from './components/main.js'
//import { Header } from './components/header.js';
//import { Footer } from './components/footer.js';



// Define your routes and their associated views
const routes = {
  '/': Principal,
  '/error': Fail,
  /* '/api-key': modal, */
  '/chat': Chat,
  '/group-chat': chatGrupal,
};

setRoutes(routes); // Assign the routes


// Set the root element where views will be rendered

/*window.addEventListener('DOMContentLoaded', () => { 
  const rootElement = document.getElementById("root");
  //const view = Principal ({ data: dataset });
  //rootElement.appendChild(view);

  //const header ???
  //constfooter ??
  
});*/

window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.querySelector('#root');
  setRootEl(rootElement);
  onURLChange(); 
  //rootElement.appendChild(Header());
  //rootElement.appendChild(main());

  /*const platformSelect = document.querySelector('#platform');
  const sortBySelect = document.querySelector('#sortBy');
  const buttonReset = document.querySelector('#buttonClear');
  const buttonStats = document.querySelector('#buttonStats');
  const resultsContainer = document.querySelector('#results');

  const originalData = [...data];*/

  //console.log({ platformSelect, sortBySelect, buttonReset, buttonStats, resultsContainer }); 

  
  //rootElement.appendChild(Footer());
});