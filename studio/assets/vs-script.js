// add DOMContentLoaded eventListener 
// this is where we actually initialize our code:
window.addEventListener('DOMContentLoaded', function(){
  loadCollections()
  groupInteractions() 
})


// global variables (like elements you might want to call in multiple places)
var body = document.querySelector("body");
var container = document.getElementById("container");
var blur = document.getElementById("blur");
var pinkMode = document.getElementById("pinkMode");
var disappear = document.getElementById("disappear");
var filter = document.getElementById("filter");


// list your functions
function loadCollections(){
  fetch('assets/copy.js')
  .then(function(stringResponse){ return stringResponse.json()})
  .then(function(response){  
    
    //json: javascript object notation
    
    console.log(response)
    
    // add elements to the document
     response.collections.forEach(function(image, index){
      
       
       
    // some of our images have custom classes
      var classes = "";
       
      if(image.class !== undefined){
        classes = image.class;
      }
      
      container.insertAdjacentHTML('beforeend', `
        <figure class="image ${classes}" id="pic-${index}">
          <img src="${image.imageLink}">
          <figcaption>${image.class}</figcaption>
        </figure>
      `)

      // if you have an element specific function, you want to run it after you've added that element
     var id = "image-" + index;
      
       })                        

    })
}

function groupInteractions(){
  // add eventListeners to your buttons
  
  // make images disappear
  disappear.addEventListener("mouseover", function(){
   body.style.opacity = "0";
  })
  
    disappear.addEventListener("mouseout", function(){
   body.style.opacity = "100";
  })
  
  
//   // expand all images by adding their class "big"
//   //expandAll.addEventListener("click", function(){
//     var allImages = document.querySelectorAll(".image");
    
//     allImages.forEach(function(image){
//       image.classList.add("big");
//     })
//   //})
  
  // change background color
  pinkMode.addEventListener("click", function(){    
    if(body.classList.contains("pink")){
      body.classList.remove("pink")
      pinkMode.innerHTML = "Pink Mode";
    }else{
      body.classList.add("pink")
      pinkMode.innerHTML = "White Mode";
    }
  })
  
  
  // make all images blur
  blur.addEventListener("click", function(){   
    if(body.classList.contains("filter")){
      body.classList.remove("filter")
      blur.innerHTML = "Blur";
    }else{
      body.classList.add("filter")
      blur.innerHTML = "Clear";
    }
  })

  
  // filter by class
  var filtered = false;
  
  filter.addEventListener("click", function(){
    var allImages = document.querySelectorAll(".image");
    
    // update images with existing filter status
    allImages.forEach(function(image){
      if( !image.classList.contains("nature") ){
        
        if(filtered){
          image.style.display = "inline-block"  
        }else{
          image.style.display = "none"
        }
         
      }
    })
    
    // change filter status
    if(filtered === true){
      filtered = false;
      filter.innerHTML = "Nature"
    }else{
      filtered = true;
      filter.innerHTML = "Un-Nature"
    }
    
  })

}







