document.addEventListener('DOMContentLoaded', initalize)
const beerURL = 'http://localhost:3000/beers'
document.addEventListener('click', getOneBeer)

function initalize(){
  console.log('you got this, g')
  getBeers()
}

function getBeers(){
  return fetch(beerURL)
  .then(r => r.json())
  .then(beers => beers.forEach(beer => {
    renderBeers(beer)
  }))
}

function renderBeers(beer){
  const beerList = document.querySelector('.list-group')
  const beerLi = document.createElement('li')
  beerLi.innerHTML += `<li class="list-group-item" data-id=${beer.id}>${beer.name}</li>`
  beerList.append(beerLi)
}

function getOneBeer(){
  if(event.target.dataset.id){
    let beerID = event.target.dataset.id

    return fetch(beerURL + `/${beerID}`)
    .then(r => r.json())
    .then(data => renderOneBeer(data))
  }
}

function renderOneBeer(beer){
  let beerDetail = document.querySelector('#beer-detail')
  beerDetail.innerHTML = ''
  beerDetail.innerHTML += `<h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="edit-beer" data-id="${beer.id}"class="btn btn-info">
    Save
    </button>`
}

document.addEventListener('click',editBeer)

function editBeer(event){
  if(event.target.id){
    let beerID = parseInt(event.target.dataset.id)
    let textArea = event.target.parentElement.children[3]
    let textAreaValue = textArea.value
    textArea.innerText = textAreaValue
    console.log(textAreaValue)
    textArea.value = textAreaValue
    fetch(beerURL + `/${beerID}`,{
      method: 'PATCH',
      body: JSON.stringify({description: textAreaValue}),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(r => r.json())
    .then(renderOneBeer)
  }
}
