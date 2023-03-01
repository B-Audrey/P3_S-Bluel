export async function getWorks(){
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json(); 
};
export async function getCategories(){
    const response = await fetch('http://localhost:5678/api/categories');
    return await response.json();  
};
export function displayInGallery(works){
    document.querySelector('.gallery').innerHTML=('');
    for(let i=0; i< works.length; i++) {
        const gallery = document.querySelector('.gallery');
        const worksElement = document.createElement('figure');
        worksElement.className = `item_${works[i].id}`;
        const imgPart = document.createElement('img');
        imgPart.src = works[i].imageUrl;
        imgPart.alt = works[i].title;
        worksElement.appendChild(imgPart);
        const txtPart = document.createElement('figcaption');
        txtPart.innerText = works[i].title;
        worksElement.appendChild(txtPart);
        gallery.appendChild(worksElement);
    };
};
export function deleteDuplicatesWorks(works){
    const noDouble = new Set(works);
    let cleanWorks = Array.from(noDouble);
    return cleanWorks;
};
export function formatClassName(string){
    return string.toLowerCase().replaceAll(' ','_').replace('&','');
};
export function showEditButtons(){
    const editMode = document.getElementsByClassName('edit__button');
    for (let button of editMode){
        button.style.display = 'inline';
    };
    const editBlock = document.getElementsByClassName('edit');
    editBlock[0].style.display = 'flex';

};
export function displayLogOutButton(){
    const logLink = document.getElementById('logLink');
    logLink.innerText=('logout');
    logLink.addEventListener('click', () => {
        logLink.href = 'index.html';
        window.localStorage.clear();
    });
};
