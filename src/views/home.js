import { Footer } from "../components/footer.js";
// import { navigateTo } from "../router.js";
import { Header } from "../components/header.js";
import { main } from "../components/main.js";
import { renderItems } from "../components/cards.js";
import dataset from "../data/dataset.js";
import { filterData, sortData, computeStats } from '../lib/dataFunctions.js';
import { modal } from "./viewApi.js";

export function Principal(props) {
  const viewEl = document.createElement('div');
  viewEl.setAttribute("class", "view");

  viewEl.appendChild(Header());
  const mainElement = main(); // Agregado
  viewEl.appendChild(mainElement); // Agregado
  viewEl.appendChild(Footer()); // Agregado

  const data = props?.data || dataset;
  const originalData = [...data];

  // MODAL Agregado
  /*const apiKeyModal = modal();
  viewEl.appendChild(apiKeyModal.viewApi);*/

  const platformSelect = mainElement.querySelector('#platform');
  const sortBySelect = mainElement.querySelector('#sortBy');
  const buttonReset = mainElement.querySelector('#buttonClear');
  const buttonStats = mainElement.querySelector('#buttonStats');
  const resultsContainer = mainElement.querySelector('#results');
  const linkAPI = mainElement.querySelector('#modalLink');
  const modalContainer = mainElement.querySelector('#modal')

  if (platformSelect && sortBySelect && buttonReset && buttonStats && resultsContainer && linkAPI) {
    const renderFilteredData = () => {
      const platform = platformSelect.value;
      const sortByOption = sortBySelect.value.split('-');
      const sortBy = sortByOption[0];
      const sortOrder = sortByOption[1];

      let filteredData = dataset;
      if (platform) {
        filteredData = filterData(filteredData, 'streamingPlatform', platform);
      }

      if (sortBy && sortOrder) {
        filteredData = sortData(filteredData, sortBy, sortOrder);
      }

      resultsContainer.innerHTML = '';
      resultsContainer.appendChild(renderItems(filteredData));
    };

    platformSelect.addEventListener('change', () => {
      renderFilteredData();
    });

    sortBySelect.addEventListener('change', () => {
      renderFilteredData();
    });

    buttonReset.addEventListener('click', () => {
      platformSelect.selectedIndex = 0;
      sortBySelect.selectedIndex = 0;
      resultsContainer.innerHTML = '';
      resultsContainer.appendChild(renderItems(originalData));
    });

    buttonStats.addEventListener('click', () => {
      const stats = computeStats(dataset);
      resultsContainer.innerHTML = `
        <h4><span class="highlight">${stats.avgYears.toFixed(2)} años</span> promedia una transmisión.</h4>
      `;
    });

    linkAPI.addEventListener('click', (event) => {
      event.preventDefault();

      //crea modal
      const modalElement = modal ();
      modalContainer.innerHTML= '';
      modalContainer.appendChild(modalElement);
      modalElement.style.display = 'flex';

    });

    resultsContainer.appendChild(renderItems(dataset));

  } else {
    console.error('Uno o más elementos no se pudieron seleccionar:', {
      platformSelect,
      sortBySelect,
      buttonReset,
      buttonStats,
      resultsContainer,
      linkAPI,
    });
  }

  return viewEl;
}
