
var password_field = document.getElementById("password");
var show_button = document.getElementById('show') 
show_button.addEventListener('click', myFunction)

function myFunction() {
   
    if (password_field.type === "password") {
      password_field.type = "text";
    } else {
      password_field.type = "password";
    }
  }