import { getWorks, getCategories, displayInGallery, deleteDuplicates } from "./functions.js";

// VARIABLES 
const token = window.localStorage.getItem('token');
let works = await getWorks(); //doit rester modifiable
const categories = await deleteDuplicates(await getCategories(), 'name');
const previousModalButton = document.getElementById('previousArrow');
const modalBackground = document.getElementById('modalBackground');
const deleteModal = document.getElementById('delete__option');
const createModal = document.getElementById('create__option');
const categoryToSend = document.getElementById('categoryIdToSend');
const addWorkForm = document.getElementById('addNewWork');
const addWorkButton = document.getElementById('addWorkButton');
const imagePreviewBlock = document.getElementById('imgPreviewBlock');
const maxSizeImg = 4194304;
//---------------------

const deleteButtonFunc = (currentWorkId) => {
    return async () => {
        const response = await deleteWork(currentWorkId);
        if (response.status < 400) {
            const worksToDelete = document.querySelectorAll(`.item_${currentWorkId}`);
            worksToDelete.forEach(work => work.remove());
            for(let i = works.length-1 ; i >= 0; i--){
                if(works[i].id === currentWorkId){
                    works.splice(i,1);
                }
            }  
            return;
        }
        return alert('Suppression impossible');
    }
}

const deleteWork = (workId) => {
    return fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: { 'Content-type': 'application/json', 'Authorization': 'Bearer ' + token },
    });    
}

// FUNCTIONS TO DISPLAY AND DELETE IN MODAL
const displayDeleteWorksModal = (worksToEdit) => {
    const modalGallery = document.querySelector('.modal__gallery');
    modalGallery.innerHTML = '';

    for (const currentWork of worksToEdit) {
        const workElement = document.createElement('div');
        workElement.className = `editWork item_${currentWork.id}`;
        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';
        const pngButton = document.createElement('img');
        pngButton.src = './assets/icons/trashCan.png';
        deleteButton.appendChild(pngButton);
        workElement.appendChild(deleteButton);
        const imgPart = document.createElement('img');
        imgPart.src = currentWork.imageUrl;
        workElement.appendChild(imgPart);
        const txtPart = document.createElement('a');
        txtPart.href = '#';
        txtPart.innerText = 'éditer';
        workElement.appendChild(txtPart);
        modalGallery.appendChild(workElement);

        deleteButton.addEventListener('click', deleteButtonFunc(currentWork.id));
    }
}
//---------------------------------

// FUNCTIONS TO CREATE IN MODAL
const displayModal = (display = true) => {
    modalBackground.style.display = display ? 'flex' : 'none';
    addWorkForm.reset();
}

const fillCategoriesForm = (categories) => {
    categoryToSend.innerHTML = '<option disabled selected></option>';
    for (const category of categories) {
        const categoryOption = document.createElement('option');
        categoryOption.value = category.id;
        categoryOption.innerText = category.name;
        categoryToSend.appendChild(categoryOption);
    };
}

const fillImageForm = () => {
    imagePreviewBlock.innerHTML = `<div for="imageUrlToSend" id="imageUrlToSendBlock">
                                    <img src="assets/icons/landscape.png" alt="landscape">
                                    <label for="imageUrlToSend">+ Ajouter photo
                                        <input type="file" name="imageUrl" id="imageUrlToSend" accept=".png, .jpg" required="required">
                                    </label>
                                    <p>jpg, png : 4mo max</p>
                                    </div>`;
    document.getElementById('imageUrlToSend').addEventListener('change', () => {
        const fileToPreview = imageUrlToSend.files[0];
        if (fileToPreview.size >= maxSizeImg) {
            return alert('La taille de l\'image doit être inférieure à 4Mo');
        }
        const image = document.createElement('img');
        image.src = URL.createObjectURL(fileToPreview);
        imagePreviewBlock.appendChild(image);
        document.getElementById('imageUrlToSendBlock').style.display = 'none';
    });
}

const postNewWork = async (formData) => {
    const response = await fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers: { 'Authorization': 'Bearer ' + token },
        body: formData
    });
    
    if (response.status < 400) {
        return;
    }
    return alert('Ajout non pris en compte');
}
//---------------------

//LISTENERS ON BUTTONS IN MODAL
document.getElementById('openModalButton').addEventListener('click', () => {
    displayModal();
    deleteModal.style.display = 'block';
    createModal.style.display = 'none';
    previousModalButton.style.display = 'none';
    addWorkButton.setAttribute('disabled', true);
    addWorkButton.style.backgroundColor = '#A7A7A7'
    displayDeleteWorksModal(works);
});

document.getElementById('closeModalButton').addEventListener('click', () => displayModal(false));

modalBackground.addEventListener('click', () => displayModal(false));

document.getElementById('stopPropagation').addEventListener('click', (event) => event.stopPropagation());

previousModalButton.addEventListener('click', () => {
    deleteModal.style.display = 'block';
    createModal.style.display = 'none';
    previousModalButton.style.display = 'none';
});

document.getElementById('addPicture').addEventListener('click', () => {
    deleteModal.style.display = 'none';
    createModal.style.display = 'flex';
    previousModalButton.style.display = 'inline';
    fillImageForm();
    fillCategoriesForm(categories);
});

addWorkForm.addEventListener('change', () => {
    if (!!addWorkForm.elements['title'].value && !!addWorkForm.elements['categoryId'].value && !!imageUrlToSend.files[0]) {
        addWorkButton.style.backgroundColor = '#1D6154';
        addWorkButton.disabled = false;
        return
    }
});

addWorkButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', imageUrlToSend.files[0]);
    formData.append('title', addWorkForm.elements['title'].value);
    formData.append('category', addWorkForm.elements['categoryId'].value);  
    await postNewWork(formData);
    displayModal(false);
    works = await getWorks();
    document.querySelector('.gallery').innerHTML = ('');
    displayInGallery(works);
});
// -----------