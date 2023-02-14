const sendingButton = document.querySelector("#form");

sendingButton.addEventListener('submit', async function(event){
    let dataToSend = {email:'', password:''};
    console.log(dataToSend.email);
    event.preventDefault();
    const logInData = {
        email: event.target.querySelector('#email').value,            
        password: event.target.querySelector('#password').value
    }

    if (dataToSend.email !== undefined && dataToSend.password !== undefined){
        console.log('je rentre dans le if');
        dataToSend = JSON.stringify(logInData);
        let response = await fetch("http://localhost:5678/api/users/login", {
            method:"POST",
            headers : {"content-type": "application/json"},
            body: dataToSend
        });
        response = await response.json();
        await console.log(response);
        let token = '';
            if(response.message == 'user not found'){
                alert("Erreur dans l'identifiant ou le mot de passe.");
            } else if(response.token !== ''){
                token = response.token;
                document.location.href = 'http://localhost:5500/FrontEnd/homePage_edit.html';
            } else {
                alert('Données non valides')
            }
    } else {
        console.log('je rentre dans le else');
        alert('Merci de remplir les champs de saisie');
    }
});