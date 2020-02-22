'use strict';


// global variables
var imgArr = [];
var ttlClicks = 0;
var rounds = 25;
var getPos1 = document.getElementById('first-img')
var getPos2 = document.getElementById('second-img')
var getPos3 = document.getElementById('third-img')
// constructor function for images
function ImgConstr(name, imgPath){
  this.name = name;
  this.image = imgPath;
  this.timesClicked = 0;
  this.timesRendered = 0;
  imgArr.push(this);  
}

function reDue() {
  var i = 0;
  var localData = fetchingData('productData');

  while(i < localData.length){
    var persist = new ImgConstr(imgArr[i].name, imgArr[i].image)
    persist.timesClicked = localStorage.timesClicked;
    persist.timesRendered = localStorage.timesRendered;
    i++;
  }
  console.log('WHAT ARE YOU?', persist);
  return (persist);
    
}
    
console.log(imgArr)
  if(imgArr.length !== 0){  
    // constructing img objects and storing in imgArr
    reDue();
    console.log('construct from objects', imgArr);
  }else{
  new ImgConstr('banana', './images/banana.jpg');
  new ImgConstr('bathroom', './images/bathroom.jpg');
  new ImgConstr('boots', './images/boots.jpg');
  new ImgConstr('breakfast', './images/breakfast.jpg');
  new ImgConstr('bubblegum', './images/bubblegum.jpg');
  new ImgConstr('chair', './images/chair.jpg');
  new ImgConstr('cthulhu', './images/cthulhu.jpg');
  new ImgConstr('dog-duck', './images/dog-duck.jpg');
  new ImgConstr('pet-sweep', './images/pet-sweep.jpg');
  new ImgConstr('scissors', './images/scissors.jpg');
  new ImgConstr('shark', './images/shark.jpg');
  new ImgConstr('sweep', './images/sweep.png');
  new ImgConstr('tauntaun', './images/tauntaun.jpg');
  new ImgConstr('unicorn', './images/unicorn.jpg');
  new ImgConstr('usb', './images/usb.gif');
  new ImgConstr('water-can', './images/water-can.jpg');
  new ImgConstr('wine-glass', './images/wine-glass.jpg');
  }

console.log(imgArr)
// updateNumbers(imgArr, timesClicked, timesRendered);
// Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.
function randomImgs(){ 
  return Math.floor(Math.random() * imgArr.length)
}

// renders the imgs and makes sure there are no duplicates
// Check that it is being rendered
// Check what random values we've generated
function renderImg (){
 
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
    // console.log("test", img1, img2, img3);
    var img1 = randomImgs();
    var img2 = randomImgs();
    var img3 = randomImgs();
  }
  // console.log(imgArr[img1].name, imgArr[img2].name, imgArr[img3].name, testArr);
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

// Once the users ‘clicks’ a product, generate three new products for the user to pick from.
function imgClicking(event){
  var imgId = event.target.getAttribute('alt');
  var i = 0;

  if(ttlClicks < rounds){
    while(i < imgArr.length){
      if(imgId === imgArr[i].name){
        imgArr[i].timesClicked++;
        ttlClicks++
        // consider adding an arr to hold max clicks, 
        }
        i++;
    } 
    renderImg();
    } else{ // display results and removes event listeners.
  alert('thanks for voting');
  results(imgArr); // displays results in a list
  newChart(); // generates chart
  getPos1.removeEventListener('click', imgClicking)
  getPos2.removeEventListener('click', imgClicking)
  getPos3.removeEventListener('click', imgClicking)
  saveData('productData', imgArr);
  }
  
}

// when the img is clicked it triggers event
getPos1.addEventListener('click', imgClicking);
getPos2.addEventListener('click', imgClicking);
getPos3.addEventListener('click', imgClicking);

// uses the DOM to display a string with total clicks and renders as a list
ImgConstr.prototype.display = function () {
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

  while(i < arr.length){
    arr[i].display();
    i++
  }
}
// gets the info you want to put on a chart and sets data
function getInfo(arr, property){
  var i = 0;
  var charArr = [];
  while(i < arr.length){
    charArr.push(arr[i][property])
    i++
  } 
  return charArr;
}
// get the bar colors for chart. the color argument has to be a string.
function getColor(arr, color){
  var i = 0;
  var colorArr = [];
  
  while(i < arr.length){
    colorArr.push(color);
    i++;
  } 
  return colorArr
}
////////////// Local Storage functions /////////////////

function saveData(key, data){
  localStorage.setItem(key, JSON.stringify(data));
}

function fetchingData(key){
  var data = localStorage.getItem(key);
  return JSON.parse(data)
}

renderImg() // renders the images

/////////////////// Chart settings ///////////////////////
function newChart(){
  var ctx = document.getElementById('myChart').getContext('2d');

  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: getInfo(imgArr, 'name'),
          datasets: [{
              label: 'number of clicks',
              data: getInfo(imgArr, 'timesClicked'), 
              backgroundColor: getColor(imgArr, "blue"),
              borderColor: getColor(imgArr, "blue")
                  ,
              borderWidth: 1
          },
          {label: 'times rendered',
          data: getInfo(imgArr, 'timesRendered'), 
          backgroundColor: getColor(imgArr, 'purple'),
          borderColor: getColor(imgArr, "purple"),
          borderWidth: 1}]
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
}

