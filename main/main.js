let currentUser = localStorage.getItem("currentUser") || "Phuc";

localStorage.setItem("currentUser", currentUser);

let currentIndex = 0;
let limit = 10;

/* ================= FIX SEED LUÔN CHẠY ================= */

function seedPosts(){

  let posts = [

    {
      user:"Phúc",
      text:"🔥 Xin chào mọi người nha",
      image:"",
      video:"",
      comments:[],
      time:"07:50"
    },

    {
      user:"Phúc",
      text:"😎 Đang build MySocial App",
      image:"",
      video:"",
      comments:[],
      time:"08:00"
    },

    {
      user:"Phúc",
      text:"💬 Ai rảnh chat với mình",
      image:"",
      video:"",
      comments:[],
      time:"08:05"
    },

    {
      user:"Linh",
      text:"có ai muốn đi chơi ko nè? 😍",
      image:"",
      video:"",
      comments:[],
      time:"08:10"
    },

    {
      user:"Nam",
      text:"bận đi học quá 😴",
      image:"",
      video:"",
     comments:[],
      time:"08:20"
    },

    {
      user:"An",
      text:"Check in cùng an ko? 📸",
      image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      video:"",
      comments:[],
      time:"08:30"
    }

  ];

  localStorage.setItem("posts", JSON.stringify(posts));
}

/* ================= LOAD ================= */

function loadPosts(reset=true){

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  if(reset){
    feed.innerHTML = "";
    currentIndex = 0;
  }

  let slice = posts.slice(currentIndex, currentIndex + limit);

  slice.forEach((p,i)=>{

    feed.innerHTML += `

    <div class="post">

      <div class="post-header">

        <div class="avatar"
             onclick="openProfile('${p.user}')">

          ${p.user[0]}

        </div>

        <div>

          <b style="cursor:pointer;color:#ff2d55"
             onclick="openProfile('${p.user}')">

            ${p.user}

          </b>

          <br>

          <span class="time">${p.time}</span>

        </div>

      </div>

      <p>${p.text}</p>

      ${p.image ? `<img src="${p.image}">` : ""}

      ${p.video ? `<video controls src="${p.video}"></video>` : ""}

    </div>

    `;
  });

  currentIndex += limit;

  if(currentIndex < posts.length){

    feed.innerHTML += `

    <div class="load-more"
         onclick="loadPosts(false)">

         Xem thêm

    </div>

    `;
  }
}

/* ================= ADD POST ================= */

function addPost(){

  let text = content.value;

  let img = imageInput.files[0];

  let vid = videoInput.files[0];

  if(!text && !img && !vid){
    return alert("Nhập nội dung!");
  }

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  function save(image,video){

    posts.unshift({

      user: currentUser,

      text,

      image,

      video,

      comments:[],

      time:new Date().toLocaleString()

    });

    localStorage.setItem("posts", JSON.stringify(posts));

    content.value = "";

    preview.innerHTML = "";

    imageInput.value = "";

    videoInput.value = "";

    loadPosts(true);
  }

  if(img){

    let r = new FileReader();

    r.onload = e => save(e.target.result,null);

    r.readAsDataURL(img);
  }

  else if(vid){

    let r = new FileReader();

    r.onload = e => save(null,e.target.result);

    r.readAsDataURL(vid);
  }

  else{

    save(null,null);
  }
}

/* ================= PREVIEW ================= */

imageInput.onchange = function(){

  let file = this.files[0];

  if(!file) return;

  let r = new FileReader();

  r.onload = e => {

    preview.innerHTML = `
      <img class="preview-media"
           src="${e.target.result}">
    `;
  };

  r.readAsDataURL(file);
};

videoInput.onchange = function(){

  let file = this.files[0];

  if(!file) return;

  let r = new FileReader();

  r.onload = e => {

    preview.innerHTML = `
      <video class="preview-media"
             controls
             src="${e.target.result}">
      </video>
    `;
  };

  r.readAsDataURL(file);
};

/* ================= NAV ================= */

function openProfile(user){

  localStorage.setItem("viewUser",user);

  location.href = "profile.html";
}

function goProfile(){

  localStorage.setItem("viewUser",currentUser);

  location.href = "profile.html";
}

function goSetting(){

  location.href = "setting.html";
}

function logout(){

  localStorage.removeItem("currentUser");

  location.href = "login.html";
}

/* ================= LOAD ================= */

window.onload = function(){

  seedPosts();

  loadPosts(true);
};