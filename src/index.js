let addToy = false;
const toysUrl = "http://localhost:3000/toys";
const toyCollection = document.querySelector("div#toy-collection");

function fetchToys() {
  return fetch(toysUrl)
  .then(response => response.json())
  .then(body => {
    body.forEach(toy => {
      formatToy(toy);
    })
  });
};

function formatToy(toy) {
  let div = document.createElement('div');
  div.className = "card";
  div.innerHTML = `<h2>${toy["name"]}</h2>`;
  toyCollection.appendChild(div);

  let img = document.createElement('img');
  img.src = `${toy["image"]}`;
  img.className = "toy-avatar";
  div.appendChild(img);

  let likes = document.createElement('p');
  likes.innerText = `${toy["likes"]} Likes`;
  div.appendChild(likes);

  let btn = document.createElement('button');
  btn.className = 'like-btn';
  btn.innerText = "Like <3";
  div.appendChild(btn);
};

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  let toyName = document.querySelector('input[name="name"]');
  let toyUrl = document.querySelector('input[name="image"]');

  const createToy = document.querySelector('input.submit');
  createToy.addEventListener("click", (e) => {
    return fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": toyName.value, 
        "image": toyUrl.value,
        "likes": 0 
      })
    })
  });

  fetchToys();
});
