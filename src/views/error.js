//import { Header } from "../components/header.js";
import { navigateTo } from "../router.js";
//import { Footer } from "../components/footer.js";

//<i class="fa-solid fa-robot"></i>
export default () => {
  const viewEl = document.createElement('div');
  viewEl.innerHTML = `
    /* <link rel="stylesheet" href="styleError.css" /> */
        <i class="fa-solid fa-meteor" style="color: #e32400;"></i>
        <h1 class="errorNum">404</h1>
        <h2 class="headingError">¡Ups! Página no encontrada</h2>
        <picture class="sciFiError">
            <img src="assets/img/spacerocket2.png" alt="space rocket crashing">
        </picture>
        <button id="backHome">Volver a home</button>
      `
  const buttonBackHome = viewEl.querySelector('#backHome');
  buttonBackHome.addEventListener('click', () => navigateTo("/"));
  
  
  return viewEl;
}