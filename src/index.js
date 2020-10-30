console.log('%c HI', 'color: firebrick')

let dogImages = document.querySelector('#dog-image-container')
let dogBreeds = document.querySelector('#dog-breeds')
let listItem
let breeds

function fetchDogs() {
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(function(response){
      return response.json();
    })
    .then(function(json){
        addDogImg(json)
    });
  }

function addDogImg(json) {
    let images = json["message"]    
    images.forEach(function(url){        
        let img = document.createElement('img')
        img.setAttribute('src', url)
        img.setAttribute('alt', 'Dog')
        img.setAttribute('height', '150px');
        img.setAttribute('width', '200px');
        dogImages.append(img)
    })
}

function fetchBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        addDogBreed(json)
    });
}

function addDogBreed(json){    
    breeds = json["message"]     
    Object.keys(breeds).forEach(function(breed){  
        dogBreeds.innerHTML += `<li onclick="style.cssText='color:blue'">${breed}</li>`
        if (breeds[breed]){
           breeds[breed].forEach(function(subBreed){
               dogBreeds.innerHTML += `<li onclick="style.cssText='color:blue'">${subBreed} ${breed}</li>`
           }) 
        }   
    })    
}

function sort (){
    dropdown = document.querySelector('#breed-dropdown')
    dropdown.addEventListener('click', function(event){          
        dogBreeds.childNodes.forEach(function(breed){
            if (!breed.innerText){}             
            else if (breed.innerText.startsWith(event.target.value)) {
            breed.setAttribute("style","display:list-item;")
            } else {
                breed.setAttribute("style","display:none;")
            }
        })
    })
}

function main(){
    fetchDogs()
    fetchBreeds()
    sort()
}

main ()