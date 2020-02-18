

// 1. As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

// global variables
var imgArr = [];
var ttlClicks = 0;
var rounds = 20;
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

function validate(img1, img2, img3){
  var testArr = [];
  testArr.push(img1)
  testArr.push(img2)
  testArr.push(img3)
  while(testArr.includes(img1, img2, img3)){
    var img1 = randomImgs();
    var img2 = randomImgs();
    var img3 = randomImgs();
  }
    
}

// renders the img's and makes sure there are no duplicates
  // Check is being rendered
  // Check what random values we've generated
function renderImg (){ //does not record render
 
  var testArr = [getPos1.alt, getPos2.alt, getPos3.alt];
  var img1 = randomImgs();
  var img2 = randomImgs();
  var img3 = randomImgs();
  
  while(
      testArr.includes(imgArr[img1].name) ||
      testArr.includes(imgArr[img2].name) ||
      testArr.includes(imgArr[img3].name) ||
      img1 === img2 ||   
      img1 === img3 ||
      img2 === img3 
  ) {
    console.log("test", img1, img2, img3);
    var img1 = randomImgs();
    var img2 = randomImgs();
    var img3 = randomImgs();
  }
  console.log(imgArr[img1].name, imgArr[img2].name, imgArr[img3].name, testArr);
  getPos1.setAttribute('src', imgArr[img1].image) // uses random image generator and assigns it to the src of id getPos1 in HTML
  getPos1.setAttribute('alt', imgArr[img1].name)
  getPos2.setAttribute('src', imgArr[img2].image) // uses random image generator and assigns it to the src of id getPos2 in HTML
  getPos2.setAttribute('alt', imgArr[img2].name)
  getPos3.setAttribute('src', imgArr[img3].image) // uses random image generator and assigns it to the src of id getPos3 in HTML
  getPos3.setAttribute('alt', imgArr[img3].name)

  imgArr[img1].timesRendered++
  imgArr[img2].timesRendered++
  imgArr[img3].timesRendered++
} 
renderImg() // renders the images

// Once the users ‘clicks’ a product, generate three new products for the user to pick from.
function imgClicking(event){
  var imgId = event.target.getAttribute('alt');
  var i = 0;

  if(ttlClicks < rounds){
    while(i < imgArr.length){
      if(imgId === imgArr[i].name){
        imgArr[i].timesClicked++
        ttlClicks++
        // consider adding an arr to hold max clicks, 
        }
    i++
    } renderImg();
    } else{ // display results and removes event listeners.
  alert('thanks for voting');
  results(imgArr);
  getPos1.removeEventListener('click', imgClicking)
  getPos2.removeEventListener('click', imgClicking)
  getPos3.removeEventListener('click', imgClicking)
}
 console.log(imgId);
 console.log(ttlClicks);
}

// when the img is clicked it triggers event
getPos1.addEventListener('click', imgClicking);
getPos2.addEventListener('click', imgClicking);
getPos3.addEventListener('click', imgClicking);

// uses the DOM to display a string with total clicks and renders
imgConst.prototype.display = function () {
  var list = document.getElementById('itemVotes');
  var uList = document.createElement('ul');
  list.appendChild(uList);
  var listItem = document.createElement('li')
  listItem.textContent = `${this.name} has gotten ${this.timesClicked} and was seen ${this.timesRendered}`;
  uList.appendChild(listItem);
}

// loops through and displays for each image
function results(arr){
  var i = 0;
  console.log(arr.length);
  while(i < arr.length){
    console.log(arr[i]);
    arr[i].display();
    i++
  }
}

function getLabels(arr){
  var i = 0;
  var charArr = [];
  while(i < arr.length){
    charArr.push(arr[i].name)
    i++
  } 
  console.log('HELLO',charArr)
  return charArr
}

function getClicks(arr){
  var i = 0;
  var charArr = [];
  while(i < arr.length){
    charArr.push(arr[i].timesClicked)
    i++
  } 
  console.log('HELLO',charArr)
  return charArr
}
/////////////////// Chart settings ///////////////////////

var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: getLabels(imgArr), // need a function to generate array of ea img
        datasets: [{
            label: '# of Votes',
            data: [getClicks(imgArr)], 
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});



// 3. As a marketing manager, I would like a visual representation of how many times a product was clicked so that I can visually analyze the results.

    // Using ChartJS (imported from CDN), display the vote totals and the number of times a product was viewed in a bar chart format. (hint: don’t forget about the <canvas> tags)

    // Place the bar chart in the section located beneath your three product images

    // The bar charts should only appear after all voting data has been collected.