// Espera até que o documento HTML esteja totalmente carregado
document.addEventListener('DOMContentLoaded', function () {
    // Obtenha referências aos elementos HTML
    const userPhoto = document.getElementById('userPhoto');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const signOutButton = document.getElementById('signOutButton');
    const profileCard = document.getElementById('profileCard');

    // Obtenha a instância de autenticação do Firebase
    const auth = firebase.auth();
    // Obtenha a instância do Firebase Firestore
    const db = firebase.firestore();

    // Adicione um observador para detectar alterações no estado de autenticação do usuário
    auth.onAuthStateChanged(function (user) {
        if (user) {
            // O usuário está autenticado

            // Atualize os elementos HTML com as informações do usuário
            userPhoto.src = user.photoURL || ''; // URL da foto do usuário
            userName.textContent = user.displayName || 'Nome do Usuário';
            userEmail.textContent = user.email || 'E-mail do Usuário';

            // Exemplo de como recuperar e exibir informações adicionais no "profileCard".
            // Você deve implementar a lógica de consulta ao Firestore ou outro banco de dados, se necessário.
            // Aqui, usamos o Firestore para recuperar os dados do usuário.

            db.collection('users').doc(user.uid).get().then(function (doc) {
                if (doc.exists) {
                    const data = doc.data();
                    // Atualize os elementos do "profileCard" com os dados recuperados.
                    profileCard.textContent = `Portfólio: ${data.portfolio || 'Não especificado'}, Nome de Usuário: ${data.username || 'Não especificado'}`;
                } else {
                    console.log('Nenhum documento encontrado para este usuário.');
                }
            });

            // Adicione um evento ao botão de sair
            signOutButton.addEventListener('click', function () {
                // Use Firebase para fazer logout do usuário
                auth.signOut().then(function () {
                    // Redirecione o usuário para a página de login ou outra página apropriada.
                    window.location.href = '../Login/login.html';
                }).catch(function (error) {
                    console.error('Erro ao fazer logout:', error);
                });
            });
        } else {
            // O usuário não está autenticado
            // Redirecione o usuário para a página de login
            window.location.href = '../Login/login.html';
        }
    });
});
