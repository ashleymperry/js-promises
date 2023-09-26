const BASE_URL = 'https://deckofcardsapi.com/api/deck';
let cardDeck;

function newCards() {
    return axios.get(`${BASE_URL}/new`);
}
function shuffle(res) {
    return axios.get(`${BASE_URL}/${res.data.deck_id}/shuffle`);
}
function drawCard() {
    return cardDeck.then((res) => {
        return newRes = axios.get(`${BASE_URL}/${res.data.deck_id}/draw/`);  
    });
}
function dealCard(res) {
    let stack = document.querySelector('#deck-stack');
    let card = document.createElement('div');
    let degree = Math.floor(Math.random()*90) - 70;
    let top = Math.floor(Math.random()*50);

    card.style.transform = `rotate(${degree}deg)`;
    card.style.backgroundImage = `url(${res.data.cards[0].image})`;
    card.style.top = `${top}px`
    card.classList.add('card');

    stack.appendChild(card);
}
window.addEventListener('load', () => cardDeck = newCards().then((res) => shuffle(res)));
function emptyStack() {
    let stack = document.querySelector('#deck-stack');
    stack.innerHTML = '';
}
let button = document.querySelector('button');
button.addEventListener('click', () => {
    drawCard().then((res) => dealCard(res))
    .catch(() => {
        emptyStack();
        cardDeck = cardDeck.then((res) => shuffle(res));
        cardDeck.then(() => drawCard())
            .then((res) => dealCard(res));
    })
})