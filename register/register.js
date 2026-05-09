/* BG */

let slides=document.querySelectorAll(".slide");

let i=0;

setInterval(()=>{

  slides[i].classList.remove("active");

  i=(i+1)%slides.length;

  slides[i].classList.add("active");

},4000);


/* REGISTER */

function register(){

  let u=document.getElementById("user").value.trim();

  let e=document.getElementById("email").value.trim();

  let p=document.getElementById("pass").value;

  let c=document.getElementById("confirm").value;

  let error=document.getElementById("errorText");

  let success=document.getElementById("successText");

  error.style.display="none";

  success.style.display="none";

  /* EMPTY */

  if(!u || !e || !p || !c){

    error.innerText="⚠️ Nhập đầy đủ thông tin!";

    error.style.display="block";

    return;

  }

  /* PASSWORD */

  if(p !== c){

    error.innerText="❌ Mật khẩu không khớp!";

    error.style.display="block";

    return;

  }

  /* USERS */

  let users=JSON.parse(
    localStorage.getItem("users")
  ) || [];

  /* CHECK USER */

  if(users.find(x=>x.user===u)){

    error.innerText="❌ Username đã tồn tại!";

    error.style.display="block";

    return;

  }

  /* SAVE */

  users.push({
    user:u,
    email:e,
    pass:p
  });

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  success.style.display="block";

  setTimeout(()=>{

    window.location.href="login.html";

  },1000);

}


/* GO LOGIN */

function goLogin(){

  window.location.href="login.html";

}