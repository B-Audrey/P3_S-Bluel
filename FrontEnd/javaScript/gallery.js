/////////VARIABLES//////////////////////////
const jsonWorks = await getWorks();
const works = useSet(jsonWorks);
const jsonCategories = await getCategories();
const categories = useSet(jsonCategories);
categories.unshift({id: 0, name:'Tous'});

const filtres = document.querySelector('.filtres');
/////////////////////////FUNCTIONS LINKED WITH API////////////////////
async function getWorks(){
    const response = await fetch('http://localhost:5678/api/works');
    //convert response to json
    return response.json(); 
}

async function getCategories(){
    const response = await fetch('http://localhost:5678/api/categories');
    //convert response to json
    return response.json();  
};

//////////////////////////FUNCTIONS//////////////////////
function useSet(works){
    const noDouble = new Set(works);
    let cleanWorks = Array.from(noDouble);
    return cleanWorks
}

//display Works into gallery tag
function display(works){
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

// convert text in appropriate case to css class
function formatedClassName(string){
    return string.toLowerCase().replaceAll(' ','_').replace('&','');
}

//create and listen filter buttons
function createActiveButtons(categories, works){
    //create
    for (let i=0; i<categories.length; i++){
        let current = categories[i];
        let button = document.createElement('button');

        button.className = formatedClassName(current.name);
        button.type = "button";
        button.innerText = current.name;
        filtres.appendChild(button);
        
        button.addEventListener('click', function(){
            const filteredResult = works.filter(function(work) {
                return work.categoryId === current.id;
            })
            display(filteredResult);
        });
    };
    //listen
    let tousButton = document.querySelector('.tous');
        tousButton.addEventListener('click', function(){
            display(works);
        });
}

///////////////////////////////////CALLS AND DISPLAYS////////////////////////

async function dynamicDisplay(){
    display(works);
    createActiveButtons(categories, works);
}
dynamicDisplay();