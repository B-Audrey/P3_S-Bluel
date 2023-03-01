import {getWorks, getCategories, display, useSet, formatedClassName, editDisplay, logOut} from "./functions.js";

//VARIABLES
const jsonWorks = await getWorks();
const works = useSet(jsonWorks);
const jsonCategories = await getCategories();
const categories = useSet(jsonCategories);
categories.unshift({id: 0, name:'Tous'});
const token = window.localStorage.getItem('token');
const filtres = document.querySelector('.filtres');
//---------------

//FUNCTIONS TO CREATE 
function createActiveButtons(categories, works){
    for (let i=0; i<categories.length; i++){
        let current = categories[i];
        let button = document.createElement('button');
        button.className = formatedClassName(current.name);
        button.type = "button";
        button.innerText = current.name;
        filtres.appendChild(button);
        button.addEventListener('click', function(){
            const filteredResult = works.filter(function(work) {
                return work.categoryId === current.id;
            });
            display(filteredResult);
        });
    };
    //listen
    let tousButton = document.querySelector('.tous');
        tousButton.addEventListener('click', function(){
            display(works);
        });
};

//MAIN CONTENT
async function dynamicDisplay(){
    display(works);
    createActiveButtons(categories, works);
};


if (!token){
    dynamicDisplay();
} else {
    display(works);
    editDisplay()
    logOut()
};
//---------
