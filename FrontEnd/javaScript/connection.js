// VARIABLES
const sendingButton = document.querySelector("#form");
//--------

// FUNCTIONS
const getLogInData = (event) => {
    return {
        email: event.target.querySelector('#email').value,            
        password: event.target.querySelector('#password').value
    };
}

const fetchData = async (logInData) => {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method:"POST",
        headers : {"content-type": "application/json"},
        body: JSON.stringify(logInData)
    });
    return response.json();
}
//-----

// MAIN LISTENER
sendingButton.addEventListener('submit', async function(event){
    event.preventDefault();
    const logInData = getLogInData(event);
    if (!logInData.email || !logInData.password){
        return alert ('Merci de remplir les champs de saisie;');
    }
    const response = await fetchData(logInData);
    if (response.message || response.error) {
        return alert("Erreur dans l'identifiant ou le mot de passe.");
    }
    if (response.token && response.userId) {
        window.localStorage.setItem('token', response.token);
        document.location.href = 'index.html';   
    }
});
//------------