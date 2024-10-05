document.getElementById("cadastroForm").addEventListener("submit", (e) => {
    e.preventDefault();
    cadastrarUsuario();
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    logarUsuario();
});

let campoMensagemErro = document.getElementById("errorMessage");


function cadastrarUsuario(){
    const formData = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("password").value,
    }

    fetch('https://www.codekst.com.br/usuario', {
        method: 'POST',
        headers:{
            'Content-type': 'application/json',
        },
        body: JSON.stringify(formData)
    }).then(response => response.json().then(data => {
        console.log(data);
        if(response.status == 201){
            myFunction();
            body.className = "sign-in-js"; 
        }else{
            console.log(data.message);
        }
    }));
}

function logarUsuario(){
    const formData = {
        email: document.getElementById("email-signin").value,
        senha: document.getElementById("password-signin").value,
    }

    fetch('https://www.codekst.com.br/login', {
        method: 'POST',
        headers:{
            'Content-type': 'application/json',
        },
        body: JSON.stringify(formData)
    }).then(response => response.json().then(data => {
        if(response.status == 200){
            sessionStorage.setItem("usuario", JSON.stringify(data));
            window.location.href = "../screens/agendamento.html";
        }else{
            console.log(data.erro);
            campoMensagemErro.innerHTML = data.erro;
        }
    }));
}




//window.location.href = "../screens/agendamento.html"