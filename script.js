document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
    let flippedCards = [];
    let matchedCards = [];

    cards.sort(() => 0.5 - Math.random());

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
    
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content', 'front');
        cardContent.innerText = card;
        cardElement.appendChild(cardContent);
    
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
    
    const gameStatus = document.getElementById('game-status');
    
    function flipCard() {
        if (flippedCards.length === 2 || this.classList.contains('flipped')) {
            return;
        }
    
        this.classList.add('flipped');
        flippedCards.push(this);
    
        if (flippedCards.length === 2) {
            gameStatus.innerText = 'Checking...';
            setTimeout(checkMatch, 1000);
        }
    }
    
    function checkMatch() {
        const [firstCard, secondCard] = flippedCards;
    
        if (firstCard.dataset.value === secondCard.dataset.value) {
            matchedCards.push(firstCard, secondCard);
            gameStatus.innerText = 'Matched!';
            if (matchedCards.length === cards.length) {
                gameStatus.innerText = 'You win!';
            }
        } else {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            gameStatus.innerText = 'Try Again!';
        }
    
        flippedCards = [];
    }

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.innerText = '';
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    function flipCard() {
        this.innerText = this.dataset.value;
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        const [firstCard, secondCard] = flippedCards;

        if (firstCard.dataset.value === secondCard.dataset.value) {
            matchedCards.push(firstCard, secondCard);
            if (matchedCards.length === cards.length) {
                alert('You win!');
            }
        } else {
            firstCard.innerText = '';
            secondCard.innerText = '';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }

        flippedCards = [];
    }
});
