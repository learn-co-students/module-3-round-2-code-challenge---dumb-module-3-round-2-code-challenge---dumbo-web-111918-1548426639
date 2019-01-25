document.addEventListener("DOMContentLoaded", e => {
    const listGroup = document.getElementById("list-group")
    const beerDetail = document.getElementById("beer-detail")

    fetch('http://localhost:3000/beers')
    .then(r => r.json())
    .then(beers => beers.forEach(beer => {
        showBeer(beer)
    }))

    const showBeer = (beer) => {
      listGroup.innerHTML += 
      `<ul class="list-group">
      <li class="list-group-item" data-id="${beer.id}">${beer.name}</li>
      </ul>`
    }
    
    listGroup.addEventListener("click", e => {
        if(e.target.dataset.id){
            const id = e.target.dataset.id

            fetch(`http://localhost:3000/beers/${id}`)
            .then(r => r.json())
            .then(beer => {
                showMainBeer(beer)
            })
        }
    })

    const showMainBeer = (beer) => {
      beerDetail.innerHTML = 
      `<h1>${beer.name}</h1>
      <img src=${beer.image_url}>
      <h3>${beer.tagline}</h3>
      <textarea>${beer.description}</textarea>
      <button id="edit-beer" class="btn btn-info" data-id="${beer.id}">
        Save
      </button>`
    }
    
    beerDetail.addEventListener("click", e => {
        if (e.target.dataset.id) {
            const editBeer = document.getElementById("edit-beer")
            const id = e.target.dataset.id
            const textArea = e.target.parentNode.querySelector("textArea").value
           

            fetch(`http://localhost:3000/beers/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    
                },
                body: JSON.stringify({
                    description: textArea
                })
            })
            .then(r => r.json())
            .then(beer => {
                console.log(textArea)

                textArea.innerHTML = beer.description
                console.log(textArea)
            })
        }
    })



}) //DOMContentLoaded