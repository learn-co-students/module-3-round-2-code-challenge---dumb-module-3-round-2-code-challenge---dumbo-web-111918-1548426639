document.addEventListener("DOMContentLoaded", init)

function init(){
  getAllBeers().then(addBeersToSideBar)

}

function addBeersToSideBar(beersArray){
  const beerList = document.querySelector("#list-group")
  beersArray.forEach(beer => {
    const beerLi = document.createElement("li")
    beerLi.setAttribute("class", "list-group-item")
    beerLi.setAttribute("data-id", `${beer.id}`)
    beerLi.innerText = beer.name
    beerList.append(beerLi)
    beerLi.addEventListener("click", getBeerID)
  })
}


function getBeerID(event){
  const beerID = event.target.dataset.id
  getOneBeer(beerID).then(slapBeerDetail)
}

function slapBeerDetail(beer){
  const detailDiv = document.querySelector("#beer-detail")
    detailDiv.innerHTML = `<h1>${beer.name}</h1>
      <img src="${beer.image_url}">
        <h3>${beer.tagline}</h3><form class="edit-form" data-id=${beer.id}>
        <textarea name="description" class="description">${beer.description}</textarea><br><br>
      <button data-id=${beer.id} id="edit-beer" class="btn btn-info">
        Save Changes 🍺
    </button><br><br><p class="message"></p></form>`
  const saveForm = detailDiv.querySelector(".edit-form")
  saveForm.addEventListener("submit", getNewBeerInfo)
}

function getNewBeerInfo(event){
  event.preventDefault()
  const beerID = event.target.dataset.id
  const newDescription = event.target.description.value
  patchABeer(beerID, newDescription).then(setUpdatedDescription)
}

function setUpdatedDescription(description){
  console.log("patch is working");
  let textArea = document.querySelector(".description")
  textArea.innerHTML = ""
  textArea.innerText = description
  document.querySelector(".message").innerText = "Your beer has super been updated!"
}

// fetches here

const beerURL = `http://localhost:3000/beers`

function getAllBeers(){
  return fetch(beerURL)
  .then(response => response.json())
}

function getOneBeer(beerID){
  return fetch(beerURL + `/${beerID}`)
  .then(response => response.json())
}

function patchABeer(beerID, newDescription){
  return fetch(beerURL + `/${beerID}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({description: newDescription}),
  })
  .then(response => response.json())
}
