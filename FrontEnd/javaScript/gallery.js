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
// function noDouble(works) {
//     const worksWithoutDouble = new Set();
//     for(work of works) {
//         worksWithoutDouble.add(work);
//     }
//     return worksWithoutDouble;
// }

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
}

// convert text in appropriate case to css class
function formatClassName(string){
    return string.toLowerCase().replaceAll(' ','_').replace('&','');
}

//create new button
function createButtons(categories, works){
    const filtres = document.querySelector('.filtres');
    let tousButton = document.createElement ('button')
    tousButton.class = 'tous';
    tousButton.type = 'button';
    tousButton.innerText = 'Tous';
    filtres.appendChild(tousButton);
    tousButton.addEventListener('click', function(){
        display(works);
    });

    for (let i=0; i<categories.length; i++){
        let button = document.createElement('button');
        button.class = formatClassName(categories[i].name);
        button.type = "button";
        button.innerText = categories[i].name;
        filtres.appendChild(button);

        button.addEventListener('click', function(){
            const filterResult = works.filter(function(work) {
                return work.categoryId === categories[i].id;
            })
            console.log(filterResult);
            display(filterResult);
        });
    }
}

///////////////////////////////////CALLS AND DISPLAYS////////////////////////

async function dynamicDisplay(){
    let works = await getWorks();
    const categories = await getCategories();
    // works = noDouble(works);
    console.log(works);
    display(works);
    createButtons(categories, works);
}

dynamicDisplay();