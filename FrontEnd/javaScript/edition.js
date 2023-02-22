import { getWorks, getCategories, display, useSet } from "./functions.js";

const token = window.localStorage.getItem('token');

const jsonWorks = await getWorks();
const works = await useSet(jsonWorks);
const jsonCategories = await getCategories();
const categories = useSet(jsonCategories);

const openModalButton = document.getElementById('openModalButton'); 
const closeModalButton = document.getElementById('closeModalButton');
const modalBackground = document.getElementById('modalBackground');
const modalContainer = document.getElementById('stopPropagation');
display(works);


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
// -----------


function displayEditMode(worksToEdit){

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