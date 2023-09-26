const NUMBERS_API = 'http://numbersapi.com/';
function getFacts(number) {
    let facts = [];

    facts.push(axios.get(`${NUMBERS_API}${number}/math`));
    facts.push(axios.get(`${NUMBERS_API}${number}/trivia`));
    facts.push(axios.get(`${NUMBERS_API}${number}/date`));
    facts.push(axios.get(`${NUMBERS_API}${number}/year`));

    return Promise.all(facts);
}
function appendFact(facts) {
    let content = document.querySelector('#facts');
    for (let fact of facts) {
        content.innerText += fact.data;
        content.appendChild(document.createElement('br'));
    }
}
function displayFacts() {
    let facts = getFacts(7);

    facts.then((res) => appendFact(res))
        .catch(appendError)
}

window.addEventListener('load', displayFacts);