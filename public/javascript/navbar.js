let button3 = document.getElementById('menu')
button3.addEventListener('click', inf);

function inf(){
    $(button3).toggleClass("fa-times");
    $(".navigation-menu").toggleClass("active");
  }

 
 