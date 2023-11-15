// Obtenha referências aos elementos HTML
const saveProfileButton = document.getElementById('saveProfileButton');
const portfolioInput = document.getElementById('portfolioInput');
const usernameInput = document.getElementById('usernameInput');

// Adicione um ouvinte de evento ao botão "Salvar Perfil"
saveProfileButton.addEventListener('click', () => {
    const portfolioValue = portfolioInput.value;
    const usernameValue = usernameInput.value;

    // Obtenha o usuário atualmente autenticado
    const user = firebase.auth().currentUser;

    if (user) {
        const userId = user.uid;

        // Salve as informações no Firestore
        const db = firebase.firestore();
        const userRef = db.collection('users').doc(userId);

        userRef.set({
            portfolio: portfolioValue,
            username: usernameValue
        })
        .then(() => {
            console.log('Perfil salvo com sucesso');
            // Redirecione o usuário de volta à página de perfil
            window.location.href = 'perfil.html';
        })
        .catch((error) => {
            console.error('Erro ao adicionar documento do usuário:', error);
        });
    }
});
