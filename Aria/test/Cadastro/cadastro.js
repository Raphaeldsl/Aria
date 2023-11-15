const mostrarSenhasCheckbox = document.getElementById('mostrarSenhas');
const cadsenha1 = document.getElementById('cadSenha');
const cadsenha2 = document.getElementById('cadConfirmaSenha');

document.addEventListener('DOMContentLoaded', function () {
  
    mostrarSenhasCheckbox.addEventListener('change', function () {
        if (mostrarSenhasCheckbox.checked) {
            cadsenha1.type = 'text';
            cadsenha2.type = 'text';
        } else {
            cadsenha1.type = 'password';
            cadsenha2.type = 'password';
        }
    });
});
let btncriar = document.querySelector("#btncriar");

cadsenha2.addEventListener('blur', habitarBtn)

function habitarBtn(){
    if (cadsenha1.value===cadsenha2.value && cadsenha1.value!=""){ 
        btncriar.disabled = false
    }
}

btncriar.addEventListener('click', clickcriar)

function clickcriar() {
    let cademail = document.querySelector("#cadEmailInput").value;
    let cadsenha = document.querySelector("#cadSenha").value;

    const acceptTerms = document.getElementById('acceptTerms');

    if (acceptTerms.checked) {
        // Verifica se os Termos de Uso foram aceitos
        auth.createUserWithEmailAndPassword(cademail, cadsenha)
            .then(function () {
                console.log(auth.currentUser.email);
                window.location.href = "../Home/home_index.html";
            })
            .catch(function (error) {
                console.log(error.message);
            });
    } else {
        alert('Você deve aceitar os Termos de Uso e apertar o botão "Confirmar" para se cadastrar.');
    }
}

function createAccountWithGoogle() {
    const acceptTerms = document.getElementById('acceptTerms');

    if (acceptTerms.checked) {
        
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                console.log('Usuário logado:', user);
                window.location.href = "../Home/home_index.html";
            })
            .catch((error) => {
                console.error('Erro ao autenticar com o Google:', error);
            });
    } else {
        alert('Você deve aceitar os Termos de Uso para se cadastrar com o Google.');
    }
}

function createAccountWithGitHub() {
    const acceptTerms = document.getElementById('acceptTerms');

    if (acceptTerms.checked) {
        
        const provider = new firebase.auth.GithubAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                console.log('Usuário logado:', user);
                window.location.href = 'Home/home_index.html';
            })
            .catch((error) => {
                console.error('Erro ao autenticar com o GitHub:', error);
            });
    } else {
        alert('Você deve aceitar os Termos de Uso para se cadastrar com o GitHub.');
    }
}