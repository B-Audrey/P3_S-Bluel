import {getWorks, getCategories, display, useSet} from "./functions.js";
const jsonWorks = await getWorks();
const works = useSet(jsonWorks);
const jsonCategories = await getCategories();
const categories = useSet(jsonCategories);


const openModalButton = document.getElementById('openModalButton'); // selectionne le bouton modal du DOM
const closeModalButton = document.getElementById('closeModalButton');
const modalBlock = document.getElementById('modalBlock'); // selectionne la div du bloc : #modal

openModalButton.addEventListener('click', () => { 
    modalBlock.style.display = 'flex'; //
});

closeModalButton.addEventListener('click', () => {
    modalBlock.style.display = 'none';
});


display(works);
