import { getWorks, getCategories, display, useSet } from "./functions.js";

const token = window.localStorage.getItem('token');

const jsonWorks = await getWorks();
const works = await useSet(jsonWorks);
const jsonCategories = await getCategories();
const categories = useSet(jsonCategories);

const openModalButton = document.getElementById('openModalButton'); 
const closeModalButton = document.getElementById('closeModalButton');
const modalBlock = document.getElementById('modalBlock');
display(works);

openModalButton.addEventListener('click', () => { 
    modalBlock.style.display = 'flex';
    displayEditMode(works);
});

closeModalButton.addEventListener('click', () => {
    modalBlock.style.display = 'none';
});

function displayEditMode(works){

    const modalGallery = document.querySelector('.modal__gallery');
    modalGallery.innerHTML = '';

    for(let i=0; i< works.length; i++) {

        const workElement = document.createElement('div');
        workElement.className = ('editWork')

        const deleteButton = document.createElement('button');
        deleteButton.className = ('deleteButton');
        const pngButton = document.createElement('img');
        pngButton.src = './assets/icons/trashCan.png'
        deleteButton.appendChild(pngButton);
        workElement.appendChild(deleteButton);
        
        const imgPart = document.createElement('img');
        imgPart.src = works[i].imageUrl;
        workElement.appendChild(imgPart);

        const txtPart = document.createElement('a');
        txtPart.href = '#';
        txtPart.innerText = 'éditer';
        workElement.appendChild(txtPart);

        modalGallery.appendChild(workElement);
    
        deleteButton.addEventListener('click', function(event){
            const workToDeleteId = works[i].id;
            deleteWork(workToDeleteId);
            alert('Element supprimé avec succès')
            event.preventDefault();
        });

    };
};

async function deleteWork(workId){
    const response = await fetch(`http://localhost:5678/api/works/${workId}`,{
        method: "DELETE",
        headers: {'Content-type':'application/json', 'Authorization' : 'Bearer ' + token },
        });
    return response.json();
}