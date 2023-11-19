document.addEventListener('DOMContentLoaded', function () {
    const btnEntrar = document.getElementById('btnentrar');
    const googleLogin = document.getElementById('google-login');
    const gitLogin = document.getElementById('git-login');

    // Verificar se o usuário está autenticado antes de permitir a criação
    const user = firebase.auth().currentUser;
    if (user) {
        // Usuário autenticado, redirecione para a página principal
        window.location.href = '../Home/home_index.html';
    }

    btnEntrar.addEventListener('click', function () {
        const email = document.getElementById('inemail').value;
        const senha = document.getElementById('insenha').value;

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(function () {
                // Agora, verificamos se o usuário concluiu o processo de criação de conta
                const userId = firebase.auth().currentUser.uid;
                const db = firebase.firestore();

                db.collection('usuarios').doc(userId).get()
                    .then(function (doc) {
                        if (doc.exists) {
                            console.log('Usuário autenticado com sucesso.');
                            window.location.href = '../Home/home_index.html';
                        } else {
                            // Usuário não concluiu o processo de criação de conta
                            alert('Você ainda não completou o processo de criação de conta. Redirecionando para cadastro...');
                            window.location.href = '../Cadastro/cadastro.html';
                        }
                    })
                    .catch(function (error) {
                        console.error('Erro ao verificar usuário:', error);
                    });
            })
            .catch(function (error) {
                console.error('Erro ao autenticar:', error);
                alert('Erro ao autenticar. Verifique seu email e senha e tente novamente.');
            });
    });

    googleLogin.addEventListener('click', function () {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                console.log('Usuário autenticado com sucesso:', result.user);
                window.location.href = '../Home/home_index.html';
            })
            .catch(function (error) {
                console.error('Erro ao autenticar com o Google:', error);
            });
    });

    gitLogin.addEventListener('click', function () {
        const provider = new firebase.auth.GithubAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                console.log('Usuário autenticado com sucesso:', result.user);
                window.location.href = '../Home/home_index.html';
            })
            .catch(function (error) {
                console.error('Erro ao autenticar com o GitHub:', error);
            });
    });
});
