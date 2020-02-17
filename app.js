

// 1. As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

// global variables
var imgArr = [];
var ttlClicks = 0;
var getPos1 = document.getElementById('first-img')
var getPos2 = document.getElementById('second-img')
var getPos3 = document.getElementById('third-img')

// constructor function for images
function imgConst(name, imgPath){
  this.name = name;
  this.image = imgPath;
  this.timesClicked = 0;
  this.timesRendered = 0;
  imgArr.push(this);
}
// constructing img objects and storing in imgArr
// new imgConst('bag', './images/bag.jpg')
new imgConst('banana', './images/banana.jpg')
new imgConst('bathroom', './images/bathroom.jpg')
new imgConst('boots', './images/boots.jpg')
new imgConst('breakfast', './images/breakfast.jpg')
new imgConst('bubblegum', './images/bubblegum.jpg')
new imgConst('chair', './images/chair.jpg')
new imgConst('cthulhu', './images/cthulhu.jpg')
new imgConst('dog-duck', './images/dog-duck.jpg')
new imgConst('pet-sweep', './images/pet-sweep.jpg')
new imgConst('scissors', './images/scissors.jpg')
new imgConst('shark', './images/shark.jpg')
new imgConst('sweep', './images/sweep.png')
new imgConst('tauntaun', './images/tauntaun.jpg')
new imgConst('unicorn', './images/unicorn.jpg')
new imgConst('usb', './images/usb.gif')
new imgConst('water-can', './images/water-can.jpg')
new imgConst('wine-glass', './images/wine-glass.jpg')

console.log(imgArr) // works

// Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.
function randomImgs(){
  var randImg = Math.floor(Math.random() * imgArr.length);
  
  return(randImg)
}
console.log(randomImgs()); // works

// renders the img's
function renderImg (){ //does not record render
  var i = 0;
  
  while(i < imgArr.length){
    var img1 = randomImgs();
    if(img1 === imgArr[i].name){ // this might be in the ball park
      imgArr[i].timesRendered++
    }
    var img2 = randomImgs();
    var img3 = randomImgs();
    getPos1.setAttribute('src', imgArr[img1].image) // uses random image generator and assigns it to the src of id getPos1 in HTML
    getPos1.setAttribute('alt', imgArr[img1].name)
    getPos2.setAttribute('src', imgArr[img2].image) // uses random image generator and assigns it to the src of id getPos2 in HTML
    getPos2.setAttribute('alt', imgArr[img2].name)
    getPos3.setAttribute('src', imgArr[img3].image) // uses random image generator and assigns it to the src of id getPos3 in HTML
    getPos3.setAttribute('alt', imgArr[img3].name)
    i++
  }
}
renderImg()

function imgClicking(event){
  var imgId = event.target.getAttribute('alt');
  var i = 0;
  while(i < imgArr.length){
    if(imgId === imgArr[i].name){
      imgArr[i].timesClicked++
  }
  i++
 }
  renderImg();
  
  console.log(imgId);
}


getPos1.addEventListener('click', imgClicking);
getPos2.addEventListener('click', imgClicking);
getPos3.addEventListener('click', imgClicking);
// Attach an event listener to the section of the HTML page where the images are going to be displayed.

// Once the users ‘clicks’ a product, generate three new products for the user to pick from.



// 2. As a user, I would like to track the selections made by viewers so that I can determine which products to keep for the catalog.

// In the constructor function define a property to hold the number of times a product has been clicked.

// After every selection by the viewer, update the newly added property to reflect if it was clicked.



// 3. As a user, I would like to control the number of rounds a user is presented with so that I can control the voting session duration.

// By default, the user should be presented with 25 rounds of voting before ending the session.

//Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.



// 4. As a user, I would like to view a report of results after all rounds of voting have concluded so that I can evaluate which products were the most popular.

// Create a property attached to the constructor function itself that keeps track of all the products that are currently being considered.

// After voting rounds have been completed, remove the event listeners on the product.

// Display the list of all the products followed by the votes received and number of times seen for each. Example: Banana Slicer had 3 votes and was shown 5 times