function togglePasswordVisibility(inputId) {
    var input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        document.querySelector(".password-toggle-icon i").classList.remove("bi-eye-slash");
        document.querySelector(".password-toggle-icon i").classList.add("bi-eye");
    } else {
        input.type = "password";
        document.querySelector(".password-toggle-icon i").classList.remove("bi-eye");
        document.querySelector(".password-toggle-icon i").classList.add("bi-eye-slash");
    }
}

let btnentrar = document.querySelector("#btnentrar");
btnentrar.addEventListener('click', clickbtnentrar)

function clickbtnentrar(){
    let inemail = document.querySelector("#inemail").value
    let insenha = document.querySelector("#insenha").value

    auth.signInWithEmailAndPassword(inemail, insenha).
    then(function(user){
        console.log(user)  
        window.location.href="../Home/home_index.html"
    }, function(error){
          console.log(error.message)
    })
  
}
const googleButton = document.querySelector('#google-login');

googleButton.addEventListener('click', () => {
   
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
            const user = result.user;
            console.log('Usuário logado com o Google:', user);
            window.location.href = '../Home/home_index.html';
        })
        .catch((error) => {
            console.error('Erro ao autenticar com o Google:', error);
        });
});

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('Usuário autenticado com o GitHub:', user);
        window.location.href = 'Home/home_index.html';
    }
});
const githubButton = document.querySelector('#github-login');
githubButton.addEventListener('click', () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(githubProvider)
        .then((result) => {
            const user = result.user;
            console.log('Usuário logado com o GitHub:', user);
            window.location.href = 'Home/home_index.html';
        })
        .catch((error) => {
            console.error('Erro ao autenticar com o GitHub:', error);
        });
});
