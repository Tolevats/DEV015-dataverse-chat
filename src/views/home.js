
import { Footer } from "../components/footer.js";
//import { navigateTo } from "../router.js";
import { Header } from "../components/header.js";
import { main } from "../components/main.js";
import { renderItems } from "../components/cards.js";
import dataset from "../data/dataset.js"
import { filterData, sortData, computeStats } from '../lib/dataFunctions.js'

export function Principal(props) {
  const viewEl = document.createElement('div');
  viewEl.setAttribute("class","view");
  
  viewEl.appendChild(Header());
  viewEl.appendChild(main());

  const data = props?.data || dataset;
  const originalData = [...data];

  //viewEl.appendChild(renderItems(data)); //paso data a renderitems
  viewEl.appendChild(Footer());

  const platformSelect = viewEl.querySelector('#platform');
  const sortBySelect = viewEl.querySelector('#sortBy');
  const buttonReset = viewEl.querySelector('#buttonClear');
  const buttonStats = viewEl.querySelector('#buttonStats');
  const resultsContainer = viewEl.querySelector('#results');


  if (platformSelect && sortBySelect && buttonReset && buttonStats && resultsContainer) {

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

      //console.log('Filtered Data:', filteredData); 
      resultsContainer.innerHTML = '';
      resultsContainer.appendChild(renderItems(filteredData));
    };

    platformSelect.addEventListener('change', () => {
      //console.log('Platform changed:', platformSelect.value);
      renderFilteredData();
    });

    sortBySelect.addEventListener('change', () => {
      // console.log('Sort by changed:', sortBySelect.value);
      renderFilteredData();
    });

    buttonReset.addEventListener('click', () => {
      //console.log('Reset button clicked');
      platformSelect.selectedIndex = 0;
      sortBySelect.selectedIndex = 0;
      resultsContainer.innerHTML = '';
      resultsContainer.appendChild(renderItems(originalData));
    });

    buttonStats.addEventListener('click', () => {
      //console.log('Stats button clicked');
      const stats = computeStats(dataset);
      //console.log('Stats:', stats); // Debugging
      resultsContainer.innerHTML = `
        <h4><span class="highlight">${stats.avgYears.toFixed(2)} años</span> promedia una transmisión.</h4>
      `;
    });

    resultsContainer.appendChild(renderItems(dataset));
    //queremos ver los objetos junto con las estadisticas ??????
  }

  
  return viewEl;
}//prueba de commit 