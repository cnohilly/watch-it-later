var flag = false;

async function starRating(event) {
    event.preventDefault();
    var id= $(this).attr('id');
    
    if(!flag){
      for(var i = 1; i <= 5; i++){
        $("#"+i).removeClass("checked")  
      }
  
      for(var i = id; i >= 0; i--){
        $("#"+i).addClass("checked")  
      } 
    }
  }


async function saveRating(event) {
  event.preventDefault();
  var rating= $(this).attr('id');
  
  if(!flag){
    //save info
    console.log(rating)
  }

  

  flag = true;
}
  
$('.fa-star').on('mouseover', starRating)
$('.fa-star').on('click', saveRating)
