function toggleMenu() {
  var menuDropdown = document.getElementById("menuDropdown");
  menuDropdown.classList.toggle("show-menu");
}

document.addEventListener('DOMContentLoaded', function () {
  const logoutButton = document.getElementById('Sair');

  logoutButton.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
      window.location.href = '../Cadastro/cadastro.html';
    }).catch((error) => {
      console.error('Erro ao encerrar a sessão: ', error);
    });
  });
});

// Função para enviar arquivo para o Firebase Storage
function uploadFile() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];

  if (file) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var storageRef = storage.ref('users/' + user.uid + '/files/' + file.name);
        var task = storageRef.put(file);

        task.then(snapshot => {
          console.log('Arquivo enviado com sucesso!');
          fileInput.value = ''; // Limpar o input de arquivo
          displayFiles(); // Atualizar a lista de arquivos
        }).catch(error => {
          console.error('Erro no envio do arquivo:', error);
        });
      } else {
        console.error('Usuário não autenticado.');
      }
    });
  } else {
    console.error('Nenhum arquivo selecionado.');
  }
}

// Função para recuperar arquivos do Firebase Storage e criar cards
// Função para recuperar arquivos do Firebase Storage e criar cards
function displayFiles() {
  var cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = ''; // Limpar a lista de cards

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var filesRef = storage.ref('users/' + user.uid + '/files');
      filesRef.listAll().then(result => {
        result.items.forEach(item => {
          item.getDownloadURL().then(url => {
            item.getMetadata().then(metadata => {
              let arquivoconfig = user.uid + ".txt";

              if (metadata.name != arquivoconfig && (metadata.contentType.startsWith('image') || metadata.contentType.startsWith('video'))) {

                var cardAndButtonContainer = document.createElement('div');
                cardAndButtonContainer.classList.add('card-and-button-container');

                var card = document.createElement('div');
                card.classList.add('card');
                card.onclick = function () {
                  window.location.href = 'produto.html';
                };

                if (metadata.contentType.startsWith('image')) {
                  // Se for uma imagem, exibir miniatura
                  var cardImage = document.createElement('img');
                  cardImage.src = url;
                  cardImage.alt = 'Imagem do produto';
                  card.appendChild(cardImage);
                } else if (metadata.contentType.startsWith('video')) {
                  // Se for um vídeo, exibir um elemento de vídeo diretamente
                  var cardVideo = document.createElement('video');
                  cardVideo.src = url;
                  cardVideo.controls = true;
                  card.appendChild(cardVideo);
                }

                var cardContent = document.createElement('div');
                cardContent.classList.add('card-content');
                card.appendChild(cardContent);

                cardAndButtonContainer.appendChild(card);

                // Adicione o botão de remoção fora do card
                var removeButton = document.createElement('button');
                removeButton.textContent = 'Remover';
                removeButton.addEventListener('click', function () {
                  removeFile(user.uid, item.name);
                });
                cardAndButtonContainer.appendChild(removeButton);

                cardContainer.appendChild(cardAndButtonContainer);
              }
            });
          }).catch(error => {
            console.error('Erro ao recuperar metadados:', error);
          });
        });
      }).catch(error => {
        console.error('Erro ao recuperar arquivos:', error);
      });
    } else {
      console.error('Usuário não autenticado.');
    }
  });
}


// Função para remover um arquivo do Firebase Storage
function removeFile(userId, fileName) {
  var fileRef = storage.ref('users/' + userId + '/files/' + fileName);

  fileRef.delete().then(() => {
    console.log('Arquivo removido com sucesso.');
    displayFiles(); // Atualizar a exibição após a remoção
  }).catch(error => {
    console.error('Erro ao remover arquivo:', error);
  });
}

// Chamar a função de exibição ao carregar a página
document.addEventListener('DOMContentLoaded', displayFiles);
