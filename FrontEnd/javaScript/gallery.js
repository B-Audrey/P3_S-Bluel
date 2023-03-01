import {getWorks, getCategories, displayInGallery, deleteDuplicatesWorks, formatClassName, showEditButtons, displayLogOutButton} from "./functions.js";

//VARIABLES
const jsonWorks = await getWorks();
const works = deleteDuplicatesWorks(jsonWorks);
const jsonCategories = await getCategories();
const categories = deleteDuplicatesWorks(jsonCategories);
categories.unshift({id: 0, name:'Tous'});
const token = window.localStorage.getItem('token');
const filtres = document.querySelector('.filtres');
//---------------

//FUNCTIONS 
const createActiveFilterButtons = (categories, works) => {
    for (let currentCategory of categories){
        let button = document.createElement('button');
        button.className = formatClassName(currentCategory.name);
        button.type = "button";
        button.innerText = currentCategory.name;
        filtres.appendChild(button);
        button.addEventListener('click', function(){
            const filteredResult = works.filter( (work) => {
                return work.categoryId === currentCategory.id;
            });
            displayInGallery(filteredResult);
        });
    };

    let tousButton = document.querySelector('.tous');
        tousButton.addEventListener('click', function(){
            displayInGallery(works);
        });
};
//----------

//MAIN CONTENT
displayInGallery(works);
if (!token){
    createActiveFilterButtons(categories, works);
} else {
    showEditButtons();
    displayLogOutButton();
};
//---------
