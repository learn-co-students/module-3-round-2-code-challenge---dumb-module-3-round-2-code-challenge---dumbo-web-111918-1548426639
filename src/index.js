const beerURL = "http://localhost:3000/beers"
const beerDetail = document.getElementById("beer-detail")

const beerBar = document.getElementById("beer-bar")
const beerUL = document.createElement("ul")

const listGroup = document.getElementById("list-group")

getBeerObject()

function getBeerObject() {
  fetch(beerURL)
    .then(res => res.json())
    .then(beerObject => {
      beerObject.forEach(beer => {
        makeBeer(beer)
      })
    })
}

function makeBeer(beer) {
  //    const ul = document.createElement("ul")
  const li = document.createElement("li")
  li.innerText = beer.name

  li.dataset.id = beer.id
  li.className = "list-group-item"

  listGroup.append(li)
}

listGroup.addEventListener("click", beerSelect)

function beerSelect(e) {
  if (e.target.className === "list-group-item") {
    fetch(beerURL + `/${e.target.dataset.id}`)
      .then(res => res.json())
      .then(beer => {
        beerDetail.innerHTML = `
            <h1>${beer.name}</h1>
            <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <button id="edit-beer" class="btn btn-info">
            Save
            </button>
            `
        beerDetail.addEventListener("click", editBeer)

        function editBeer(e) {
          if (e.target.className === "btn btn-info") {
            console.log(beer.description)
          }
        }
      })
  }
}



