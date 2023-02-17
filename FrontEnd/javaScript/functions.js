export async function getWorks(){
    const response = await fetch('http://localhost:5678/api/works');
    //convert response to json
    return response.json(); 
}

export async function getCategories(){
    const response = await fetch('http://localhost:5678/api/categories');
    //convert response to json
    return response.json();  
};

export function display(works){
    document.querySelector('.gallery').innerHTML=('');

    for(let i=0; i< works.length; i++) {

        const gallery = document.querySelector('.gallery');
        const worksElement = document.createElement('figure');
        
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

export function useSet(works){
    const noDouble = new Set(works);
    let cleanWorks = Array.from(noDouble);
    return cleanWorks
}

export function formatedClassName(string){
    return string.toLowerCase().replaceAll(' ','_').replace('&','');
}

