//link to the works route
async function getWorks(){
    //call works route
    const response = await fetch('http://localhost:5678/api/works');
    //convert response to json
    return response.json();  
}


 // function, waiting the response from getWorks before starting
 async function displayWorks(){
     const works = await getWorks();
     console.log(works);

    // display every works in gallery
    for(let i=0; i< works.length; i++) {

        //point the gallery tag
        const inGallery = document.querySelector('.gallery');

        //create the element tag for each work
        const worksElement = document.createElement('figure');

        //fill with the appropriate img and text
        const imgPart = document.createElement('img');
        imgPart.src = works[i].imageUrl;
        imgPart.crossOrigin = "anonymous"
        imgPart.alt = works[i].title;
        //link with worksElement
        worksElement.appendChild(imgPart);

        const textPart = document.createElement('figcaption');
        textPart.innerText = works[i].title;
        //link with worksElement
        worksElement.appendChild(textPart);

        inGallery.appendChild(worksElement);
    }
 }
// call function to display
displayWorks();