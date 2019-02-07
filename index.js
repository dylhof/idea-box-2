const ideaArray = [];
const titleInput = document.querySelector('#title-input')
const bodyInput = document.querySelector('#body-input')
const ideaContainer = document.querySelector('.idea-container')

const saveBtn = document.querySelector('.save-btn');

saveBtn.addEventListener('click', createNewIdea);

function createNewIdea(event) {
  event.preventDefault()
  const newIdea = new Idea(titleInput.value, bodyInput.value, Date.now())
  addCard(newIdea);
}

function addCard(idea) {
  const {title, body, id} = idea
  const ideaCard = `
  <div>
    <h2>${title}</h2>
    <p>${body}</p>
  </div>`
  ideaContainer.insertAdjacentHTML('afterbegin', ideaCard)
}



