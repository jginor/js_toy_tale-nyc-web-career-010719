const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector('#toy-collection')
const toyUrl = "http://localhost:3000/toys"


const newToyButton = document.getElementsByName("submit")[0]
const newToyName = document.getElementsByName("name")[0]
const newToyImage = document.getElementsByName("image")[0]
// let allToys = []

// YOUR CODE HERE

document.addEventListener("DOMContentLoaded", function(event) {
  fetchToys()

   console.log("DOM fully loaded and parsed");
});

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    newToyButton.addEventListener("click", function(){
      event.preventDefault()
      debugger
      fetch(toyUrl, {
        method: 'Post',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": newToyName.value,
          "image": newToyImage.value,
          "likes": 0
        })
      })
      .then(function(response){
        return response.json()
        console.log(response.json())
      })
      .then(function (newToyObj){
        console.log(newToyObj)
        renderToy(newToyObj)
      })
    })

  } else {
    toyForm.style.display = 'none'
  }
})

toyCollection.addEventListener("click", function(){
  console.log(event.target.dataset.id)
  console.log(event.target.dataset.action)
  if (event.target.dataset.action === "like"){
    let toy = allToys.find(t => t.id === parseInt(event.target.dataset.id))
    let editUrl = `http://localhost:3000/toys/${toy.id}`

    fetch(editUrl, {
        method: 'Patch',
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "Likes": `${toy.likes}`
        })
    })
    .then(function(response){
      return response.json()
    })
    .then(function(editedToyObject){
      allToys = allToys.map(toy => {
        if (toy.id === editedToyObject.id) {
          return editedToyObject
        }
        else {
          return toy
        }
        renderAllToys(allToys)
      })
    })
  }
})

function fetchToys(){
  fetch(toyUrl)
  .then(function (response) {
    return response.json()
  })
  .then(function(toys){
    console.log(toys)
    allToys = []
    allToys = toys.map(toy => toy)
    // debugger
    console.log(allToys)
    renderAllToys(allToys)
  })
}


function renderToy(toy){
  let toyCard = document.createElement('div')
  toyCard.setAttribute("data-id", toy.id)
  toyCard.setAttribute("class", "card")
  let toyName = document.createElement('h2')
  let toyImage = document.createElement('img')
  toyImage.setAttribute("class", "toy-avatar")
  // allToys.push(toy)
  let likes = document.createElement('p')
  let likeButton = document.createElement('button')
  likeButton.setAttribute("class", "like-btn")
  likeButton.setAttribute("data-id", toy.id)
  likeButton.setAttribute("data-action", "like")

  toyCollection.appendChild(toyCard)
  toyCard.appendChild(toyName)
  toyCard.appendChild(toyImage)
  toyCard.appendChild(likes)
  toyCard.appendChild(likeButton)

  toyName.innerText = toy.name
  toyImage.src = toy.image
  likes.innerText = `${toy.likes} Likes`
  likeButton.innerText = "Like <3"
}

function renderAllToys(toys){
  toyCollection.innerHTML = ""
  toys.forEach(function (toy){
    renderToy(toy)
  })
}
