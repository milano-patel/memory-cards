const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');
const deleteBtn = document.getElementById('delete');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

//Store card data
const cardsData = getCradsData();

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _',
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data',
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable',
//   },
// ];

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

//Create a single card in DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
    <div class="inner-card">
          <div class="inner-card-front">
            <p>${data.question}</p>
          </div>
          <div class="inner-card-back">
            <p>${data.answer}</p>
          </div>
        </div>
        <button id="delete" class="delete btn">
        <i class="fas fa-trash"></i>
      </button>
  `;

  card.addEventListener('click', () => {
    card.classList.toggle('show-answer');
  });

  //Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

function deleteCard(target) {
  if (target.className === 'delete btn') {
    target.parentElement.remove();
    cardsEl.splice(currentActiveCard, 1);
    cardsData.splice(currentActiveCard, 1);

    setCardsData(cardsData);
  }
  if (target.className === 'fas fa-trash') {
    target.parentElement.parentElement.remove();
    cardsEl.splice(currentActiveCard, 1);
    cardsData.splice(currentActiveCard, 1);

    setCardsData(cardsData);
  }
}

//Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}

// Get cards from local storage
function getCradsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Put cards into local storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

// Next Button
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard++;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Previous Button
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard--;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', () => {
  addContainer.classList.add('show');
});

// Hide add containers
hideBtn.addEventListener('click', () => {
  addContainer.classList.remove('show');
});

// Add a new card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});

cardsContainer.addEventListener('click', (e) => {
  deleteCard(e.target);
});

createCards();
