import { getWorks, getCategories, displayInGallery, deleteDuplicates, formatClassName, showEditButtons, displayLogOutButton } from "./functions.js";

//VARIABLES
const works = await getWorks();
const categories = deleteDuplicates(await getCategories());
categories.unshift({ id: 0, name: 'Tous' });
const token = window.localStorage.getItem('token');
const filtres = document.querySelector('.filtres');
//---------------

//FUNCTIONS 
const createActiveFilterButtons = (categories, works) => {
    for (const currentCategory of categories) {
        const button = document.createElement('button');
        button.className = formatClassName(currentCategory.name);
        button.type = "button";
        button.innerText = currentCategory.name;
        filtres.appendChild(button);
        button.addEventListener('click', function () {
            const filteredResult = works.filter((work) => {
                return work.categoryId === currentCategory.id;
            });
        displayInGallery(filteredResult);
        });
    };

    const tousButton = document.querySelector('.tous');
    tousButton.addEventListener('click', function () {
        displayInGallery(works);
    });
}
//----------

//MAIN CONTENT
displayInGallery(works);

if (!token) {
    createActiveFilterButtons(categories, works);
} else {
    showEditButtons();
    displayLogOutButton();
};
//---------
