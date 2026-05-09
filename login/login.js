/* BG */

let slides=document.querySelectorAll(".slide");

let i=0;

setInterval(()=>{

  slides[i].classList.remove("active");

  i=(i+1)%slides.length;

  slides[i].classList.add("active");

},4000);


/* SHOW PASSWORD */

function togglePass(){

  let p=document.getElementById("pass");

  let icon=document.querySelector(".show-pass");

  if(p.type==="password"){

    p.type="text";

    icon.classList.replace(
      "fa-eye",
      "fa-eye-slash"
    );

  }else{

    p.type="password";

    icon.classList.replace(
      "fa-eye-slash",
      "fa-eye"
    );

  }

}


/* LOGIN */

function login(){

  let u=document.getElementById("user").value.trim();

  let p=document.getElementById("pass").value;

  let error=document.getElementById("errorText");

  error.style.display="none";

  /* CHECK EMPTY */

  if(!u || !p){

    error.innerText="⚠️ Nhập đầy đủ thông tin!";

    error.style.display="block";

    return;

  }

  /* GET USERS */

  let users = JSON.parse(
    localStorage.getItem("users")
  ) || [];

  /* FIND ACCOUNT */

  let foundUser = users.find(
    x => x.user === u && x.pass === p
  );

  /* LOGIN FAIL */

  if(!foundUser){

    error.innerText="❌ Sai tài khoản hoặc mật khẩu!";

    error.style.display="block";

    return;

  }

  /* LOGIN SUCCESS */

  localStorage.setItem("isLogin","true");

  localStorage.setItem("currentUser",u);

  alert("Đăng nhập thành công!");

  window.location.href="main.html";

}