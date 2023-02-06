let works = [];

//link with API
fetch('http://localhost:5678/api/works')
    .then(data => data.json())
    .then(jsonWorksList =>{
        for(let jsonWork of jsonWorksList){
            //works.push(new Work(jsonWork));
            works.push(jsonWork);
        }
        console.log(works);
        displayWorks(works);
    })

// display every works into gallery tag
async function displayWorks (array) {

    //point the gallery tag
    const inGallery = document.querySelector('.gallery');  
     
    for(let i=0; i< array.length; i++) {

        //create the element tag for each work
        const element = document.createElement('figure');  
console.log("je suis dans la boucle");
        //fill with the appropriate img and text
        const imgPart = document.createElement('img');
        imgPart.src = array[i].imageUrl;
        imgPart.crossOrigin = "anonymous";
        imgPart.alt = array[i].title;
        //link with worksElement
        element.appendChild(imgPart);

        const txtPart = document.createElement('figcaption');
        txtPart.innerText = array[i].title;
        //link with worksElement
        element.appendChild(txtPart);


    //Link the element in the Gallery
        inGallery.appendChild(element);
    }
}

displayWorks(works);