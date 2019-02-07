let ideaArray = [];
const titleInput = document.querySelector('#title-input')
const bodyInput = document.querySelector('#body-input')
const ideaContainer = document.querySelector('.idea-container')
const saveBtn = document.querySelector('.save-btn');

window.addEventListener('load', getStoredIdeas)
saveBtn.addEventListener('click', createNewIdea);

function createNewIdea(event) {
  event.preventDefault();
  const newIdea = new Idea(titleInput.value, bodyInput.value, Date.now());
  ideaArray.push(newIdea);
  addCard(newIdea);
  resetInputs();
  addToStorage();
}

function getStoredIdeas() {
  const stringIdeas = localStorage.getItem('ideas')
  ideaArray = JSON.parse(stringIdeas)
  ideaArray.forEach(idea => {
    addCard(idea)
  })
}

function addToStorage() {
  const ideas = JSON.stringify(ideaArray)
  localStorage.setItem('ideas', ideas)
}

function addCard(idea) {
  const {title, body, id, quality} = idea
  const ideaCard = `
  <div class='idea-card' data-id=${id}>
    <div class='idea-content'>
      <h2 class='idea-title'>${title}</h2>
      <p class='idea-body'>${body}</p>
    </div>
    <div>
      <p>${quality}</p>
      <button class='delete-btn'>Delete</button>
    </div>
  </div>`
  ideaContainer.insertAdjacentHTML('afterbegin', ideaCard)
}

function resetInputs() {
  titleInput.value = ''
  bodyInput.value = ''
}



