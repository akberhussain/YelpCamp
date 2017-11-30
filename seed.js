var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data = [
    {
     name : "Campground 1",
     url : "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg",
     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
     name : "Campground 2",
     url : "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
     name : "Campground 3",
     url : "https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg",
     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
];

function seedDB(){
    //removing all data from campgrounds collection everytime when server starts
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed all campgrounds");
        
            //Adding data in campgound fields again 
        data.forEach(function(campground){
          Campground.create(campground, function(err, campground){
              if(err){
                  console.log(err);
              }else{
                  console.log("campground created!!!");
                  Comment.create({
                      text : "this campground is awesome",
                      author: "Akber"
                  }, function(err, comment){
                      if(err){
                          console.log(err);
                      }else{
                          campground.comments.push(comment); 
                          campground.save();
                          console.log("comment added!!!");
                      }
                  });
              }
          }) ;
        });
                
    });
}

module.exports = seedDB;