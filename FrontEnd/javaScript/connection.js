const sendingButton = document.querySelector("#form");

sendingButton.addEventListener('submit', function(event){
    event.preventDefault();
    console.log(event);
    const logInData = {
        email: event.target.querySelector('#email').value,            
        password: event.target.querySelector('#password').value
    }
    const dataToSend = JSON.stringify(logInData);
    logIn(dataToSend);
});

async function logIn(dataToSend){
    await fetch("http://localhost:5678/api/users/login", {
    method:"POST",
    headers : {"content-type": "application/json"},
    body: dataToSend
    });
}
