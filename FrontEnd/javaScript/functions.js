export const getWorks = async () => {
    const response = await fetch('http://localhost:5678/api/works');
    return response.json(); 
}

export const getCategories = async () => {
    const response = await fetch('http://localhost:5678/api/categories');
    return response.json();  
}

export const displayInGallery = async (works) => {
    document.querySelector('.gallery').innerHTML=('');
    for(const work of works) {
        const gallery = document.querySelector('.gallery');
        const worksElement = document.createElement('figure');
        worksElement.className = `item_${work.id}`;
        const imgPart = document.createElement('img');
        imgPart.src = work.imageUrl;
        imgPart.alt = work.title;
        worksElement.appendChild(imgPart);
        const txtPart = document.createElement('figcaption');
        txtPart.innerText = work.title;
        worksElement.appendChild(txtPart);
        gallery.appendChild(worksElement);
    };
}

export const deleteDuplicates = (values) => {
    const stringifyValues = values.map(v => JSON.stringify(v));
    const noDouble = new Set(stringifyValues);
    const cleanWorks = Array.from(noDouble);
    return cleanWorks.map(v => JSON.parse(v));
}

export const formatClassName = (name) => {
    return name.toLowerCase().replaceAll(' ','_').replace('&','');
}

export const showEditButtons = () => {
    const editMode = document.getElementsByClassName('edit__button');
    for (let button of editMode){
        button.style.display = 'inline';
    };
    const editBlock = document.getElementsByClassName('edit');
    editBlock[0].style.display = 'flex';

}

export const displayLogOutButton = () => {
    const logLink = document.getElementById('logLink');
    logLink.innerText=('logout');
    logLink.addEventListener('click', () => {
        logLink.href = 'index.html';
        window.localStorage.clear();
    });
}