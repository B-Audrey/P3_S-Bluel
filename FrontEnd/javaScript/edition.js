import { getWorks, getCategories, display, useSet } from "./functions.js";

const token = window.localStorage.getItem('token');

const jsonWorks = await getWorks();
const works = await useSet(jsonWorks);
const jsonCategories = await getCategories();
const categories = await useSet(jsonCategories);

// VARIABLES 
const openModalButton = document.getElementById('openModalButton'); 
const closeModalButton = document.getElementById('closeModalButton');
const previousModalButton = document.getElementById('previousArrow');
const modalBackground = document.getElementById('modalBackground');
const modalContainer = document.getElementById('stopPropagation');
const addModal = document.getElementById('addPicture');
const deleteModal = document.getElementById('delete__option');
const createModal = document.getElementById('create__option');
const categorieToSend = document.getElementById('categorieIdToSend');
const addWorkForm = document.getElementById('addNewWork');
const addWorkButton = document.getElementById('addWorkButton');

let newImageUrl = '';
let newTitle = '';
let newCategoryId = '';
//---------------------

//MAIN
display(works);
//---------------

//LISTENER DISPLAY MODAL
const displayModal = (string) => {
    modalBackground.style.display = string;
} 
openModalButton.addEventListener('click', () => { 
    displayModal('flex');
    displayEditMode(works);
});
closeModalButton.addEventListener('click', () => {
    displayModal('none');
});
modalBackground.addEventListener('click', () => {
    displayModal('none');
});
modalContainer.addEventListener('click', (event) => {
    event.stopPropagation();
});
addModal.addEventListener('click', () => {
    deleteModal.style.display = ('none');
    createModal.style.display = ('flex');
    previousModalButton.style.display  = ('inline')
    fillCategoriesForm(categories);
});
previousModalButton.addEventListener('click', () => {
    deleteModal.style.display = ('block');
    createModal.style.display = ('none');
    previousModalButton.style.display = ('none');
});
addWorkButton.addEventListener('click', (event) => {
    let newData = getNewData();
    console.log(newData);
    getFormData(newData);
});
// -----------

// DISPLAY AND DELETE IN MODAL
const displayEditMode = (worksToEdit) => {

    const modalGallery = document.querySelector('.modal__gallery');
    modalGallery.innerHTML = '';

    for(let i=0; i< worksToEdit.length; i++) {

        const workElement = document.createElement('div');
        workElement.className = ('editWork ')
        workElement.className += `item_${worksToEdit[i].id}`;
       
        const deleteButton = document.createElement('button');
        deleteButton.className = ('deleteButton');
        const pngButton = document.createElement('img');
        pngButton.src = './assets/icons/trashCan.png'
        deleteButton.appendChild(pngButton);
        workElement.appendChild(deleteButton);
        
        const imgPart = document.createElement('img');
        imgPart.src = worksToEdit[i].imageUrl;
        workElement.appendChild(imgPart);

        const txtPart = document.createElement('a');
        txtPart.href = '#';
        txtPart.innerText = 'éditer';
        workElement.appendChild(txtPart);

        modalGallery.appendChild(workElement);
    
        deleteButton.addEventListener('click', function(){
            const workToDeleteId = worksToEdit[i].id;
            deleteWork(workToDeleteId);
            alert('Element supprimé avec succès');
            const worksToDelete = document.querySelectorAll(`.item_${worksToEdit[i].id}`);
            for (let work of worksToDelete) {
                work.remove();
            };
        });
    };
};

async function deleteWork(workId){
    const response = await fetch(`http://localhost:5678/api/works/${workId}`,{
        method: "DELETE",
        headers: {'Content-type':'application/json', 'Authorization' : 'Bearer ' + token },
        });
        console.log(response);
    return response;
}
//---------------------------------

// CREATE IN MODAL
const fillCategoriesForm = (categories) => {
    console.log(categories);
    for (let categorie of categories) {
        const categorieOption = document.createElement('option');
        categorieOption.value = categorie.id;
        categorieOption.innerText = categorie.name;
        categorieToSend.appendChild(categorieOption);
    };
};
//---------------------

//FORM DATA
const getFormData = (newData) => {
    let formData = new FormData(newData);
    // formData.append('imageUrl', newData.imageUrl);
    // formData.append('title', newData.title);
    // formData.append('categoryId', newData.categoryId);
    console.log(formData)
};

const getNewData = () => {
    let newData = [];
        // newImageUrl = document.querySelector('#imageUrlToSend').value; 
    newTitle = document.querySelector('#titleToSend').value;
    newData.push({'title' : newTitle});
    newCategoryId = document.querySelector('#categorieIdToSend').value;
    newData.push({'categoryId' : newCategoryId});
    console.log(newData)
    return newData
};
//-------------------