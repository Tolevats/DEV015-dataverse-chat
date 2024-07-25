import { Footer } from "../components/footer.js";
//import { navigateTo } from "../router.js";
import { Header } from "../components/header.js";
import data from "../data/dataset.js";
import { filterData, sortData, computeStats } from "../lib/dataFunctions.js";
import { main } from "../components/main.js";
//import { renderItems } from "../components/cards.js";

export function Principal(props) {
  const viewEl = document.createElement('div');
  viewEl.setAttribute("class","view");
  //const main = document.createElement("main");
  //main.appendChild()
  /* viewEl.innerHTML = `
  `; */

  viewEl.appendChild(Header());
  viewEl.appendChild(main());

  //const cards = document.createElement('cards');

  document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.querySelector('#root');
    const platformSelect = document.querySelector('#platform');
    const sortBySelect = document.querySelector('#sortBy');
    const buttonReset = document.querySelector('#buttonClear');
    const buttonStats = document.querySelector('#buttonStats');


    const originalData = [...data];

    const renderFilteredData = () => {
      const platform = platformSelect.value;
      const sortByOption = sortBySelect.value.split('-');
      const sortBy = sortByOption[0];
      const sortOrder = sortByOption[1];

      let filteredData = data;

      if (platform) {
        filteredData = filterData(filteredData, 'streamingPlatform', platform);
      }

      if (sortBy && sortOrder) {
        filteredData = sortData(filteredData, sortBy, sortOrder);
      }

      rootElement.innerHTML = ''; 
      rootElement.appendChild(renderItems(filteredData));
    };

    platformSelect.addEventListener('change', renderFilteredData);
    sortBySelect.addEventListener('change', renderFilteredData);

    buttonReset.addEventListener('click', () => {
      sortBySelect.selectedIndex = 0; 
      platformSelect.selectedIndex = 0;  
      rootElement.innerHTML = '';       
      rootElement.append(renderItems(originalData)); 
    });
  
    buttonStats.addEventListener('click', () => {
      const stats = computeStats(data);
      
      const resultsContainer = document.querySelector('#results');
      resultsContainer.innerHTML = `
        <h4><span class="highlight">${stats.avgYears.toFixed(2)} años</span> promedia una transmisión.</h4>
         `;
    });  

    rootElement.appendChild(renderItems(data)); 
  });
  //  viewEl.appendChild(renderItems());
  viewEl.appendChild(Footer());
  return viewEl;
}