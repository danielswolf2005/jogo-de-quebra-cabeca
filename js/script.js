const numPieces = 25;
let selectedPiece = null;
const originalPositions = new Map();

const board = document.getElementById('board');
const pieceContainer = document.getElementById('pieceContainer');

// Cria o tabuleiro com quadrados vazios
for (let i = 0; i < numPieces; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  square.dataset.index = i;

  square.addEventListener('click', () => {
    if (square.children.length > 0) {
      const piece = square.children[0];
      const originalParent = originalPositions.get(piece.dataset.id);
      if (originalParent) originalParent.appendChild(piece);
    } else if (selectedPiece) {
      square.appendChild(selectedPiece);
      selectedPiece = null;
    }
  });

  board.appendChild(square);
}

// Cria uma lista embaralhada de índices
const indices = Array.from({ length: numPieces }, (_, i) => i)
  .sort(() => Math.random() - 0.5);

// Cria as peças e posiciona embaralhadas
for (let i = 0; i < numPieces; i++) {
  const idx = indices[i];
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.dataset.id = idx;

  // Define a imagem de fundo e posição
  piece.style.backgroundImage = 'url("imgs/daniel.png")';
  const col = idx % 5;
  const row = Math.floor(idx / 5);
  piece.style.backgroundPosition = `-${col * 60}px -${row * 60}px`;

  piece.addEventListener('click', () => {
    selectedPiece = piece;
  });

  pieceContainer.appendChild(piece);
  originalPositions.set(piece.dataset.id, pieceContainer);
}
