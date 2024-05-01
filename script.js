// Getting all the html elements
const userInput = document.getElementsByClassName("searchbar")[0];
const searchIcon = document.getElementsByClassName("searchicon")[0];
const books = document.getElementsByClassName("books")[0];

//getting author/book name as input to search the book related to it
searchIcon.addEventListener("click",() => {
    
  const name= userInput.value; //book/author name as user input is stored in name variable
if(name===null || name==="")  {
  alert("enter book or author name")
}
else{

  let bookapi= fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}`); // fetching api data
  

  //displaying the books details in webpage based on the searched name
    bookapi.then((result) => result.json())
      .then((data) => {
        
        books.innerHTML="";//div with class books is emptied to store new value while searching another book
        for(let i=0;i<data.items.length;i++){
          
            books.innerHTML += `
            <div class="card mb-3 col-lg-4 col-md-6 col-sm-12 text-bg-warning  ">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${data.items[i].volumeInfo.imageLinks.thumbnail}" class="img-fluid rounded-start" alt="${data.items[i].volumeInfo.title}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${data.items[i].volumeInfo.title}</h5>
                  <p class="card-text">Author: ${data.items[i].volumeInfo.authors}</p>
                  <p class="card-text">Category: ${data.items[i].volumeInfo.categories}</p>
                  <p class="card-text"><small class="text-body-secondary"><a href="${data.items[i].volumeInfo.previewLink}" class="card-link">Know more</a></small></p>
                </div>
              </div>
                </div>
              </div>
            </div>
          </div>`
            
        }  

      }).catch((error)=>{
        alert(`${error}`);
      });
}


});


