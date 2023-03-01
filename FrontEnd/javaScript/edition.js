import {getWorks, getCategories, display, useSet } from "./functions.js";

// VARIABLES 
const token = window.localStorage.getItem('token');
const jsonWorks = await getWorks();
let works = await useSet(jsonWorks);
const jsonCategories = await getCategories();
const categories = await useSet(jsonCategories);
const previousModalButton = document.getElementById('previousArrow');
const modalBackground = document.getElementById('modalBackground');
const deleteModal = document.getElementById('delete__option');
const createModal = document.getElementById('create__option');
const categoryToSend = document.getElementById('categoryIdToSend');
const addWorkForm = document.getElementById('addNewWork');
const addWorkButton = document.getElementById('addWorkButton');
const imagePreviewBlock = document.getElementById('imgPreviewBlock');
//---------------------

// FUNCTIONS TO DISPLAY AND DELETE IN MODAL
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
        deleteButton.addEventListener('click', () => {
            const workToDeleteId = worksToEdit[i].id;
            const response = deleteWork(workToDeleteId);
            if (response !== 200){
                const worksToDelete = document.querySelectorAll(`.item_${worksToEdit[i].id}`);
                for (let work of worksToDelete) {
                    work.remove();
                };
                return alert('Element supprimé avec succès');
            } else {
                return alert('Suppression impossible');
            };
        });
    };
};
async function deleteWork(workId){
    const response = await fetch(`http://localhost:5678/api/works/${workId}`,{
        method: "DELETE",
        headers: {'Content-type':'application/json', 'Authorization' : 'Bearer ' + token },
        });
    return response;
};
//---------------------------------

// FUNCTIONS TO CREATE IN MODAL
const fillCategoriesForm = (categories) => {
    categoryToSend.innerHTML=('<option disabled selected></option>');
    for (let category of categories) {
        const categoryOption = document.createElement('option');
        categoryOption.value = category.id;
        categoryOption.innerText = category.name;
        categoryToSend.appendChild(categoryOption);
    };
};
const displayModal = (string) => {
    modalBackground.style.display = string;
    addWorkForm.reset();
};
const fillImageForm = () => {
    imagePreviewBlock.innerHTML = `<div for="imageUrlToSend" id="imageUrlToSendBlock">
                                    <img src="assets/icons/landscape.png" alt="landscape">
                                    <label for="imageUrlToSend">+ Ajouter photo
                                        <input type="file" name="imageUrl" id="imageUrlToSend" accept=".png, .jpg" required="required">
                                    </label>
                                    <p>jpg, png : 4mo max</p>
                                    </div>`
    document.getElementById('imageUrlToSend').addEventListener('change', () => {
        const fileToPreview = imageUrlToSend.files[0];
        if (fileToPreview.size >= 4194304) {
            return alert('La taille de l\'image doit être inférieure à 4Mo');
        } else {
            const image = document.createElement('img');
            image.src = URL.createObjectURL(fileToPreview);
            imagePreviewBlock.appendChild(image);
            document.getElementById('imageUrlToSendBlock').style.display = 'none';
        };
    });
};
async function postNewWork(formData){
    const response = await fetch('http://localhost:5678/api/works',{
        method:"POST",
        headers: {'Authorization' : 'Bearer ' + token },
        body: formData
    });
    await response.json();
    if (response.status === 201) {
        return alert('Ajout réalisé avec succès');
    } else {
        return alert('Ajout non pris en compte');
    };
};
//---------------------



//LISTENERS ON BUTTONS IN MODAL
document.getElementById('openModalButton').addEventListener('click', () => { 
    displayModal('flex');
    deleteModal.style.display = ('block');
    createModal.style.display = ('none');
    previousModalButton.style.display = ('none');
    displayEditMode(works);
    addWorkForm.reset()
});
document.getElementById('closeModalButton').addEventListener('click', () => {
    displayModal('none');
});
modalBackground.addEventListener('click', () => {
    displayModal('none');

});
document.getElementById('stopPropagation').addEventListener('click', (event) => {
    event.stopPropagation();
});
document.getElementById('addPicture').addEventListener('click', () => {
    deleteModal.style.display = ('none');
    createModal.style.display = ('flex');
    previousModalButton.style.display  = ('inline')
    fillImageForm();
    fillCategoriesForm(categories);
});
previousModalButton.addEventListener('click', () => {
    deleteModal.style.display = ('block');
    createModal.style.display = ('none');
    previousModalButton.style.display = ('none');
});
addWorkForm.addEventListener('change', () =>{
    if (!!addWorkForm.elements['title'].value && !!addWorkForm.elements['categoryId'].value && !!imageUrlToSend.files[0]) {
        addWorkButton.style.backgroundColor = '#1D6154';
        addWorkButton.disabled = false;
    };
});
addWorkButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', imageUrlToSend.files[0]);
    formData.append('title', addWorkForm.elements['title'].value);
    formData.append('category', addWorkForm.elements['categoryId'].value);
    // console.log(new Array(...formData.values()));    
    await postNewWork(formData);
    displayModal('none');
    works = await getWorks();
    works = await useSet(works);
    console.log(works)
    document.querySelector('.gallery').innerHTML=('');
    display(works);
});
// -----------