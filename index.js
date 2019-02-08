let ideaArray = [];
const voteArray = ['swill', 'plausible', 'genius']
const titleInput = document.querySelector('#title-input')
const bodyInput = document.querySelector('#body-input')
const ideaContainer = document.querySelector('.idea-container')
const saveBtn = document.querySelector('.save-btn');

window.addEventListener('load', getStoredIdeas);
saveBtn.addEventListener('click', createNewIdea);
ideaContainer.addEventListener('click', event => {
  if(event.target.classList.contains('delete-btn')) {
    deleteCard(event);
  } else if (event.target.classList.contains('vote')) {
    vote(event);
  }
})

ideaContainer.addEventListener('dblclick', editIdea)

function createNewIdea(event) {
  event.preventDefault();
  const newIdea = new Idea(titleInput.value, bodyInput.value, Date.now());
  ideaArray.push(newIdea);
  addCard(newIdea);
  resetInputs();
  addToStorage();
}

function editIdea() {
  if(event.target.classList.contains('idea-text')) {
    const id = parseInt(event.target.parentElement.parentElement.dataset.id)
    event.target.contentEditable = true
    document.body.addEventListener('keyup', (event) => {
      if (event.keyCode === 13){
        event.target.contentEditable = false
        saveIdeaChange(id)
      }
    })
  }
}

function saveIdeaChange(id) {
  let index = ideaArray.findIndex(idea => idea.id === id)
  const name = event.target.dataset.name
  const text = event.target.innerText
  ideaArray[index].updateSelf(name, text)
  addToStorage()
}

function getStoredIdeas() {
  const stringIdeas = localStorage.getItem('ideas')
  const newIdeaArray = JSON.parse(stringIdeas)
  newIdeaArray.forEach(idea => {
    const newIdea = new Idea(idea.title, idea.body, idea.id, idea.quality)
    ideaArray.push(newIdea)
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
      <h2 class='idea-title idea-text' contenteditable='false' data-name='title'>${title}</h2>
      <p class='idea-body idea-text' contenteditable='false' data-name='body'>${body}</p>
    </div>
    <div class='idea-controls'>
      <div class='vote-div'>
        <button class='vote' data-vote='up'>Up</button>
        <p class='quality'>${voteArray[quality]}</p>
        <button class='vote' data-vote='down'>Down</button>
      </div>
      <button class='delete-btn'>Delete this idea!</button>
    </div>
  </div>`
  ideaContainer.insertAdjacentHTML('afterbegin', ideaCard)
}

function vote(event) {

  const id = parseInt(event.target.parentElement.parentElement.parentElement.dataset.id)
  const index = ideaArray.findIndex(idea => idea.id === id)
  const vote = event.target.dataset.vote
  ideaArray[index].updateQuality(vote, voteArray.length)
  addToStorage()
  const quality = ideaArray[index].quality
  changeQualityOnDom(vote, quality)
}

function changeQualityOnDom(vote, quality) {
  if (vote=== 'up') {
    event.target.nextElementSibling.innerText = voteArray[quality]
  } else { event.target.previousElementSibling.innerText = voteArray[quality]}
}

function resetInputs() {
  titleInput.value = ''
  bodyInput.value = ''
}

function deleteCard(event) {
  event.target.closest('.idea-card').remove()
  const id = event.target.parentElement.parentElement.dataset.id
  const newIdeaArray = ideaArray.filter(idea => idea.id !== parseInt(id))
  ideaArray = newIdeaArray
  addToStorage()
}

