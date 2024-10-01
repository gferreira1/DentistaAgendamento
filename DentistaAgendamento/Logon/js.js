
var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})

function myFunction() {
    document.getElementById("signIn1").style.display = "flex";
    document.getElementById("signIn").style.display = "none";
    
  }

  function myFunction1() {
  document.getElementById("signIn1").style.display = "none";
   document.getElementById("signIn").style.display = "flex";
}
