//Generate display with Works results


//link to the works route
async function getWorks(){
    //call works route
    const response = await fetch('http://localhost:5678/api/works');
    //convert response to json
    return response.json();  
}

//fonction to display
function display(works){
    for(let i=0; i< works.length; i++) {

        //point the gallery tag
        const gallery = document.querySelector('.gallery');

        //create the element tag for each work
        const worksElement = document.createElement('figure');

        //fill with the appropriate img and text
        const imgPart = document.createElement('img');
        imgPart.src = works[i].imageUrl;
        imgPart.crossOrigin = "anonymous"
        imgPart.alt = works[i].title;
        //link with worksElement
        worksElement.appendChild(imgPart);

        const txtPart = document.createElement('figcaption');
        txtPart.innerText = works[i].title;
        //link with worksElement
        worksElement.appendChild(txtPart);

        gallery.appendChild(worksElement);
    }
 }

 // function, waiting the response from getWorks before starting
 async function displayWorks(){
     const works = await getWorks();
     console.log(works);
     display(works);
 }

// call function to display
displayWorks();


// Generate butons to filter
async function getCategories(){
    //call works route
    const response = await fetch('http://localhost:5678/api/categories');
    //convert response to json
    return response.json();  
}

function formatClassName (string){
    return string.toLowerCase().replaceAll(' ','_');
}

function displayButton (categories){
    const filtres = document.querySelector('.filtres');
    filtres.innerHTML= `<button class="tous" type="button">Tous</button>`;
    for (let i=0; i<categories.length; i++){
        filtres.innerHTML += `<button class="${formatClassName(categories[i].name)}" type="button">${categories[i].name}</button>`;
    }
}

async function getFilterButton(){
    const categories = await getCategories()
    console.log(categories);
    displayButton(categories);
}



getFilterButton();