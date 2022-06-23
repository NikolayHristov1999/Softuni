import { showHome } from "./home.js";
const nav = document.querySelector('nav');
nav.querySelector('a').addEventListener('click', showHome);
showHome();