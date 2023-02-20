const sendingButton = document.querySelector("#form");

let token = '';

sendingButton.addEventListener('submit', async function(event){
    let dataToSend = {email:'', password:''};
    event.preventDefault();
    const logInData = {
        email: event.target.querySelector('#email').value,            
        password: event.target.querySelector('#password').value
    }

    if (dataToSend.email !== undefined && dataToSend.password !== undefined){

        dataToSend = JSON.stringify(logInData);
        let response = await fetch("http://localhost:5678/api/users/login", {
            method:"POST",
            headers : {"content-type": "application/json"},
            body: dataToSend
        });
        response = await response.json();
            if(response.message == 'user not found'){
                alert("Erreur dans l'identifiant ou le mot de passe.");
            } else if(response.token !== ''){
                token = response.token;
                window.localStorage.setItem('token', `${token}`);
                document.location.href = 'homePage_edit.html';
            } else {
                alert('Données non valides')
            }

    } else {
        alert('Merci de remplir les champs de saisie');
    };
   
});
