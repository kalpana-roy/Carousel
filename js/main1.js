//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
// Global carousel variables
let currentIndex = 0;
const carouselContainer = document.getElementById("carousel-container");

const previous = document.querySelector("#prev")
const next = document.querySelector("#next")
let slides = [];
previous.addEventListener('click', prevSlide)
next.addEventListener('click', nextSlide)
// This event listener triggers when the "Get Cocktail" button is clicked.
document.querySelector("button").addEventListener("click", grabCocktail);

// Navigation event listeners:

function grabCocktail() {
    // Get the cocktail term from the input field
    const cocktail = document.querySelector("input").value;
    
    // Clear the carousel container and reset state
    carouselContainer.innerHTML = "";
    slides = [];
    currentIndex = 0;
  /* <div class="carousel-container">
  <div class="carousel-item active">
    <img src="your-image.jpg" alt="Image Description">
  </div>
  <div class="carousel-item">
    <img src="another-image.jpg" alt="Image Description">
  </div>
  <!-- Add more carousel items as needed -->
</div>*/ 
    // Fetch cocktail data
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
      .then(res => res.json())
      .then(data => {
        if (data.drinks) {
          data.drinks.forEach(drink => {
              // Create a slide for each cocktail
              //const slide = document.getElementById("carousel-container");

              const carouselItem = document.createElement("div");
              
              //console.log("success"+slide)
              carouselItem.classList.add("carousel-item");
            //console.log("success"+slide)
              //slide.classList.add("active");
  
              // Create and append cocktail name
              const title = document.createElement("h2");
              title.textContent = drink.strDrink;
              carouselItem.appendChild(title);
  
              // Create and append cocktail image
              const img = document.createElement("img");
              img.src = drink.strDrinkThumb;
              carouselItem.appendChild(img);
  
              // Create and append cocktail instructions
              const instructions = document.createElement("h3");
              instructions.textContent = drink.strInstructions;
              carouselItem.appendChild(instructions);
  
              // Append the slide to the carousel container and to our slides array
              carouselContainer.appendChild(carouselItem);
              console.log(carouselItem)
              slides.push(carouselItem);
          });
  //console.log(slides)
          // Adjust the carousel to show the first slide
          updateCarousel()
  
        } else {
          // Display a message if no cocktail is found
          carouselContainer.textContent = "No cocktail found.";
        }
      })
      .catch(err => {
        console.error("Error fetching cocktail data:", err);
      });
  }

  //const carouselItems = document.getElementById('carousel-item');
  


// Set the interval for automatic slideshow
//setInterval(nextSlide, 3000); // Change slide every 3 seconds

// Initial display of the first slide
//showSlide(currentSlide);
  





/*document.getElementById('next').addEventListener('click', () => {
    slides[currentSlide].classList.remove('active');         // hide current
    currentSlide = (currentSlide + 1) % totalSlides;         // move index forward
    slides[currentSlide].classList.add('active');            // show new slide
  });
// Set the interval for automatic slideshow
setInterval(nextSlide, 3000); // Change slide every 3 seconds
*/
// Initial display of the first slide
//showSlide(currentSlide);

function updateCarousel(){
  console.log('triggered')
  carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`
  console.log('triggered*'+ currentIndex)
}
function nextSlide(){
  console.log('triggered nextSlide')
  currentIndex = (currentIndex+1) % slides.length
  console.log('currentindex value in nextSlide'+ currentIndex)
  console.log("*"+slides.length)
  updateCarousel()
}
function prevSlide(){
  console.log('triggered prevSlide')
  currentIndex = (currentIndex-1+slides.length) % slides.length
  updateCarousel()
}
setInterval(nextSlide, 3000)