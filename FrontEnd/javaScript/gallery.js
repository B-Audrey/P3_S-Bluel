/////////////////////////VARIABLES///////////////////////





//////////////////////////FUNCTIONS//////////////////////
function display(works){
    
    for(let i=0; i< works.length; i++) {

        const gallery = document.querySelector('.gallery');
        const worksElement = document.createElement('figure');
        
        const imgPart = document.createElement('img');
        imgPart.src = works[i].imageUrl;
        imgPart.crossOrigin = "anonymous"
        imgPart.alt = works[i].title;
        worksElement.appendChild(imgPart);
       
        const txtPart = document.createElement('figcaption');
        txtPart.innerText = works[i].title;
        worksElement.appendChild(txtPart);

        gallery.appendChild(worksElement);
    }
 }

function formatClassName (string){
    return string.toLowerCase().replaceAll(' ','_').replace('&','');
}

function createButton (categories){
    const filtres = document.querySelector('.filtres');
    filtres.innerHTML= `<button class="tous" type="button">Tous</button>`;
    for (let i=0; i<categories.length; i++){
        filtres.innerHTML += `<button class="${formatClassName(categories[i].name)}" type="button">${categories[i].name}</button>`;
    }
}

async function displayWorks(){
    const works = await getWorks();
    console.log(works);
    display(works);
}

async function displayFilterButton(){
    const categories = await getCategories()
    console.log(categories);
    createButton(categories);
}


/////////////////////////FUNCTION LINK WITH API////////////////////
async function getWorks(){
    const response = await fetch('http://localhost:5678/api/works');
    //convert response to json
    return response.json(); 
}

async function getCategories(){
    //call works route
    const response = await fetch('http://localhost:5678/api/categories');
    //convert response to json
    return response.json();  
}
///////////////////////////////////CALLS AND DISPLAYS////////////////////////

async function activeFilter(){
    const works = await getWorks();
    await displayWorks();
    await displayFilterButton();
    const tousBtn = document.querySelector('.tous');
    const objetsBtn = document.querySelector('.objets');
    const appartementsBtn = document.querySelector('.appartements');
    const hotelsRestaurantsBtn = document.querySelector('.hotels__restaurants');

    tousBtn.addEventListener('click', function(){
        document.querySelector('.gallery').innerHTML=('');
        display(works);
    });

    objetsBtn.addEventListener('click', function(){
        const objets = works.filter(function(work) {
            return work.categoryId === 1;
        })
        console.log(objets);
        document.querySelector('.gallery').innerHTML=('');
        display(objets);
    });
    
    appartementsBtn.addEventListener('click', function(){
        const appartements = works.filter(function(work){
            return work.categoryId ===2;
        })
        console.log(appartements);
        document.querySelector('.gallery').innerHTML=('');
        display(appartements);
    });

    hotelsRestaurantsBtn.addEventListener('click', function(){
        const hotelsRestaurants = works.filter(function(work){
            return work.categoryId === 3;
        })
        console.log(hotelsRestaurants);
        document.querySelector('.gallery').innerHTML=('');
        display(hotelsRestaurants);
    });
}

activeFilter();