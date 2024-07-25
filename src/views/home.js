import { Footer } from "../Componentss/Footer.js";
import { navigateTo } from "../router.js";
import {Header} from "../Componentss/Header.js"
//importación de la data
//importar las trajetas
//importar las funciones 
//importar Footer
//importar Header

export function Principal() {
  const viewEl = document.createElement('div');
  viewEl.setAttribute("class","view");
  //const main = document.createElement("main");
  //main.appendChild()
  



  const title = document.createElement('h1');
  title.textContent = 'Hola Mundo';

  const Button = document.createElement('button');
  Button.textContent = 'Ir a Chat Grupal';
  Button.addEventListener('click', () => {
    navigateTo("/chatGrupal")//como esta en la guía para cada tarjeta
  });

  viewEl.appendChild(Header());

  viewEl.appendChild(title);
  viewEl.appendChild(Button);
  viewEl.appendChild(Footer());
  return viewEl;
}